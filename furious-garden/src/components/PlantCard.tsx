"use client";
import { Plant } from "@/types/product";
import { dollars } from "@/lib/format";

type Props = {
  plant: Plant;
  onAdd?: (skuId: string) => void;
};

export default function PlantCard({ plant, onAdd }: Props) {
  const cheapest = [...plant.skus].sort(
    (a, b) => a.priceCents - b.priceCents
  )[0];

  return (
    <article className="rounded-2xl border border-neutral-800 p-4">
      <h3 className="text-lg font-semibold">{plant.name}</h3>
      <p className="mt-1 text-sm text-neutral-400">{plant.summary}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {plant.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-neutral-700 px-2 py-0.5 text-xs text-neutral-400"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-neutral-300">
          from ${dollars(cheapest.priceCents)}
        </span>
        <button
          className="rounded-lg border border-neutral-700 px-3 py-1 text-sm hover:bg-neutral-800"
          onClick={() => onAdd?.(cheapest.id)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
