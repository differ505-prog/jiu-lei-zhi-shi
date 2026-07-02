import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Tag } from "@/components/tag";
import type { MixologyNote, SakeNote, SpiritNote, WineNote } from "@/types/content";

type DrinkCardProps =
  | {
      kind: "spirits";
      note: SpiritNote;
    }
  | {
      kind: "wines";
      note: WineNote;
    }
  | {
      kind: "sakes";
      note: SakeNote;
    }
  | {
      kind: "mixology";
      note: MixologyNote;
    };

const toneMap = {
  spirits: "amber" as const,
  wines: "wine" as const,
  sakes: "rice" as const,
  mixology: "slate" as const,
};

export function DrinkCard(props: DrinkCardProps) {
  const config = buildCardContent(props);

  return (
    <Link
      href={config.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/6 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_26px_100px_rgba(0,0,0,0.42)]"
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <Tag tone={toneMap[props.kind]}>{config.eyebrow}</Tag>
          <ArrowUpRight className="h-4 w-4 text-slate-500 transition duration-200 group-hover:text-amber-200" />
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-2xl leading-tight text-stone-100">
            {config.title}
          </h3>
          <p className="text-sm leading-7 text-slate-300">{config.subline}</p>
        </div>

        <div className="grid gap-3 rounded-[1.4rem] border border-white/8 bg-black/20 p-4 sm:grid-cols-2">
          {config.meta.map((item) => (
            <div key={`${item.label}-${item.value}`} className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
                {item.label}
              </p>
              <p className="text-sm text-stone-100">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {config.tags.map((item) => (
            <Tag key={item} tone={toneMap[props.kind]}>
              {item}
            </Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

function buildCardContent(props: DrinkCardProps) {
  if (props.kind === "spirits") {
    return {
      href: `/spirits/${props.note.slug}`,
      eyebrow: props.note.type,
      title: props.note.title,
      subline: `${props.note.category}・${props.note.region}`,
      meta: [
        { label: "地區", value: props.note.region },
        { label: "酒精度", value: props.note.abv },
      ],
      tags: props.note.flavor_profile.slice(0, 3),
    };
  }

  if (props.kind === "wines") {
    const isGuide = props.note.type === "Guide";

    return {
      href: `/wines/${props.note.slug}`,
      eyebrow: isGuide ? "Wine Guide" : props.note.type,
      title: props.note.title,
      subline: isGuide
        ? `${props.note.vintage}・${props.note.region}`
        : `${props.note.region}・${props.note.country}`,
      meta: [
        isGuide
          ? { label: "主題", value: props.note.body }
          : { label: "年份", value: props.note.vintage },
        isGuide
          ? { label: "範圍", value: props.note.country }
          : { label: "國家", value: props.note.country },
      ],
      tags: isGuide
        ? props.note.flavor_profile.slice(0, 3)
        : props.note.grape_variety.slice(0, 3),
    };
  }

  if (props.kind === "sakes") {
    return {
      href: `/sakes/${props.note.slug}`,
      eyebrow: props.note.category,
      title: props.note.title,
      subline: `${props.note.brewery}・${props.note.prefecture}`,
      meta: [
        { label: "精米步合", value: props.note.seimaibuai },
        { label: "產地", value: props.note.prefecture },
      ],
      tags: props.note.tags.slice(0, 3),
    };
  }

  return {
    href: `/mixology/${props.note.slug}`,
    eyebrow: props.note.category,
    title: props.note.title,
    subline: `${props.note.difficulty} 難度，聚焦結構與手法節奏。`,
    meta: [
      { label: "難度", value: props.note.difficulty },
      { label: "器材", value: `${props.note.equipment_needed.length} 項` },
    ],
    tags: props.note.tags.slice(0, 3),
  };
}
