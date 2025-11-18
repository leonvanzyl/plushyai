# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Plushify** - An AI-powered web application that transforms uploaded images into adorable plushified versions. Users upload images (people, pets, objects), and the app generates cute plush toy versions using Google's Gemini AI. Features a credit-based system, user galleries, and secure authentication.

**Tech Stack:**
- Next.js 15 (App Router) with React 19 and TypeScript
- Better Auth for authentication (Google OAuth)
- Drizzle ORM with PostgreSQL
- Vercel AI SDK with OpenRouter (Gemini models)
- Vercel Blob Storage for image hosting
- Inngest for background job processing
- shadcn/ui components with Tailwind CSS 4

## Development Commands

```bash
# Development
pnpm dev                # Start dev server with Turbopack
pnpm dev:inngest        # Start Inngest dev server (runs on http://localhost:8288)
pnpm build              # Run migrations then build for production
pnpm start              # Start production server

# Code Quality (IMPORTANT: Always run after changes)
pnpm lint               # Run ESLint
pnpm typecheck          # TypeScript type checking

# Database Management
pnpm db:generate        # Generate migration files from schema changes
pnpm db:migrate         # Run pending migrations (used in build)
pnpm db:push            # Push schema directly to DB (development only)
pnpm db:dev             # Alias for db:push (quick dev iterations)
pnpm db:studio          # Open Drizzle Studio GUI
pnpm db:reset           # DROP all tables and re-push (destructive)
```

**Development Workflow for Background Jobs:**
Run two terminals concurrently:
1. Terminal 1: `pnpm dev` (Next.js dev server on http://localhost:3000)
2. Terminal 2: `pnpm dev:inngest` (Inngest dev server on http://localhost:8288)

**Critical Development Rules:**
1. **ALWAYS** run `pnpm lint` and `pnpm typecheck` after completing changes
2. **NEVER** start the dev server yourself - if terminal output is needed, ask the user to provide it

## Architecture

### Authentication Flow (Better Auth)

**Server Configuration** (`src/lib/auth.ts`):
- Better Auth instance configured with Google OAuth
- Security features: CSRF protection, rate limiting (10 req/min), secure cookies
- Session: 7-day expiry, cookie caching (5 min) for performance
- Custom user fields: `credits` (number), `platformRole` (string)
- Environment validation at startup ensures required vars exist

**Client Utilities** (`src/lib/auth-client.ts`):
- Export: `signIn`, `signOut`, `useSession`, `getSession`
- Use `useSession()` hook in client components for auth state
- Use `auth.api.getSession()` in server actions/components

**API Route** (`src/app/api/auth/[...all]/route.ts`):
- Single catch-all handler for all auth endpoints
- Handles: `/api/auth/sign-in/google`, `/api/auth/callback/google`, etc.

**Protected Routes Pattern:**
```tsx
// Server Component
const session = await auth.api.getSession({ headers: await headers() });
if (!session?.user) redirect('/sign-in');

// Server Action
const session = await auth.api.getSession({ headers: await headers() });
if (!session?.user) return { success: false, error: "Unauthorized" };
```

### Database Architecture

**Schema Location:** `src/lib/schema.ts` (single source of truth)

**Core Tables:**
- `user`: Better Auth users + custom fields (credits, platformRole)
- `session`: Better Auth sessions (indexed on userId, expiresAt, token)
- `account`: OAuth accounts (Google)
- `verification`: Email verification tokens
- `plushie_generations`: User-generated plushies with URLs and metadata

**Connection:** `src/lib/db.ts` exports singleton `db` instance using postgres.js driver

**Migration Workflow:**
1. Modify `src/lib/schema.ts`
2. Run `pnpm db:generate` to create migration file in `drizzle/`
3. Run `pnpm db:migrate` to apply (or `pnpm db:push` for dev)
4. Commit both schema and migration files

**Indexes:** All foreign keys and frequently queried columns have indexes for performance

### Image Generation Pipeline (Async with Inngest)

**Architecture:** Event-driven background processing using Inngest for improved reliability, observability, and user experience.

**Initiation Flow** (`src/app/actions/generate-plushie.ts`):
```
1. Auth check → session validation
2. Credit availability check → credits - processingCount >= 1
3. Concurrency check → max 5 processing generations per user
4. Create DB record → status="processing" (reserves credit)
5. Convert image → base64 for event payload
6. Send Inngest event → "plushie/generate.requested"
7. Return immediately → { generationId } for client polling
```

**Background Processing** (`src/inngest/functions/generate-plushie.ts`):
Runs asynchronously with step-based execution for granular retries:
```
Step 1: Upload original → Vercel Blob Storage
Step 2: AI Analysis → Gemini vision model identifies subject
Step 3: AI Generation + Upload → Generate plushie AND upload to Blob (combined to avoid 4MB step output limit)
Step 4: Finalize → Deduct credit atomically, set status="completed"
```

**Important:** Step 3 combines generation and upload because returning large binary image data between steps would exceed Inngest's 4MB step output limit.

**Status Tracking** (`src/app/actions/get-generation-status.ts`):
- Client polls every 3 seconds for status updates
- Statuses: "processing" → "completed" or "failed"
- 5-minute timeout with error fallback
- Ownership validation ensures users only see their generations

**Retry Mechanism** (`src/app/actions/retry-generation.ts`):
- Failed generations can be retried without re-upload
- No additional credit charged for retries
- Reuses original image from Blob storage
- Sends new Inngest event with existing image data

**Two-Step AI Process:**
- **Step 1:** `google/gemini-2.5-flash-image` analyzes uploaded image
  - Returns: subject type (person/pet/other), description, key features
- **Step 2:** `google/gemini-2.5-flash-image-preview` generates plushie
  - Input: original image + analysis-based prompt
  - Output: PNG image in `result.files[0].uint8Array`

**Error Handling:**
- Automatic retries: 3 attempts with exponential backoff (Inngest)
- Failed generations trigger cleanup: delete uploaded Blobs
- Credits never deducted on failure (only reserved during processing)
- Failure handler updates status to "failed" for retry UI
- All errors return user-friendly messages

**Storage Structure:**
```
Vercel Blob:
  plushify/originals/{userId}/{generationId}.{ext}
  plushify/generated/{userId}/{generationId}.png
```

**Observability:**
- Local: Inngest Dev UI at http://localhost:8288 shows all runs, steps, retries
- Production: Inngest Cloud dashboard with metrics and alerts
- Structured logging with `[Inngest]` prefix for easy filtering

### Server Actions Pattern

Located in `src/app/actions/`:
- `generate-plushie.ts`: Initiate background generation (sends Inngest event)
- `get-generation-status.ts`: Poll generation status for client updates
- `get-processing-count.ts`: Get count of processing generations (for concurrency validation)
- `retry-generation.ts`: Retry failed generation without re-upload
- `get-generations.ts`: Fetch user's gallery with pagination
- `delete-generation.ts`: Remove generation + cleanup Blobs

**Common Pattern:**
```typescript
"use server";
export async function actionName(...): Promise<{ success: boolean; data?: T; error?: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { success: false, error: "Unauthorized" };
  // ... action logic
}
```

### Component Architecture

**Page Structure:**
- `/` - Landing page (public)
- `/sign-in` - Google OAuth sign-in (public)
- `/dashboard` - User overview with credits (protected)
- `/generate` - Image upload + generation UI (protected)
- `/gallery` - User's plushie gallery with pagination (protected)
- `/profile` - User profile management (protected)
- `/pricing` - Credit packages (public)
- `/admin` - Admin dashboard for platformRole="admin" (protected)

**Key Components:**
- `src/components/generate/generate-page-client.tsx`: Main generation form
- `src/components/gallery/gallery-client.tsx`: Gallery grid with pagination
- `src/components/plushie/plushie-card.tsx`: Before/after slider card
- `src/components/auth/user-button.tsx`: User menu with credits display

**UI Library:** shadcn/ui components in `src/components/ui/`

### Background Jobs with Inngest

**Architecture:** Event-driven background processing for long-running tasks (image generation, AI processing).

**Core Components:**

1. **Inngest Client** (`src/inngest/client.ts`):
   - Singleton Inngest instance with app ID "plushify"
   - Type-safe event definitions for all background jobs
   - Auto-loads environment variables for authentication

2. **Functions Directory** (`src/inngest/functions/`):
   - `generate-plushie.ts`: Main image generation background job
   - Each function defines: trigger event, retry config, concurrency limits
   - Step-based execution allows granular retries and observability

3. **API Route** (`src/app/api/inngest/route.ts`):
   - Serves as webhook endpoint for Inngest to invoke functions
   - Registers all Inngest functions with the framework
   - Handles GET (health check), POST (run function), PUT (introspection)

**Event Pattern:**
```typescript
// Trigger event (from server action)
await inngest.send({
  name: "plushie/generate.requested",
  data: { generationId, userId, imageData, imageType }
});

// Function handler (in Inngest function)
inngest.createFunction(
  { id: "generate-plushie", retries: 3, concurrency: { limit: 5, key: "event.data.userId" } },
  { event: "plushie/generate.requested" },
  async ({ event, step }) => {
    // Step-based execution with automatic retries
    await step.run("step-name", async () => { /* logic */ });
  }
);
```

**Retry Strategy:**
- Automatic retries: 3 attempts with exponential backoff
- Retries configured per-function in Inngest config
- Transient failures (network issues, AI API timeouts) automatically retried
- Non-retriable errors (validation, insufficient credits) fail immediately
- Use `NonRetriableError` to skip retries for known failures

**Concurrency Control:**
- Per-user concurrency limit: 5 (prevents overwhelming AI APIs)
- Key-based: `event.data.userId` ensures limit per user, not global
- Additional user limit enforced at application level
- Failed/completed jobs free up concurrency slots automatically

**Local Development:**
- Run `pnpm dev:inngest` to start Inngest Dev Server
- Access UI at http://localhost:8288 to view:
  - All function runs with step-by-step execution details
  - Event payloads and return values
  - Retry attempts and error messages
  - Function logs and timing information

**Production Deployment:**
- Set `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` in environment
- Inngest Cloud automatically discovers functions via `/api/inngest` route
- View runs, metrics, and alerts in Inngest Cloud dashboard
- Configure failure alerts and monitoring thresholds

**Troubleshooting:**
- Check Inngest Dev UI for step-by-step execution details
- Look for `[Inngest]` prefix in server logs
- Verify `/api/inngest` route is accessible (GET should return health check)
- Ensure background jobs aren't queued if Inngest dev server isn't running
- For production, verify environment variables are set correctly

### Environment Variables

**Required:**
```env
POSTGRES_URL                # PostgreSQL connection string
BETTER_AUTH_SECRET         # Min 32 chars (generate: openssl rand -base64 32)
GOOGLE_CLIENT_ID           # Google OAuth credentials
GOOGLE_CLIENT_SECRET       # Google OAuth credentials
OPENROUTER_API_KEY         # For AI generation (OpenRouter account)
BLOB_READ_WRITE_TOKEN      # Vercel Blob Storage (required for uploads)
NEXT_PUBLIC_APP_URL        # App URL (http://localhost:3000 in dev)
```

**Optional (Development):**
```env
BETTER_AUTH_URL            # Overrides baseURL if needed
OPENROUTER_MODEL           # Default: "openai/gpt-5-mini"
POLAR_WEBHOOK_SECRET       # For payment webhooks (if implementing)
POLAR_ACCESS_TOKEN         # For Polar API (if implementing)
INNGEST_EVENT_KEY          # Optional for local dev (required in production)
INNGEST_SIGNING_KEY        # Optional for local dev (required in production)
```

**Production-Only (Inngest):**
```env
INNGEST_EVENT_KEY          # Event authentication for Inngest Cloud
INNGEST_SIGNING_KEY        # Function invocation security for Inngest Cloud
```

**Inngest Setup:**
- Local development works without keys (uses Inngest Dev Server)
- Production requires both keys from [Inngest Cloud](https://www.inngest.com)
- Keys auto-loaded from environment variables by Inngest SDK

## Important Patterns

### Credit System (Reservation Pattern)

**Credit Reservation:**
- Credits stored in `user.credits` (integer, default: 0)
- Available credits = `total credits - processing count`
- Processing count = `COUNT(*) WHERE status='processing' AND userId=X`
- Credits reserved when generation starts (status="processing")
- Credits deducted only when generation completes successfully
- Credits automatically released if generation fails (status="failed")

**Atomic Deduction:**
- Uses SQL: `UPDATE user SET credits = credits - 1 WHERE id = ? AND credits >= 1`
- This prevents negative credits even with concurrent requests
- Always check `creditResult.length === 0` to detect failed deduction

**Concurrency Limits:**
- Maximum 5 concurrent generations per user (enforced by Inngest)
- Client-side validation checks processing count before submission
- Server-side validation double-checks before creating generation record
- Users cannot start new generation if `availableCredits < 1` or `processingCount >= 5`

### Image Handling
- Max upload size: 10MB (validated in server action)
- Supported: any `image/*` MIME type
- Images converted to base64 for AI SDK multimodal messages
- Generated images extracted from `result.files[0].uint8Array`
- Next.js Image component configured for `*.public.blob.vercel-storage.com`

### Error Handling
- Server actions return structured `{ success, data?, error? }` responses
- Use `toast()` from `sonner` for user notifications
- Always cleanup resources (Blob storage) on failure
- Log errors with `console.error` for debugging

## Common Gotchas

1. **Better Auth Session:** Must use `await headers()` in server actions (Next.js requirement)
2. **Database Migrations:** Always commit migration files with schema changes
3. **Image Generation:** The `-preview` model is required for image generation; regular model only analyzes
4. **Credits Race Condition:** Use atomic SQL updates, not read-then-write
5. **Vercel Blob Cleanup:** Remember to delete Blobs when deleting database records
6. **Dev Server:** Never start dev server automatically; ask user if needed (project rule)
7. **Inngest Dev Server:** Must run `pnpm dev:inngest` in separate terminal for background jobs to work locally
8. **Generation Status:** Generations stay in "processing" state until Inngest function completes; don't assume synchronous completion
9. **Polling Cleanup:** Always clear polling intervals on component unmount to prevent memory leaks
10. **Credit Reservation:** Available credits shown in UI must account for processing generations: `credits - processingCount`

## Testing Workflow

Before any commit or deployment:
1. Run `pnpm lint` - must pass with no errors
2. Run `pnpm typecheck` - must pass with no errors
3. Test affected functionality manually
4. Verify database migrations apply cleanly

## Specifications

Project specifications are documented in `specs/`:
- Feature requirements and implementation plans
- Reference these when adding or modifying features
- Each feature has `requirements.md` and `implementation-plan.md`

## Documentation

Technical documentation in `docs/technical/`:
- Better Auth integration guides
- AI SDK patterns (streaming, structured data, image generation)
- React Markdown usage
