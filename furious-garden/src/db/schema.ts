// src/db/schema.ts
import {
  pgTable,
  text,
  varchar,
  boolean,
  integer,
  timestamp,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Postgres enum for sizes (prevents typos at DB level)
export const skuSizeEnum = pgEnum("sku_size", ["S", "M", "L", "XL"]);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  description: text("description"),
  species: varchar("species", { length: 120 }),
  temperature: varchar("temperature", { length: 120 }),
  tags: text("tags").$type<string[]>().array().notNull().default([]),
  imageUrl: text("image_url"), // nullable in DB; map undefined->null on insert
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const skus = pgTable("skus", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  size: skuSizeEnum("size").notNull(),
  priceCents: integer("price_cents").notNull(), // store money as cents
  stock: integer("stock").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
  skus: many(skus),
}));

export const skusRelations = relations(skus, ({ one }) => ({
  product: one(products, {
    fields: [skus.productId],
    references: [products.id],
  }),
}));
