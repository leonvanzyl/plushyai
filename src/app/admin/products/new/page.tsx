import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";

/**
 * Admin Create Product Page
 *
 * Allows platform administrators to create new products.
 * Only accessible to users with platformRole === "admin".
 */
export default async function NewProductPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // First check: User must be authenticated
  if (!session) {
    redirect("/sign-in");
  }

  // Second check: User must have admin role
  const user = session.user as typeof session.user & { platformRole?: string };
  const isAdmin = user.platformRole === "admin";

  if (!isAdmin) {
    console.warn(
      `[SECURITY] Unauthorized admin access attempt by user ${user.id} (${user.email})`
    );
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
