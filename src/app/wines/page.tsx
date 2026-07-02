import { CategoryHero } from "@/components/category-hero";
import { DrinkCard } from "@/components/drink-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllWines } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function WinesPage() {
  const wines = await getAllWines();
  const featuredWine = wines[0];
  const featuredIsGuide = featuredWine?.type === "Guide";
  const quickStats = [
    {
      label: "Archive Notes",
      value: `${wines.length.toString().padStart(2, "0")}`,
      description: "酒款與指南並存，閱讀動線更像策展型酒窖。",
    },
    {
      label: "Guide Layer",
      value: "02",
      description: "從單瓶酒到方法論，建立更完整的選酒框架。",
    },
    {
      label: "Reading Mood",
      value: "Night",
      description: "酒紅、霧面玻璃與資料型版面疊出夜讀感。",
    },
  ];

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
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.16),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.08),transparent_28%)]" />
            <div className="relative space-y-6">
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.32em] text-rose-200/80">
                  {featuredIsGuide ? "Featured Reading" : "Featured Bottle Story"}
                </p>
                <div className="space-y-3">
                  <h2 className="font-serif text-4xl text-stone-100">
                    {featuredWine.title}
                  </h2>
                  <p className="text-sm leading-7 text-slate-300 sm:text-base">
                    {featuredIsGuide
                      ? "這篇目前作為葡萄酒區的主打閱讀，適合先建立評分門檻、樣本數與紅白酒評分差異的基本判讀框架，再回頭挑酒。"
                      : "這篇目前作為葡萄酒區的主打專題，適合讓讀者從單一酒款切入，理解南義風格、風乾葡萄法與餐搭邏輯如何一起成立。"}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {quickStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.4rem] border border-white/8 bg-black/20 p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-3 font-serif text-3xl text-stone-100">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                ))}
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
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20">
              <div className="border-b border-white/8 bg-white/4 px-5 py-3">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  Selection Snapshot
                </p>
              </div>
              <div className="divide-y divide-white/8">
                {[
                  ["紅酒", "3.8+ / 500 評"],
                  ["白酒", "3.6+ / 300 評"],
                  ["香檳", "4.0+ / 1000 評"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <p className="text-sm text-slate-300">{label}</p>
                    <p className="font-serif text-xl text-stone-100">{value}</p>
                  </div>
                ))}
              </div>
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
