import { CategoryHero } from "@/components/category-hero";
import { DrinkCard } from "@/components/drink-card";
import { getAllSpirits } from "@/lib/mdx";

export default async function SpiritsPage() {
  const spirits = await getAllSpirits();

  return (
    <div className="space-y-10 pb-10">
      <CategoryHero
        eyebrow="烈酒檔案"
        title="烈酒圖鑑"
        description="聚焦威士忌、琴酒與其他烈酒的產區、桶型、酒精結構與個人品飲評分，保留知識庫式的查找效率，也保留夜色收藏館的質感。"
        hint="產區、桶型、風味輪廓"
        tone="amber"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {spirits.map((note) => (
          <DrinkCard key={note.slug} kind="spirits" note={note} />
        ))}
      </div>
    </div>
  );
}
