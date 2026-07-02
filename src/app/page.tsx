import Link from "next/link";

import { DrinkCard } from "@/components/drink-card";
import { HomeHero } from "@/components/home-hero";
import { SectionHeading } from "@/components/section-heading";
import { getLatestNotesByCategory } from "@/lib/mdx";

const quickLinks = [
  {
    href: "/spirits",
    title: "烈酒圖鑑",
    description: "探索桶型、產區與風味曲線。",
  },
  {
    href: "/wines",
    title: "葡萄酒窖",
    description: "從年份到葡萄品種，建立你的酒窖語言。",
  },
  {
    href: "/sakes",
    title: "清酒紀行",
    description: "用篩選器整理酒造、精米步合與風格差異。",
  },
  {
    href: "/mixology",
    title: "調酒實驗室",
    description: "把手法、器材與配方邏輯系統化。",
  },
] as const;

export default async function Home() {
  const latest = await getLatestNotesByCategory(2);

  return (
    <div className="space-y-16 pb-12">
      <HomeHero />

      <section className="grid gap-4 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
          >
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                入口
              </p>
              <h2 className="font-serif text-2xl text-stone-100">{link.title}</h2>
              <p className="text-sm leading-7 text-slate-400">{link.description}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="最新筆記"
          title="各分類最新筆記"
          description="四條內容主線同步更新，讓你從首頁就能快速切入最新的品飲紀錄與知識整理。"
        />

        <div className="space-y-12">
          <div className="space-y-5">
            <div className="flex items-end justify-between gap-4">
              <h3 className="font-serif text-2xl text-stone-100">烈酒圖鑑</h3>
              <Link href="/spirits" className="text-sm text-amber-200 hover:text-amber-100">
                查看全部
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {latest.spirits.map((note) => (
                <DrinkCard key={note.slug} kind="spirits" note={note} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-end justify-between gap-4">
              <h3 className="font-serif text-2xl text-stone-100">葡萄酒窖</h3>
              <Link href="/wines" className="text-sm text-amber-200 hover:text-amber-100">
                查看全部
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {latest.wines.map((note) => (
                <DrinkCard key={note.slug} kind="wines" note={note} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-end justify-between gap-4">
              <h3 className="font-serif text-2xl text-stone-100">清酒紀行</h3>
              <Link href="/sakes" className="text-sm text-amber-200 hover:text-amber-100">
                查看全部
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {latest.sakes.map((note) => (
                <DrinkCard key={note.slug} kind="sakes" note={note} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-end justify-between gap-4">
              <h3 className="font-serif text-2xl text-stone-100">調酒實驗室</h3>
              <Link href="/mixology" className="text-sm text-amber-200 hover:text-amber-100">
                查看全部
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {latest.mixology.map((note) => (
                <DrinkCard key={note.slug} kind="mixology" note={note} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
