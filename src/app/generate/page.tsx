import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { GeneratePageClient } from "@/components/generate/generate-page-client";

/**
 * Server Component for the Generate page with server-side authentication.
 *
 * Security Features:
 * - Server-side session validation (no client-side flash)
 * - Redirect unauthenticated users before rendering any client code
 * - Type-safe access to custom user fields (credits)
 * - Cannot be bypassed with browser DevTools
 *
 * This pattern is more secure than client-side auth checks and prevents
 * unauthorized users from ever seeing protected content.
 */
export default async function GeneratePage() {
  // Server-side session validation - THE SECURE WAY
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // Redirect unauthenticated users on the server (no client-side flash)
  if (!session) {
    redirect("/sign-in");
  }

  // Type-safe access to custom user fields
  const user = session.user as typeof session.user & { credits?: number };
  const userCredits = user.credits ?? 0;

  // Pass authenticated data to the client component
  return <GeneratePageClient userCredits={userCredits} />;
}
