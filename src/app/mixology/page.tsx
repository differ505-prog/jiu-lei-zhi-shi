import { CategoryHero } from "@/components/category-hero";
import { DrinkCard } from "@/components/drink-card";
import { getAllMixology } from "@/lib/mdx";

export default async function MixologyPage() {
  const notes = await getAllMixology();

  return (
    <div className="space-y-10 pb-10">
      <CategoryHero
        eyebrow="調酒實驗室"
        title="調酒實驗室"
        description="整理經典配方、器材需求與手法技巧，讓每一篇調酒筆記都能直接回到操作台上複現與修正。"
        hint="技巧、平衡與出杯"
        tone="slate"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {notes.map((note) => (
          <DrinkCard key={note.slug} kind="mixology" note={note} />
        ))}
      </div>
    </div>
  );
}
