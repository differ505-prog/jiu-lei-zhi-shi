import { CategoryHero } from "@/components/category-hero";
import { SakeCatalog } from "@/components/sake-catalog";
import { getAllSakes } from "@/lib/mdx";

export default async function SakesPage() {
  const sakes = await getAllSakes();

  return (
    <div className="space-y-10 pb-10">
      <CategoryHero
        eyebrow="清酒紀行"
        title="清酒紀行"
        description="以酒造、酒米、精米步合、日本酒度與酸度等欄位拆解清酒風格，並提供 category 篩選器，快速收斂到想喝的方向。"
        hint="支援類型篩選"
        tone="rice"
      />

      <SakeCatalog notes={sakes} />
    </div>
  );
}
