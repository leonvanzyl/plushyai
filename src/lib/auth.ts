import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { db } from "./db"

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
      strategy: "compact", // Options: "compact" (smallest), "jwt" (standard), or "jwe" (encrypted)
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
        defaultValue: 0,
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
  ],
})

export type Session = typeof auth.$Infer.Session