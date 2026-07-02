import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { CategoryHero } from "@/components/category-hero";
import { GrapeProfileCard } from "@/components/grape-profile-card";
import { SectionHeading } from "@/components/section-heading";
import { Tag } from "@/components/tag";
import { getGroupedGrapeVarieties } from "@/data/grape-varieties";

const readingNotes = [
  "高單寧紅葡萄通常更適合搭配油脂與蛋白質。",
  "高酸度白葡萄通常更適合海鮮、酸味料理與開胃場景。",
  "同一葡萄會因產區、釀造與橡木桶處理出現巨大差異，以下內容是辨識基準線。",
] as const;

export default function WineGrapesPage() {
  const { reds, whites } = getGroupedGrapeVarieties();

  return (
    <div className="space-y-12 pb-10">
      <CategoryHero
        eyebrow="葡萄品種指南"
        title="各種葡萄的口感知識"
        description="把常見紅白葡萄拆成真正喝得出來的語言：酒體、酸度、單寧、香氣方向、口感印象與餐搭建議，建立你自己的葡萄風味地圖。"
        hint="風味、結構、搭餐"
        tone="wine"
      />

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.85rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
          <SectionHeading
            eyebrow="閱讀方式"
            title="先抓結構，再記香氣"
            description="學葡萄品種最有效的方法，不是死背產區，而是先建立結構感：它是厚還是輕、酸度高不高、單寧會不會收口，最後再把香氣與餐搭連起來。"
          />
        </div>

        <div className="rounded-[1.85rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-slate-500">
              快速提示
            </p>
            <div className="space-y-3">
              {readingNotes.map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <p className="text-sm leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
            <Link
              href="/wines"
              className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 transition duration-200 hover:-translate-y-0.5 hover:bg-rose-500/15"
            >
              回到葡萄酒窖
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <Tag tone="wine">紅葡萄 {reds.length}</Tag>
          <Tag tone="rice">白葡萄 {whites.length}</Tag>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Red Grapes"
          title="紅葡萄口感指南"
          description="紅葡萄最值得先記的是酒體、單寧與酸度，因為它們直接決定你覺得這杯酒是溫柔、俐落還是有壓迫感。"
        />
        <div className="grid gap-5 xl:grid-cols-2">
          {reds.map((profile) => (
            <GrapeProfileCard key={profile.slug} profile={profile} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="White Grapes"
          title="白葡萄口感指南"
          description="白葡萄的辨識重點通常在酸度、香氣純度與質地變化。有些走礦感與清脆，有些則偏圓潤、花香或蜂蜜感。"
        />
        <div className="grid gap-5 xl:grid-cols-2">
          {whites.map((profile) => (
            <GrapeProfileCard key={profile.slug} profile={profile} />
          ))}
        </div>
      </section>
    </div>
  );
}
