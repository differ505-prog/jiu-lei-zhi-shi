interface TagProps {
  children: React.ReactNode;
  tone?: "amber" | "wine" | "rice" | "slate";
}

const toneMap = {
  amber:
    "border-amber-400/20 bg-amber-500/10 text-amber-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
  wine: "border-rose-400/20 bg-rose-500/10 text-rose-200",
  rice: "border-stone-300/20 bg-stone-200/10 text-stone-200",
  slate: "border-slate-300/15 bg-slate-200/10 text-slate-200",
} as const;

export function Tag({ children, tone = "amber" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase ${toneMap[tone]}`}
    >
      {children}
    </span>
  );
}
