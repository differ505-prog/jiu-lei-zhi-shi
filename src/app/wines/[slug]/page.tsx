import { notFound } from "next/navigation";

import { ContentMetaGrid } from "@/components/content-meta-grid";
import { MarkdownArticle } from "@/components/markdown-article";
import { Tag } from "@/components/tag";
import { getAllWines, getWineBySlug } from "@/lib/mdx";

interface WineDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const wines = await getAllWines();
  return wines.map((note) => ({ slug: note.slug }));
}

export default async function WineDetailPage({ params }: WineDetailPageProps) {
  const { slug } = await params;
  const note = await getWineBySlug(slug);

  if (!note) {
    notFound();
  }

  const metaItems = [
    { label: "類型", value: note.type },
    { label: "年份", value: note.vintage },
    { label: "產區", value: note.region },
    { label: "國家", value: note.country },
    { label: "葡萄品種", value: note.grape_variety.join("、") },
    { label: "甜度", value: note.sweetness },
    { label: "酒體", value: note.body },
    { label: "個人評分", value: note.my_rating },
    { label: "品飲日期", value: note.tasting_date },
  ];

  return (
    <div className="space-y-8 pb-10">
      <section className="space-y-5 rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl sm:p-8">
        <Tag tone="wine">{note.type}</Tag>
        <div className="space-y-3">
          <h1 className="font-serif text-4xl text-stone-100 sm:text-5xl">
            {note.title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {note.region}，{note.country}。年份 {note.vintage}，以{" "}
            {note.grape_variety.join("、")} 為主軸，風味輪廓為{" "}
            {note.flavor_profile.join("、")}。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {note.tags.map((item) => (
            <Tag key={item} tone="wine">
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
