import { ArrowUpRight } from "lucide-react";

import { Tag } from "@/components/tag";

interface CategoryHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  hint: string;
  tone?: "amber" | "wine" | "rice" | "slate";
}

const glowMap = {
  amber: "bg-amber-500/10",
  wine: "bg-rose-500/10",
  rice: "bg-stone-200/10",
  slate: "bg-slate-300/10",
} as const;

export function CategoryHero({
  eyebrow,
  title,
  description,
  hint,
  tone = "amber",
}: CategoryHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_32px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className={`absolute -top-24 right-0 h-56 w-56 rounded-full blur-3xl ${glowMap[tone]}`} />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/4 blur-3xl" />
      <div className="relative space-y-5">
        <Tag tone={tone}>{eyebrow}</Tag>
        <div className="space-y-4">
          <h1 className="max-w-3xl font-serif text-4xl text-stone-100 sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {description}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs tracking-[0.2em] text-slate-300 uppercase">
          <ArrowUpRight className="h-4 w-4 text-amber-300" />
          {hint}
        </div>
      </div>
    </section>
  );
}
