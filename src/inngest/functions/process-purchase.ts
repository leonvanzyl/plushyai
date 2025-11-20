/**
 * Inngest Function: Process Purchase
 *
 * Handles the async processing of Polar order.paid webhook events.
 * Implements idempotency to prevent duplicate credit additions.
 *
 * Flow:
 * 1. Check if purchase already processed (idempotency)
 * 2. Validate product configuration
 * 3. Create purchase record
 * 4. Add credits atomically with transaction logging
 */

import { inngest } from "@/inngest/client";
import { db } from "@/lib/db";
import { purchases, creditTransactions, user } from "@/lib/schema";
import { getProductById } from "@/lib/polar-config";
import { eq, sql } from "drizzle-orm";

/**
 * Process a Polar order.paid event and add credits to user account.
 *
 * Retry Strategy:
 * - 3 automatic retries with exponential backoff
 * - Idempotency prevents duplicate processing
 * - Transient failures (DB, network) automatically retried
 */
export const processPurchase = inngest.createFunction(
  {
    id: "process-purchase",
    retries: 3,
  },
  { event: "polar/order.paid" },
  async ({ event, step }) => {
    const { orderId, checkoutId, userId, productId, amount, createdAt } =
      event.data;

    console.log(`[Inngest] Processing purchase for order ${orderId}`);

    // Step 1: Check for duplicate purchase (idempotency)
    const existingPurchase = await step.run(
      "check-duplicate",
      async () => {
        const result = await db
          .select()
          .from(purchases)
          .where(eq(purchases.polarOrderId, orderId))
          .limit(1);
        return result[0];
      }
    );

    if (existingPurchase) {
      console.log(
        `[Inngest] Purchase ${orderId} already processed, skipping (idempotency)`
      );
      return {
        success: true,
        message: "Purchase already processed",
        purchaseId: existingPurchase.id,
      };
    }

    // Step 2: Validate product ID and get product configuration
    const product = await step.run("get-product-config", async () => {
      if (!productId) {
        throw new Error(
          "Product ID is missing from order. Cannot process purchase without product information."
        );
      }
      const prod = await getProductById(productId);
      if (!prod) {
        throw new Error(
          `Product ID ${productId} not found in configuration. Cannot process purchase.`
        );
      }
      return prod;
    });

    // Step 3: Create purchase record
    const purchase = await step.run("create-purchase-record", async () => {
      // productId is guaranteed to be non-null after validation in step 2
      const validatedProductId = productId as string;

      const [newPurchase] = await db
        .insert(purchases)
        .values({
          userId,
          polarOrderId: orderId,
          polarCheckoutId: checkoutId,
          productId: validatedProductId,
          productName: product.name,
          amount,
          credits: product.credits,
          status: "completed",
          createdAt: new Date(createdAt),
          completedAt: new Date(),
        })
        .returning();
      return newPurchase;
    });

    // Step 4: Add credits atomically with transaction tracking
    await step.run("add-credits", async () => {
      await db.transaction(async (tx) => {
        // Update user credits
        const [updatedUser] = await tx
          .update(user)
          .set({
            credits: sql`${user.credits} + ${product.credits}`,
          })
          .where(eq(user.id, userId))
          .returning();

        if (!updatedUser) {
          throw new Error(`User ${userId} not found`);
        }

        // Record credit transaction
        await tx.insert(creditTransactions).values({
          userId,
          type: "purchase",
          amount: product.credits,
          balanceAfter: updatedUser.credits,
          relatedId: purchase.id,
          description: `Purchased ${product.name}`,
          metadata: {
            orderId,
            productId,
            productName: product.name,
          },
        });

        console.log(
          `[Inngest] Successfully added ${product.credits} credits to user ${userId}. New balance: ${updatedUser.credits}`
        );
      });
    });

    return {
      success: true,
      purchaseId: purchase.id,
      credits: product.credits,
      message: `Purchase processed successfully`,
    };
  }
);
