export type WineType =
  | "Red"
  | "White"
  | "Rose"
  | "Rosé"
  | "Sparkling"
  | "Champagne";

export interface SpiritNote {
  slug: string;
  title: string;
  type: string;
  category: string;
  region: string;
  abv: string;
  cask_type: string[];
  flavor_profile: string[];
  my_rating: string;
  tasting_date: string;
  tags: string[];
  content: string;
}

export interface WineNote {
  slug: string;
  title: string;
  type: WineType;
  vintage: string;
  region: string;
  country: string;
  grape_variety: string[];
  sweetness: string;
  body: string;
  flavor_profile: string[];
  my_rating: string;
  tasting_date: string;
  tags: string[];
  cover_image?: string;
  cover_image_alt?: string;
  content: string;
}

export interface SakeNote {
  slug: string;
  title: string;
  type: "Sake";
  category: string;
  brewery: string;
  prefecture: string;
  rice_variety: string;
  seimaibuai: string;
  sake_meter_value: string;
  acidity: string;
  abv: string;
  flavor_profile: string[];
  my_rating: string;
  tasting_date: string;
  tags: string[];
  content: string;
}

export interface MixologyNote {
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  equipment_needed: string[];
  tags: string[];
  content: string;
}

export interface GrapeVarietyProfile {
  slug: string;
  name: string;
  aliases: string[];
  category: "紅葡萄" | "白葡萄";
  body: string;
  acidity: string;
  tannin?: string;
  aromaticIntensity: string;
  signatureFlavors: string[];
  texture: string;
  bestFor: string[];
  styleNotes: string[];
  summary: string;
}

export type ContentKind = "spirits" | "wines" | "sakes" | "mixology";

export interface LatestNotesByCategory {
  spirits: SpiritNote[];
  wines: WineNote[];
  sakes: SakeNote[];
  mixology: MixologyNote[];
}
