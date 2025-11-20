import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth"
import { Polar } from "@polar-sh/sdk"
import { db } from "./db"
import { inngest } from "@/inngest/client"
import { user } from "./schema"
import { eq } from "drizzle-orm"

/**
 * Validates that a required environment variable exists.
 * Throws a descriptive error if the variable is missing.
 *
 * @param name - The name of the environment variable
 * @returns The value of the environment variable
 * @throws Error if the environment variable is not set
 */
function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Please check your .env file.`
    );
  }
  return value;
}

/**
 * Validates that the Better Auth secret meets security requirements.
 * The secret must be at least 32 characters long for adequate security.
 *
 * @param secret - The Better Auth secret to validate
 * @throws Error if the secret is too short
 */
function validateBetterAuthSecret(secret: string): void {
  if (secret.length < 32) {
    throw new Error(
      'BETTER_AUTH_SECRET must be at least 32 characters long. ' +
      'Generate one with: openssl rand -base64 32'
    );
  }
}

// Validate and retrieve required environment variables at module initialization
const betterAuthSecret = getRequiredEnvVar('BETTER_AUTH_SECRET');
validateBetterAuthSecret(betterAuthSecret);

// Polar environment variables
const polarAccessToken = getRequiredEnvVar('POLAR_ACCESS_TOKEN');
const polarWebhookSecret = getRequiredEnvVar('POLAR_WEBHOOK_SECRET');
const polarServer = (process.env.POLAR_SERVER || "sandbox") as "sandbox" | "production";

// Initialize Polar SDK client
const polarClient = new Polar({
  accessToken: polarAccessToken,
  server: polarServer,
});

/**
 * Better Auth configuration for the application.
 *
 * Security Features:
 * - CSRF protection via trusted origins
 * - Secure cookies with httpOnly and sameSite attributes
 * - Cookie caching for performance optimization
 * - Rate limiting to prevent brute force attacks
 * - Environment variable validation at startup
 * - Session management with automatic cleanup
 *
 * Authentication:
 * - Google OAuth authentication
 * - PostgreSQL database persistence via Drizzle ORM
 * - Custom user fields (credits, platformRole)
 * - 7-day session expiration with 1-day update interval
 *
 * @see https://www.better-auth.com/docs/installation
 * @see https://www.better-auth.com/docs/concepts/session-management
 */
export const auth = betterAuth({
  // Required: Secret for session encryption and OAuth callbacks
  secret: betterAuthSecret,
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // CRITICAL: Trusted origins for CSRF protection
  // Only requests from these origins will be accepted
  trustedOrigins: [
    "http://localhost:3000", // Development
    process.env.NEXT_PUBLIC_APP_URL || "", // Production URL from env
    // Add any additional trusted origins here (e.g., staging, preview deployments)
  ].filter(Boolean), // Remove empty strings

  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  // Session configuration for security and performance
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days - sessions expire after this
    updateAge: 60 * 60 * 24, // 1 day - update session in DB after this time
    freshAge: 60 * 10, // 10 minutes - session considered "fresh" for this duration

    // Cookie caching for performance optimization
    // Reduces database queries by storing session data in a signed cookie
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes - cache duration (balance between performance and freshness)
    },
  },

  // Advanced security configuration for cookies
  advanced: {
    // Force secure cookies in production (requires HTTPS)
    useSecureCookies: process.env.NODE_ENV === "production",

    // Set default secure attributes for all cookies
    defaultCookieAttributes: {
      httpOnly: true, // Prevent JavaScript access to cookies
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "lax", // CSRF protection (explicit is better than implicit)
    },

    // Add a cookie prefix for namespace isolation
    cookiePrefix: "plushify",
  },

  // Rate limiting to prevent brute force attacks
  rateLimit: {
    enabled: true,
    window: 60, // 60 seconds
    max: 10, // Maximum 10 requests per minute per IP
    customRules: {
      // Disable rate limiting for Polar webhooks to prevent blocking legitimate payment notifications
      "/polar/webhooks": false,
    },
  },

  socialProviders: {
    google: {
      clientId: getRequiredEnvVar('GOOGLE_CLIENT_ID'),
      clientSecret: getRequiredEnvVar('GOOGLE_CLIENT_SECRET'),
    },
  },

  user: {
    additionalFields: {
      credits: {
        type: "number",
        required: false,
        defaultValue: 1, // New users get 1 free credit
        input: false,
      },
      platformRole: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
    },
  },

  // Plugins for Next.js integration
  // nextCookies enables proper cookie handling in Server Actions
  plugins: [
    nextCookies(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: polarWebhookSecret,
          onOrderPaid: async (payload) => {
            // The Better Auth Polar plugin stores the Better Auth user ID in customer.externalId
            // payload.data.userId contains the Polar customer ID, not the Better Auth user ID
            const betterAuthUserId = payload.data.customer?.externalId;

            if (!betterAuthUserId) {
              console.error("[Polar Webhook] No externalId found in customer object");
              console.error("[Polar Webhook] Payload:", JSON.stringify(payload.data, null, 2));
              throw new Error("No Better Auth user ID (externalId) found in Polar webhook payload");
            }

            console.log(`[Polar Webhook] Processing order for user ${betterAuthUserId} (${payload.data.customer?.email})`);

            // Verify user exists in database
            const existingUser = await db
              .select({ id: user.id, email: user.email })
              .from(user)
              .where(eq(user.id, betterAuthUserId))
              .limit(1);

            if (!existingUser || existingUser.length === 0) {
              console.error(`[Polar Webhook] User ${betterAuthUserId} not found in database`);
              throw new Error(`User ${betterAuthUserId} not found in database`);
            }

            console.log(`[Polar Webhook] User verified: ${existingUser[0].email}`);

            // Send event to Inngest for async processing
            await inngest.send({
              name: "polar/order.paid",
              data: {
                orderId: payload.data.id,
                checkoutId: payload.data.checkoutId,
                userId: betterAuthUserId, // Use the Better Auth user ID from externalId
                productId: payload.data.productId,
                amount: payload.data.totalAmount,
                createdAt: payload.data.createdAt.toISOString(),
              },
            });

            console.log(`[Polar Webhook] Successfully sent order.paid event to Inngest for order ${payload.data.id}`);
          },
        }),
      ],
    }),
  ],
})

export type Session = typeof auth.$Infer.Session