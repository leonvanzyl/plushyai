import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getProductByIdAdmin } from "@/app/actions/manage-products";
import { ProductForm } from "@/components/admin/product-form";

/**
 * Admin Edit Product Page
 *
 * Allows platform administrators to edit existing products.
 * Only accessible to users with platformRole === "admin".
 */
export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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

  // Fetch product
  const productResult = await getProductByIdAdmin(id);

  if (!productResult.success || !productResult.data) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground">
            The product you&apos;re looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <ProductForm mode="edit" product={productResult.data} />
      </div>
    </div>
  );
}
