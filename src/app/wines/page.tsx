import { CategoryHero } from "@/components/category-hero";
import { DrinkCard } from "@/components/drink-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllWines } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function WinesPage() {
  const wines = await getAllWines();

  return (
    <div className="space-y-10 pb-10">
      <CategoryHero
        eyebrow="葡萄酒酒窖"
        title="葡萄酒窖"
        description="從年份、國家、產區到葡萄品種與酒體結構，把每一瓶酒的風格輪廓整理成可回看、可比較的知識筆記。"
        hint="年份、國家、酒體結構"
        tone="wine"
      />

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.85rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
          <SectionHeading
            eyebrow="Wine Knowledge"
            title="新增葡萄品種口感指南"
            description="如果你想先理解 Cabernet Sauvignon、Pinot Noir、Chardonnay、Riesling 等常見葡萄的口感與結構差異，現在可以直接從酒窖入口進去查。"
          />
        </div>

        <Link
          href="/wines/grapes"
          className="group rounded-[1.85rem] border border-rose-400/20 bg-rose-500/10 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:bg-rose-500/14"
        >
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-rose-200/80">
              Explore Grapes
            </p>
            <div className="space-y-2">
              <h2 className="font-serif text-3xl text-stone-100">
                各種葡萄的口感知識
              </h2>
              <p className="text-sm leading-7 text-rose-50/80">
                用結構、酸度、單寧、香氣與搭餐方式，快速建立葡萄品種的辨識力。
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-rose-100">
              進入葡萄指南
              <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {wines.map((note) => (
          <DrinkCard key={note.slug} kind="wines" note={note} />
        ))}
      </div>
    </div>
  );
}
