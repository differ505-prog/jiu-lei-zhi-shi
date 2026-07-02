import Image from "next/image";
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

const cardGlowMap = {
  spirits: "from-amber-500/18 via-amber-300/6 to-transparent",
  wines: "from-rose-500/18 via-fuchsia-300/6 to-transparent",
  sakes: "from-stone-200/16 via-white/8 to-transparent",
  mixology: "from-sky-400/16 via-slate-200/6 to-transparent",
};

interface CardConfig {
  href: string;
  eyebrow: string;
  title: string;
  subline: string;
  meta: Array<{
    label: string;
    value: string;
  }>;
  tags: string[];
  media?:
    | {
        kind: "image";
        src: string;
        alt: string;
        eyebrow: string;
        title: string;
      }
    | {
        kind: "panel";
        eyebrow: string;
        title: string;
        description: string;
      };
}

export function DrinkCard(props: DrinkCardProps) {
  const config = buildCardContent(props);

  return (
    <Link
      href={config.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/6 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_26px_100px_rgba(0,0,0,0.42)]"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cardGlowMap[props.kind]} opacity-80 transition duration-300 group-hover:opacity-100`}
      />
      <div className="absolute inset-y-0 right-0 w-px bg-white/8" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="relative space-y-5">
        {config.media ? (
          <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-black/25 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
            {config.media.kind === "image" ? (
              <div className="relative aspect-[4/5]">
                <Image
                  src={config.media.src}
                  alt={config.media.alt}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04] group-hover:saturate-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/15 to-transparent opacity-70" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-rose-100/75">
                    {config.media.eyebrow}
                  </p>
                  <p className="mt-2 font-serif text-2xl text-stone-50">
                    {config.media.title}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden px-5 py-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.2),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
                <div className="relative space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-rose-100/70">
                    {config.media.eyebrow}
                  </p>
                  <p className="max-w-[16rem] font-serif text-2xl text-stone-100">
                    {config.media.title}
                  </p>
                  <p className="max-w-[18rem] text-sm leading-7 text-slate-300">
                    {config.media.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : null}

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

function buildCardContent(props: DrinkCardProps): CardConfig {
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
      media: props.note.cover_image
        ? {
            kind: "image",
            src: props.note.cover_image,
            alt: props.note.cover_image_alt ?? props.note.title,
            eyebrow: isGuide ? "Wine Guide" : props.note.region,
            title: props.note.title,
          }
        : isGuide
          ? {
              kind: "panel",
              eyebrow: "Selection Framework",
              title: "從評分讀出真正的購買價值",
              description:
                "把樣本數、酒種偏誤與年份波動拆開來看，讓高分不再只是情緒指標。",
            }
          : undefined,
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
