// src/schemas/product.ts
import { z } from "zod";

export const skuSize = z.enum(["S", "M", "L", "XL"]);
const int = z.number().int().nonnegative();

export const skuSchema = z.object({
  id: z.uuid().optional(), // optional if DB generates it
  size: skuSize,
  priceCents: int,
  stock: int,
  active: z.boolean().default(true),
});

export const productSchema = z.object({
  id: z.uuid().optional(), // optional on create
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  species: z.string().optional(),
  temperature: z.string().optional(),
  tags: z.array(z.string()).default([]),
  imageUrl: z.url().optional(),
  skus: z
    .array(skuSchema)
    .min(1, "At least one SKU is required.")
    .refine(
      (arr) => new Set(arr.map((s) => s.size)).size === arr.length,
      "SKU sizes must be unique per product."
    ),
});

export const productCreateSchema = productSchema.omit({ id: true }).and(
  z.object({
    // require ids for SKUs only if you want client-supplied; otherwise omit & let DB generate
    skus: z.array(skuSchema.omit({ id: true })),
  })
);

export const productUpdateSchema = productSchema.partial();

export type SkuSize = z.infer<typeof skuSize>;
export type Sku = z.infer<typeof skuSchema>;
export type Product = z.infer<typeof productSchema>;
