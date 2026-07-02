import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

      {note.cover_image ? (
        <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/20">
            <Image
              src={note.cover_image}
              alt={note.cover_image_alt ?? note.title}
              width={900}
              height={1200}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="space-y-4 px-1 lg:px-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-rose-200/70">
              Bottle Focus
            </p>
            <div className="space-y-3">
              <h2 className="font-serif text-3xl text-stone-100 sm:text-4xl">
                酒款視覺與風格印象
              </h2>
              <p className="text-sm leading-7 text-slate-300 sm:text-base">
                這張酒瓶圖像會作為該篇知識分享的視覺封面，讓讀者在進入文章前就先建立對酒款定位的第一印象。像
                Rocca Parelli Appassimento 這種南義風乾風格酒款，視覺本身就很適合搭配濃郁、成熟、帶甜香料感的敘事。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag tone="wine">南義風格</Tag>
              <Tag tone="slate">酒款封面</Tag>
              <Tag tone="amber">知識分享文</Tag>
            </div>
          </div>
        </section>
      ) : null}

      <ContentMetaGrid items={metaItems} />

      <section className="rounded-[1.85rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
            延伸閱讀
          </p>
          <div className="space-y-2">
            <h2 className="font-serif text-3xl text-stone-100">
              查看葡萄品種口感指南
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-300">
              這款酒以 {note.grape_variety.join("、")} 為主軸。若你想進一步理解這些葡萄通常帶來的酸度、酒體、香氣方向與搭餐方式，可以直接回到葡萄指南對照。
            </p>
          </div>
          <Link
            href="/wines/grapes"
            className="inline-flex items-center rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 transition duration-200 hover:-translate-y-0.5 hover:bg-rose-500/15"
          >
            前往葡萄指南
          </Link>
        </div>
      </section>

      <MarkdownArticle content={note.content} />
    </div>
  );
}
