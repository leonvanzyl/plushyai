/**
 * Seed Script: Products
 *
 * Seeds the products table with the existing product configuration.
 * Run this script once to migrate from hardcoded products to database-stored products.
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/seed-products.ts
 */

import { db } from "../src/lib/db";
import { products } from "../src/lib/schema";
import { eq } from "drizzle-orm";

const PRODUCTS_TO_SEED = [
  {
    slug: "basic",
    polarProductId: "94bc2529-7b95-4a04-a1a5-42ba88de67bc",
    name: "Basic Package",
    credits: 30,
    priceUsd: 900, // $9.00 in cents
    displayOrder: 0,
    isActive: true,
  },
  {
    slug: "pro",
    polarProductId: "085a268c-d0c7-4f11-9e84-a49ecee7eda5",
    name: "Pro Package",
    credits: 100,
    priceUsd: 1900, // $19.00 in cents
    displayOrder: 1,
    isActive: true,
  },
  {
    slug: "premium",
    polarProductId: "04035724-fade-4b6c-b2cb-cf53b7ad4855",
    name: "Premium Package",
    credits: 200,
    priceUsd: 2900, // $29.00 in cents
    displayOrder: 2,
    isActive: true,
  },
];

async function seedProducts() {
  console.log("🌱 Seeding products...");

  try {
    for (const product of PRODUCTS_TO_SEED) {
      // Check if product already exists by slug
      const existing = await db
        .select()
        .from(products)
        .where(eq(products.slug, product.slug))
        .limit(1);

      if (existing.length > 0) {
        console.log(`⏭️  Product "${product.name}" already exists, skipping...`);
        continue;
      }

      // Check if Polar product ID already exists
      const existingPolarId = await db
        .select()
        .from(products)
        .where(eq(products.polarProductId, product.polarProductId))
        .limit(1);

      if (existingPolarId.length > 0) {
        console.log(
          `⏭️  Product with Polar ID "${product.polarProductId}" already exists, skipping...`
        );
        continue;
      }

      // Insert product
      const [inserted] = await db.insert(products).values(product).returning();

      console.log(`✅ Created product: ${inserted.name} (${inserted.slug})`);
    }

    console.log("\n✨ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }

  process.exit(0);
}

seedProducts();
