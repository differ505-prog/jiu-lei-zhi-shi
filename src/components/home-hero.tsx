import Link from "next/link";

import { ArrowRight, BookHeart, FlaskConical, Grape, Martini } from "lucide-react";

import { Tag } from "@/components/tag";

const heroLinks = [
  {
    href: "/spirits",
    title: "烈酒圖鑑",
    description: "威士忌、琴酒與桶陳細節的夜色檔案。",
    icon: Martini,
    tone: "amber" as const,
  },
  {
    href: "/wines",
    title: "葡萄酒窖",
    description: "年份、產區、葡萄品種與酒體輪廓。",
    icon: Grape,
    tone: "wine" as const,
  },
  {
    href: "/sakes",
    title: "清酒紀行",
    description: "酒造、精米步合與日本酒度的細緻閱讀。",
    icon: BookHeart,
    tone: "rice" as const,
  },
  {
    href: "/mixology",
    title: "調酒實驗室",
    description: "從器材到手法，整理每一杯的結構語言。",
    icon: FlaskConical,
    tone: "slate" as const,
  },
] as const;

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/6 px-6 py-10 shadow-[0_32px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:px-8 lg:px-10 lg:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_24%)]" />
      <div className="absolute inset-y-10 left-[54%] hidden w-px bg-gradient-to-b from-transparent via-white/12 to-transparent xl:block" />
      <div className="relative grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
        <div className="space-y-6">
          <Tag>品飲檔案館</Tag>
          <div className="space-y-4">
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-stone-50 sm:text-6xl lg:text-7xl">
              夜色中的酒類知識庫，
              <span className="text-amber-300"> 讀得深，也記得住。</span>
            </h1>
            <p className="max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              以本地 Markdown 為核心，把烈酒、葡萄酒、清酒與調酒筆記收束成一個可查找、可閱讀、也足夠性感的品飲檔案館。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/spirits"
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/12 px-5 py-3 text-sm text-amber-100 transition duration-200 hover:-translate-y-0.5 hover:bg-amber-500/18"
            >
              進入圖鑑
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sakes"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:border-white/20"
            >
              看清酒篩選
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                Archive
              </p>
              <p className="mt-3 font-serif text-2xl text-stone-100">4</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">四條知識主線同步整理。</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                Reading
              </p>
              <p className="mt-3 font-serif text-2xl text-stone-100">Dark</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">偏夜色、偏專注、偏精品雜誌感。</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                Focus
              </p>
              <p className="mt-3 font-serif text-2xl text-stone-100">MDX</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">長文、知識卡與酒款筆記共存。</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
              Curated Tonight
            </p>
            <div className="mt-4 space-y-3">
              <p className="font-serif text-3xl text-stone-100">從酒款筆記到工具書知識，建立自己的品飲語言。</p>
              <p className="text-sm leading-7 text-slate-400">
                不是只記錄喝過什麼，而是把風味、結構、餐搭與釀造背景整理成真正可回看的知識資產。
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
          {heroLinks.map(({ href, title, description, icon: Icon, tone }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Tag tone={tone}>{title}</Tag>
                  <Icon className="h-5 w-5 text-amber-300 transition duration-200 group-hover:rotate-6" />
                </div>
                <div className="space-y-2">
                  <p className="font-serif text-2xl text-stone-100">{title}</p>
                  <p className="text-sm leading-7 text-slate-400">{description}</p>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
