export type SkuSize = "S" | "M" | "L" | "XL";

export interface Sku {
  id: string; // e.g. "sku_vft_s"
  size: SkuSize; // union keeps sizes consistent
  priceCents: number; // integers for money
  stock: number; // available units
}

export interface Plant {
  id: string; // "p01"
  slug: string; // "venus-flytrap"
  name: string; // "Venus Flytrap"
  tags: string[]; // ["carnivorous","indoor"]
  summary: string; // short blurb
  skus: Sku[]; // one-to-many
  imageUrl?: string; // optional
}
