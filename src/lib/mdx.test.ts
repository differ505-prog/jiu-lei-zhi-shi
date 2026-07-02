import { describe, expect, it } from "vitest";

import {
  getAllMixology,
  getAllSakes,
  getAllSpirits,
  getAllWines,
  getLatestNotesByCategory,
  getSakeBySlug,
} from "./mdx";

describe("mdx content loader", () => {
  it("loads all collections from local markdown files", async () => {
    const [spirits, wines, sakes, mixology] = await Promise.all([
      getAllSpirits(),
      getAllWines(),
      getAllSakes(),
      getAllMixology(),
    ]);

    expect(spirits.length).toBeGreaterThan(0);
    expect(wines.length).toBeGreaterThan(0);
    expect(sakes.length).toBeGreaterThan(0);
    expect(mixology.length).toBeGreaterThan(0);
  });

  it("returns a sake note by slug", async () => {
    const note = await getSakeBySlug("dassai-23");

    expect(note).not.toBeNull();
    expect(note?.brewery).toBe("旭酒造");
    expect(note?.category).toBe("純米大吟釀");
  });

  it("builds the latest-notes payload for the homepage", async () => {
    const latest = await getLatestNotesByCategory(1);

    expect(latest.spirits).toHaveLength(1);
    expect(latest.wines).toHaveLength(1);
    expect(latest.sakes).toHaveLength(1);
    expect(latest.mixology).toHaveLength(1);
  });
});
