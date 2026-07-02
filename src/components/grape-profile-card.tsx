import { Tag } from "@/components/tag";
import type { GrapeVarietyProfile } from "@/types/content";

interface GrapeProfileCardProps {
  profile: GrapeVarietyProfile;
}

export function GrapeProfileCard({ profile }: GrapeProfileCardProps) {
  return (
    <article
      id={profile.slug}
      className="rounded-[1.85rem] border border-white/10 bg-white/6 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl"
    >
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="wine">{profile.category}</Tag>
            {profile.aliases.map((alias) => (
              <Tag key={alias} tone="slate">
                {alias}
              </Tag>
            ))}
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-3xl text-stone-100">{profile.name}</h3>
            <p className="text-sm leading-7 text-slate-300">{profile.summary}</p>
          </div>
        </div>

        <div className="grid gap-3 rounded-[1.4rem] border border-white/8 bg-black/20 p-4 sm:grid-cols-2">
          <Stat label="酒體" value={profile.body} />
          <Stat label="酸度" value={profile.acidity} />
          {profile.tannin ? <Stat label="單寧" value={profile.tannin} /> : null}
          <Stat label="香氣強度" value={profile.aromaticIntensity} />
        </div>

        <section className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
            代表風味
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.signatureFlavors.map((flavor) => (
              <Tag key={flavor} tone="wine">
                {flavor}
              </Tag>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
            口感印象
          </p>
          <p className="text-sm leading-7 text-slate-300">{profile.texture}</p>
        </section>

        <section className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
            風格辨識
          </p>
          <ul className="space-y-2 text-sm leading-7 text-slate-300">
            {profile.styleNotes.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
            適合搭配
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.bestFor.map((item) => (
              <Tag key={item} tone="rice">
                {item}
              </Tag>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
        {label}
      </p>
      <p className="text-sm text-stone-100">{value}</p>
    </div>
  );
}
