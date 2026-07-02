import { notFound } from "next/navigation";

import { ContentMetaGrid } from "@/components/content-meta-grid";
import { MarkdownArticle } from "@/components/markdown-article";
import { Tag } from "@/components/tag";
import { getAllMixology, getMixologyBySlug } from "@/lib/mdx";

interface MixologyDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const notes = await getAllMixology();
  return notes.map((note) => ({ slug: note.slug }));
}

export default async function MixologyDetailPage({
  params,
}: MixologyDetailPageProps) {
  const { slug } = await params;
  const note = await getMixologyBySlug(slug);

  if (!note) {
    notFound();
  }

  const metaItems = [
    { label: "分類", value: note.category },
    { label: "難度", value: note.difficulty },
    { label: "器材需求", value: note.equipment_needed.join("、") },
  ];

  return (
    <div className="space-y-8 pb-10">
      <section className="space-y-5 rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl sm:p-8">
        <Tag tone="slate">{note.category}</Tag>
        <div className="space-y-3">
          <h1 className="font-serif text-4xl text-stone-100 sm:text-5xl">
            {note.title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            以 {note.category} 為主軸，難度 {note.difficulty}
            。器材需求包含 {note.equipment_needed.join("、")}。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {note.tags.map((item) => (
            <Tag key={item} tone="slate">
              {item}
            </Tag>
          ))}
        </div>
      </section>

      <ContentMetaGrid items={metaItems} />
      <MarkdownArticle content={note.content} />
    </div>
  );
}
