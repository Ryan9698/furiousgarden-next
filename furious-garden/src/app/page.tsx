"use client";
import { useState } from "react";
import PlantCard from "@/components/PlantCard";
import { PLANTS } from "@/data/mock";

type Cart = Record<string, number>; // skuId -> qty

export default function Home() {
  const [cart, setCart] = useState<Cart>({});

  function handleAdd(skuId: string) {
    setCart((prev) => ({ ...prev, [skuId]: (prev[skuId] ?? 0) + 1 }));
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-4xl font-bold tracking-tight">Furious Garden</h1>
      <p className="mt-2 text-neutral-300">
        Next.js 15 + TypeScript + Tailwind is live.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PLANTS.map((p) => (
          <PlantCard key={p.id} plant={p} onAdd={handleAdd} />
        ))}
      </div>

      <pre className="mt-8 rounded-xl bg-neutral-900 p-3 text-xs text-neutral-300">
        {JSON.stringify(cart, null, 2)}
      </pre>
    </main>
  );
}
