interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="space-y-4">
      <p className="text-[11px] uppercase tracking-[0.35em] text-amber-300/80">
        {eyebrow}
      </p>
      <div className="space-y-3">
        <h2 className="font-serif text-3xl tracking-[0.02em] text-stone-50 sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
