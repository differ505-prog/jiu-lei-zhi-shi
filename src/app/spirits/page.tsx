import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { CategoryHero } from "@/components/category-hero";
import { DrinkCard } from "@/components/drink-card";
import { getAllSpirits } from "@/lib/mdx";

export default async function SpiritsPage() {
  const spirits = await getAllSpirits();
  const featuredSpirit = spirits[0];

  return (
    <div className="space-y-10 pb-10">
      <CategoryHero
        eyebrow="烈酒檔案"
        title="烈酒圖鑑"
        description="聚焦威士忌、琴酒與其他烈酒的產區、桶型、酒精結構與個人品飲評分，保留知識庫式的查找效率，也保留夜色收藏館的質感。"
        hint="產區、桶型、風味輪廓"
        tone="amber"
      />

      {featuredSpirit ? (
        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8">
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.32em] text-amber-300/80">
                Featured Archive
              </p>
              <div className="space-y-3">
                <h2 className="font-serif text-4xl text-stone-100">
                  {featuredSpirit.title}
                </h2>
                <p className="text-sm leading-7 text-slate-300 sm:text-base">
                  烈酒頁的主打方式，不只列出規格，而是把產區、桶型與風味記憶一起整理成可回看的夜色檔案。
                </p>
              </div>
              <Link
                href={`/spirits/${featuredSpirit.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-100 transition duration-200 hover:-translate-y-0.5 hover:bg-amber-500/16"
              >
                進入主打筆記
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                Barrel Focus
              </p>
              <p className="mt-3 font-serif text-2xl text-stone-100">桶型與餘韻</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                把木質、煙燻、熟果與餘韻印象，從單純 tasting notes 升級成閱讀索引。
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                Night Library
              </p>
              <p className="mt-3 font-serif text-2xl text-stone-100">更像收藏館</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                讓烈酒區的第一眼不只是卡片清單，而有更明顯的收藏與檔案感。
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {spirits.map((note) => (
          <DrinkCard key={note.slug} kind="spirits" note={note} />
        ))}
      </div>
    </div>
  );
}
