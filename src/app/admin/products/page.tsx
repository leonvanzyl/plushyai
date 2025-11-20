import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAllProductsAdmin } from "@/app/actions/manage-products";
import { ProductsTable } from "@/components/admin/products-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

/**
 * Admin Products Management Page
 *
 * Allows platform administrators to manage product configurations stored in the database.
 * Only accessible to users with platformRole === "admin".
 */
export default async function AdminProductsPage() {
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

  // Fetch all products
  const productsResult = await getAllProductsAdmin();

  if (!productsResult.success) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Product Management</h1>
          <p className="text-muted-foreground mb-8">
            Manage credit packages and pricing
          </p>
          <div className="text-red-500">
            Error loading products: {productsResult.error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Product Management</h1>
            <p className="text-muted-foreground">
              Manage credit packages and pricing configuration
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>

        <ProductsTable products={productsResult.data || []} />
      </div>
    </div>
  );
}
