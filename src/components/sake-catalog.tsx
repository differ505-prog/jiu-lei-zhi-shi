"use client";

import { useMemo, useState } from "react";

import { DrinkCard } from "@/components/drink-card";
import { Tag } from "@/components/tag";
import type { SakeNote } from "@/types/content";

interface SakeCatalogProps {
  notes: SakeNote[];
}

export function SakeCatalog({ notes }: SakeCatalogProps) {
  const categories = useMemo(
    () => ["全部", ...new Set(notes.map((note) => note.category))],
    [notes],
  );
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredNotes = useMemo(() => {
    if (activeCategory === "全部") {
      return notes;
    }

    return notes.filter((note) => note.category === activeCategory);
  }, [activeCategory, notes]);

  return (
    <div className="space-y-8">
      <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const active = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm transition duration-200 ${
                  active
                    ? "border-amber-400/30 bg-amber-500/15 text-amber-100"
                    : "border-white/10 bg-black/20 text-slate-300 hover:border-white/20 hover:bg-white/8"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span>目前顯示 {filteredNotes.length} 款清酒</span>
          <Tag tone="rice">{activeCategory}</Tag>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredNotes.map((note) => (
          <DrinkCard key={note.slug} kind="sakes" note={note} />
        ))}
      </div>
    </div>
  );
}
