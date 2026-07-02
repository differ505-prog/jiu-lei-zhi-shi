import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type {
  LatestNotesByCategory,
  MixologyNote,
  SakeNote,
  SpiritNote,
  WineNote,
} from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");

type ParsedNote<T> = T & {
  slug: string;
  content: string;
  __sortDate: string;
};

async function safeReadDirectory(directory: string) {
  try {
    return await fs.readdir(directory);
  } catch {
    return [];
  }
}

async function readMarkdownFiles<T>(
  category: string,
  sortField?: string,
): Promise<Array<ParsedNote<T>>> {
  const directory = path.join(CONTENT_ROOT, category);
  const entries = await safeReadDirectory(directory);
  const fileNames = entries.filter((entry) => entry.endsWith(".md"));

  const notes = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(directory, fileName);
      const source = await fs.readFile(filePath, "utf8");
      const stats = await fs.stat(filePath);
      const { data, content } = matter(source);
      const slug = fileName.replace(/\.md$/, "");
      const sortSeed =
        typeof data[sortField ?? ""] === "string" && data[sortField ?? ""]
          ? data[sortField ?? ""]
          : stats.mtime.toISOString();

      return {
        ...(data as T),
        slug,
        content,
        __sortDate: sortSeed,
      };
    }),
  );

  return notes.sort((left, right) =>
    right.__sortDate.localeCompare(left.__sortDate),
  );
}

function stripInternalField<T extends { __sortDate: string }>(
  notes: T[],
): Array<Omit<T, "__sortDate">> {
  return notes.map((note) => {
    const { __sortDate, ...rest } = note;
    void __sortDate;
    return rest;
  });
}

async function getCollection<T>(category: string, sortField?: string) {
  const notes = await readMarkdownFiles<T>(category, sortField);
  return stripInternalField(notes);
}

async function getNoteBySlug<T>(category: string, slug: string) {
  const notes = await getCollection<T>(category, "tasting_date");
  return notes.find((note) => note.slug === slug) ?? null;
}

export function getContentRoot() {
  return CONTENT_ROOT;
}

export async function getAllSpirits() {
  return getCollection<SpiritNote>("spirits", "tasting_date");
}

export async function getAllWines() {
  return getCollection<WineNote>("wines", "tasting_date");
}

export async function getAllSakes() {
  return getCollection<SakeNote>("sakes", "tasting_date");
}

export async function getAllMixology() {
  return getCollection<MixologyNote>("mixology");
}

export async function getSpiritBySlug(slug: string) {
  return getNoteBySlug<SpiritNote>("spirits", slug);
}

export async function getWineBySlug(slug: string) {
  return getNoteBySlug<WineNote>("wines", slug);
}

export async function getSakeBySlug(slug: string) {
  return getNoteBySlug<SakeNote>("sakes", slug);
}

export async function getMixologyBySlug(slug: string) {
  return getNoteBySlug<MixologyNote>("mixology", slug);
}

export async function getLatestNotesByCategory(
  limit = 2,
): Promise<LatestNotesByCategory> {
  const [spirits, wines, sakes, mixology] = await Promise.all([
    getAllSpirits(),
    getAllWines(),
    getAllSakes(),
    getAllMixology(),
  ]);

  return {
    spirits: spirits.slice(0, limit),
    wines: wines.slice(0, limit),
    sakes: sakes.slice(0, limit),
    mixology: mixology.slice(0, limit),
  };
}
