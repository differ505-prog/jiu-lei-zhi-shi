interface ContentMetaGridProps {
  items: Array<{
    label: string;
    value: string;
  }>;
}

export function ContentMetaGrid({ items }: ContentMetaGridProps) {
  return (
    <section className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className="rounded-2xl border border-white/8 bg-black/20 p-4"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
            {item.label}
          </p>
          <p className="mt-3 text-sm leading-7 text-stone-100">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
