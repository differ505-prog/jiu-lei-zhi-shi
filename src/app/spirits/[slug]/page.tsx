import { notFound } from "next/navigation";

import { ContentMetaGrid } from "@/components/content-meta-grid";
import { MarkdownArticle } from "@/components/markdown-article";
import { Tag } from "@/components/tag";
import { getAllSpirits, getSpiritBySlug } from "@/lib/mdx";

interface SpiritDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const spirits = await getAllSpirits();
  return spirits.map((note) => ({ slug: note.slug }));
}

export default async function SpiritDetailPage({
  params,
}: SpiritDetailPageProps) {
  const { slug } = await params;
  const note = await getSpiritBySlug(slug);

  if (!note) {
    notFound();
  }

  const metaItems = [
    { label: "類型", value: note.type },
    { label: "分類", value: note.category },
    { label: "產區", value: note.region },
    { label: "酒精度", value: note.abv },
    { label: "桶型", value: note.cask_type.join("、") },
    { label: "個人評分", value: note.my_rating },
    { label: "品飲日期", value: note.tasting_date },
  ];

  return (
    <div className="space-y-8 pb-10">
      <section className="space-y-5 rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl sm:p-8">
        <Tag tone="amber">{note.type}</Tag>
        <div className="space-y-3">
          <h1 className="font-serif text-4xl text-stone-100 sm:text-5xl">
            {note.title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {note.category}，來自 {note.region}。風味關鍵字包含{" "}
            {note.flavor_profile.join("、")}。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {note.tags.map((item) => (
            <Tag key={item} tone="amber">
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
