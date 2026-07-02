import { notFound } from "next/navigation";

import { ContentMetaGrid } from "@/components/content-meta-grid";
import { MarkdownArticle } from "@/components/markdown-article";
import { Tag } from "@/components/tag";
import { getAllSakes, getSakeBySlug } from "@/lib/mdx";

interface SakeDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const sakes = await getAllSakes();
  return sakes.map((note) => ({ slug: note.slug }));
}

export default async function SakeDetailPage({ params }: SakeDetailPageProps) {
  const { slug } = await params;
  const note = await getSakeBySlug(slug);

  if (!note) {
    notFound();
  }

  const metaItems = [
    { label: "酒造", value: note.brewery },
    { label: "產地", value: note.prefecture },
    { label: "酒米", value: note.rice_variety },
    { label: "精米步合", value: note.seimaibuai },
    { label: "日本酒度", value: note.sake_meter_value },
    { label: "酸度", value: note.acidity },
    { label: "酒精度", value: note.abv },
    { label: "個人評分", value: note.my_rating },
    { label: "品飲日期", value: note.tasting_date },
  ];

  return (
    <div className="space-y-8 pb-10">
      <section className="space-y-5 rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl sm:p-8">
        <Tag tone="rice">{note.category}</Tag>
        <div className="space-y-3">
          <h1 className="font-serif text-4xl text-stone-100 sm:text-5xl">
            {note.title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            由 {note.brewery} 釀造，來自 {note.prefecture}。使用 {note.rice_variety}
            ，精米步合 {note.seimaibuai}，整體風味偏向{" "}
            {note.flavor_profile.join("、")}。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {note.tags.map((item) => (
            <Tag key={item} tone="rice">
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
