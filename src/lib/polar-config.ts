/**
 * Polar Product Configuration
 *
 * Centralized configuration for credit packages offered via Polar.
 * Product data is stored in the database and managed via admin interface.
 */

import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";

export interface PolarProduct {
  id: string; // Polar product ID
  slug: string;
  name: string;
  credits: number;
  price: number; // Price in dollars
}

/**
 * Get all active products from database.
 * @returns Array of active products sorted by display order
 */
export async function getAllProducts(): Promise<PolarProduct[]> {
  const dbProducts = await db
    .select()
    .from(products)
    .where(eq(products.isActive, true))
    .orderBy(asc(products.displayOrder));

  return dbProducts.map((p) => ({
    id: p.polarProductId,
    slug: p.slug,
    name: p.name,
    credits: p.credits,
    price: p.priceUsd / 100, // Convert cents to dollars
  }));
}

/**
 * Get product configuration by slug.
 * @param slug - Product slug (e.g., "basic", "pro", "premium")
 * @returns Product configuration or undefined if not found
 */
export async function getProductBySlug(slug: string): Promise<PolarProduct | undefined> {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (result.length === 0) return undefined;

  const p = result[0];
  return {
    id: p.polarProductId,
    slug: p.slug,
    name: p.name,
    credits: p.credits,
    price: p.priceUsd / 100, // Convert cents to dollars
  };
}

/**
 * Get product configuration by Polar product ID.
 * @param id - Polar product ID (UUID)
 * @returns Product configuration or undefined if not found
 */
export async function getProductById(id: string): Promise<PolarProduct | undefined> {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.polarProductId, id))
    .limit(1);

  if (result.length === 0) return undefined;

  const p = result[0];
  return {
    id: p.polarProductId,
    slug: p.slug,
    name: p.name,
    credits: p.credits,
    price: p.priceUsd / 100, // Convert cents to dollars
  };
}
