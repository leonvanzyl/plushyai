import { pgTable, text, timestamp, boolean, integer, index, uuid, jsonb } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  platformRole: text("platform_role").default("user").notNull(),
  credits: integer("credits").default(1).notNull(), // New users get 1 free credit
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
}, (table) => ({
  // Indexes for better query performance
  userIdIdx: index("session_user_id_idx").on(table.userId),
  expiresAtIdx: index("session_expires_at_idx").on(table.expiresAt),
  // Composite index for token + expiry checks (common query pattern)
  tokenExpiresIdx: index("session_token_expires_idx").on(table.token, table.expiresAt),
}));

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (table) => ({
  // Add indexes for better query performance
  userIdIdx: index("account_user_id_idx").on(table.userId),
  providerAccountIdx: index("account_provider_account_idx").on(table.providerId, table.accountId),
}));

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (table) => ({
  // Indexes for better query performance during email verification flows
  // Index for looking up verification tokens by identifier (email)
  identifierIdx: index("verification_identifier_idx").on(table.identifier),
  // Index for cleaning up expired tokens
  expiresAtIdx: index("verification_expires_at_idx").on(table.expiresAt),
}));

export const plushieGenerations = pgTable("plushie_generations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  originalImageUrl: text("original_image_url").notNull(),
  plushieImageUrl: text("plushie_image_url").notNull(),
  subjectType: text("subject_type", { enum: ["person", "pet", "other"] }).notNull(),
  status: text("status", { enum: ["processing", "completed", "failed"] }).notNull().default("processing"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (table) => ({
  // Index for querying user's generations
  userIdIdx: index("plushie_generations_user_id_idx").on(table.userId),
  // Index for sorting by creation date
  createdAtIdx: index("plushie_generations_created_at_idx").on(table.createdAt),
  // Composite index for user + created_at (most common query pattern)
  userCreatedIdx: index("plushie_generations_user_created_idx").on(table.userId, table.createdAt),
}));

export const purchases = pgTable("purchases", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  polarOrderId: text("polar_order_id").notNull().unique(),
  polarCheckoutId: text("polar_checkout_id"),
  productId: text("product_id").notNull(),
  productName: text("product_name").notNull(),
  amount: integer("amount").notNull(), // Amount in cents
  credits: integer("credits").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
}, (table) => ({
  // Index for querying user's purchases
  userIdIdx: index("purchases_user_id_idx").on(table.userId),
  // Index for looking up by Polar order ID (webhook processing)
  polarOrderIdIdx: index("purchases_polar_order_id_idx").on(table.polarOrderId),
}));

export const creditTransactions = pgTable("credit_transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  type: text("type", { enum: ["purchase", "generation", "refund", "adjustment"] }).notNull(),
  amount: integer("amount").notNull(), // Positive for additions, negative for deductions
  balanceAfter: integer("balance_after").notNull(),
  relatedId: text("related_id"), // References purchase ID or generation ID
  description: text("description"),
  metadata: jsonb("metadata"), // Additional context as JSON
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  // Index for querying user's transactions
  userIdIdx: index("credit_transactions_user_id_idx").on(table.userId),
  // Index for filtering by transaction type
  typeIdx: index("credit_transactions_type_idx").on(table.type),
  // Index for looking up by related ID
  relatedIdIdx: index("credit_transactions_related_id_idx").on(table.relatedId),
  // Composite index for user + created_at (most common query pattern)
  userCreatedIdx: index("credit_transactions_user_created_idx").on(table.userId, table.createdAt),
}));

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  polarProductId: text("polar_product_id").notNull().unique(),
  name: text("name").notNull(),
  credits: integer("credits").notNull(),
  priceUsd: integer("price_usd").notNull(), // Price in cents
  displayOrder: integer("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (table) => ({
  // Index for active products lookup
  isActiveIdx: index("products_is_active_idx").on(table.isActive),
  // Index for sorting by display order
  displayOrderIdx: index("products_display_order_idx").on(table.displayOrder),
}));
