import { Plant } from "@/types/product";

export const PLANTS: Plant[] = [
  {
    id: "p01",
    slug: "venus-flytrap",
    name: "Venus Flytrap",
    tags: ["carnivorous", "indoor"],
    // summary: "Classic snap traps; great beginner plant.",
    skus: [
      { id: "sku_vft_s", size: "S", priceCents: 1299, stock: 8 },
      { id: "sku_vft_m", size: "M", priceCents: 1799, stock: 5 },
    ],
    imageUrl: "/assets/vft.jpg",
  },
  {
    id: "p02",
    slug: "sundew",
    name: "Sundew",
    tags: ["carnivorous", "sticky", "indoor"],
    // summary: "Glistening dew and fast growth.",
    skus: [{ id: "sku_sd_s", size: "S", priceCents: 999, stock: 12 }],
  },
];
