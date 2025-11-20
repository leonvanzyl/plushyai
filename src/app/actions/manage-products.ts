"use server";

/**
 * Server Actions: Product Management
 *
 * Admin-only operations for managing product configuration in the database.
 * All actions require platformRole="admin" for authorization.
 */

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Get all products (admin only).
 * Returns both active and inactive products for admin management.
 */
export async function getAllProductsAdmin(): Promise<
  ActionResult<Array<typeof products.$inferSelect>>
> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  if (session.user.platformRole !== "admin") {
    return { success: false, error: "Admin access required" };
  }

  try {
    const allProducts = await db.select().from(products);

    return { success: true, data: allProducts };
  } catch (error) {
    console.error("[Admin] Error fetching products:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}

/**
 * Get product by ID (admin only).
 */
export async function getProductByIdAdmin(
  productId: string
): Promise<ActionResult<typeof products.$inferSelect>> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  if (session.user.platformRole !== "admin") {
    return { success: false, error: "Admin access required" };
  }

  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (result.length === 0) {
      return { success: false, error: "Product not found" };
    }

    return { success: true, data: result[0] };
  } catch (error) {
    console.error("[Admin] Error fetching product:", error);
    return { success: false, error: "Failed to fetch product" };
  }
}

/**
 * Create a new product (admin only).
 */
export async function createProduct(data: {
  slug: string;
  polarProductId: string;
  name: string;
  credits: number;
  priceUsd: number;
  displayOrder: number;
  isActive: boolean;
}): Promise<ActionResult<typeof products.$inferSelect>> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  if (session.user.platformRole !== "admin") {
    return { success: false, error: "Admin access required" };
  }

  try {
    // Validate required fields
    if (!data.slug || !data.polarProductId || !data.name) {
      return { success: false, error: "Missing required fields" };
    }

    if (data.credits <= 0 || data.priceUsd <= 0) {
      return {
        success: false,
        error: "Credits and price must be positive numbers",
      };
    }

    // Check for duplicate slug or polarProductId
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.slug, data.slug))
      .limit(1);

    if (existing.length > 0) {
      return { success: false, error: "Product slug already exists" };
    }

    const existingPolarId = await db
      .select()
      .from(products)
      .where(eq(products.polarProductId, data.polarProductId))
      .limit(1);

    if (existingPolarId.length > 0) {
      return { success: false, error: "Polar product ID already exists" };
    }

    // Create product
    const [newProduct] = await db.insert(products).values(data).returning();

    revalidatePath("/admin/products");
    revalidatePath("/pricing");

    return { success: true, data: newProduct };
  } catch (error) {
    console.error("[Admin] Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

/**
 * Update an existing product (admin only).
 */
export async function updateProduct(
  productId: string,
  data: {
    slug?: string;
    polarProductId?: string;
    name?: string;
    credits?: number;
    priceUsd?: number;
    displayOrder?: number;
    isActive?: boolean;
  }
): Promise<ActionResult<typeof products.$inferSelect>> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  if (session.user.platformRole !== "admin") {
    return { success: false, error: "Admin access required" };
  }

  try {
    // Validate numeric fields if provided
    if (data.credits !== undefined && data.credits <= 0) {
      return { success: false, error: "Credits must be a positive number" };
    }

    if (data.priceUsd !== undefined && data.priceUsd <= 0) {
      return { success: false, error: "Price must be a positive number" };
    }

    // Check if product exists
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (existing.length === 0) {
      return { success: false, error: "Product not found" };
    }

    // Check for duplicate slug or polarProductId if being updated
    if (data.slug) {
      const duplicateSlug = await db
        .select()
        .from(products)
        .where(eq(products.slug, data.slug))
        .limit(1);

      if (duplicateSlug.length > 0 && duplicateSlug[0].id !== productId) {
        return { success: false, error: "Product slug already exists" };
      }
    }

    if (data.polarProductId) {
      const duplicatePolarId = await db
        .select()
        .from(products)
        .where(eq(products.polarProductId, data.polarProductId))
        .limit(1);

      if (
        duplicatePolarId.length > 0 &&
        duplicatePolarId[0].id !== productId
      ) {
        return { success: false, error: "Polar product ID already exists" };
      }
    }

    // Update product
    const [updatedProduct] = await db
      .update(products)
      .set(data)
      .where(eq(products.id, productId))
      .returning();

    revalidatePath("/admin/products");
    revalidatePath("/pricing");

    return { success: true, data: updatedProduct };
  } catch (error) {
    console.error("[Admin] Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

/**
 * Delete a product (admin only).
 */
export async function deleteProduct(
  productId: string
): Promise<ActionResult<void>> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  if (session.user.platformRole !== "admin") {
    return { success: false, error: "Admin access required" };
  }

  try {
    // Check if product exists
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (existing.length === 0) {
      return { success: false, error: "Product not found" };
    }

    // Delete product
    await db.delete(products).where(eq(products.id, productId));

    revalidatePath("/admin/products");
    revalidatePath("/pricing");

    return { success: true };
  } catch (error) {
    console.error("[Admin] Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}
