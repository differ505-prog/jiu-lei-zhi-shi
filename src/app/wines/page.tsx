import { CategoryHero } from "@/components/category-hero";
import { DrinkCard } from "@/components/drink-card";
import { getAllWines } from "@/lib/mdx";

export default async function WinesPage() {
  const wines = await getAllWines();

  return (
    <div className="space-y-10 pb-10">
      <CategoryHero
        eyebrow="葡萄酒酒窖"
        title="葡萄酒窖"
        description="從年份、國家、產區到葡萄品種與酒體結構，把每一瓶酒的風格輪廓整理成可回看、可比較的知識筆記。"
        hint="年份、國家、酒體結構"
        tone="wine"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {wines.map((note) => (
          <DrinkCard key={note.slug} kind="wines" note={note} />
        ))}
      </div>
    </div>
  );
}
