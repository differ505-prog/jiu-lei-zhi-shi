import { CategoryHero } from "@/components/category-hero";
import { DrinkCard } from "@/components/drink-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllWines } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function WinesPage() {
  const wines = await getAllWines();
  const featuredWine = wines[0];

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

      {featuredWine ? (
        <section className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8">
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.32em] text-rose-200/80">
                Featured Bottle Story
              </p>
              <div className="space-y-3">
                <h2 className="font-serif text-4xl text-stone-100">
                  {featuredWine.title}
                </h2>
                <p className="text-sm leading-7 text-slate-300 sm:text-base">
                  這篇目前作為葡萄酒區的主打專題，適合讓讀者從單一酒款切入，理解南義風格、風乾葡萄法與餐搭邏輯如何一起成立。
                </p>
              </div>
              <Link
                href={`/wines/${featuredWine.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 transition duration-200 hover:-translate-y-0.5 hover:bg-rose-500/15"
              >
                進入主打專題
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                Cellar Lens
              </p>
              <p className="mt-3 font-serif text-2xl text-stone-100">從酒款到葡萄</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                不只記錄單瓶酒，也把葡萄品種與風格辨識納入同一條閱讀動線。
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                Reading Tone
              </p>
              <p className="mt-3 font-serif text-2xl text-stone-100">柔光、酒紅、夜讀</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                讓葡萄酒頁不只是清單，而像一個帶有策展感的酒窖專題頁。
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {wines.map((note) => (
          <DrinkCard key={note.slug} kind="wines" note={note} />
        ))}
      </div>
    </div>
  );
}
