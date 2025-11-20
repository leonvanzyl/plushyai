"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/app/actions/manage-products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

type Product = {
  id: string;
  slug: string;
  polarProductId: string;
  name: string;
  credits: number;
  priceUsd: number;
  displayOrder: number;
  isActive: boolean;
};

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

export function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    slug: product?.slug || "",
    polarProductId: product?.polarProductId || "",
    name: product?.name || "",
    credits: product?.credits?.toString() || "",
    priceUsd: product?.priceUsd ? (product.priceUsd / 100).toString() : "",
    displayOrder: product?.displayOrder?.toString() || "0",
    isActive: product?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (
        !formData.slug ||
        !formData.polarProductId ||
        !formData.name ||
        !formData.credits ||
        !formData.priceUsd
      ) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      const credits = parseInt(formData.credits);
      const priceUsd = Math.round(parseFloat(formData.priceUsd) * 100); // Convert to cents
      const displayOrder = parseInt(formData.displayOrder);

      if (isNaN(credits) || credits <= 0) {
        toast.error("Credits must be a positive number");
        setIsSubmitting(false);
        return;
      }

      if (isNaN(priceUsd) || priceUsd <= 0) {
        toast.error("Price must be a positive number");
        setIsSubmitting(false);
        return;
      }

      if (isNaN(displayOrder)) {
        toast.error("Display order must be a number");
        setIsSubmitting(false);
        return;
      }

      let result;
      if (mode === "create") {
        result = await createProduct({
          slug: formData.slug,
          polarProductId: formData.polarProductId,
          name: formData.name,
          credits,
          priceUsd,
          displayOrder,
          isActive: formData.isActive,
        });
      } else {
        if (!product?.id) {
          toast.error("Product ID is missing");
          setIsSubmitting(false);
          return;
        }

        result = await updateProduct(product.id, {
          slug: formData.slug,
          polarProductId: formData.polarProductId,
          name: formData.name,
          credits,
          priceUsd,
          displayOrder,
          isActive: formData.isActive,
        });
      }

      if (result.success) {
        toast.success(
          mode === "create"
            ? "Product created successfully"
            : "Product updated successfully"
        );
        router.push("/admin/products");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-4xl font-bold">
            {mode === "create" ? "Create Product" : "Edit Product"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "create"
              ? "Add a new credit package"
              : "Update product configuration"}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Configure the product information and pricing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Basic Package"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                placeholder="e.g., basic"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                URL-friendly identifier (lowercase, no spaces)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="polarProductId">Polar Product ID *</Label>
              <Input
                id="polarProductId"
                placeholder="e.g., 94bc2529-7b95-4a04-a1a5-42ba88de67bc"
                value={formData.polarProductId}
                onChange={(e) =>
                  setFormData({ ...formData, polarProductId: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                UUID from Polar dashboard
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="credits">Credits *</Label>
              <Input
                id="credits"
                type="number"
                min="1"
                placeholder="e.g., 30"
                value={formData.credits}
                onChange={(e) =>
                  setFormData({ ...formData, credits: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceUsd">Price (USD) *</Label>
              <Input
                id="priceUsd"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="e.g., 9.00"
                value={formData.priceUsd}
                onChange={(e) =>
                  setFormData({ ...formData, priceUsd: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                Price in dollars (e.g., 9.00 for $9)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayOrder">Display Order *</Label>
              <Input
                id="displayOrder"
                type="number"
                min="0"
                placeholder="e.g., 0"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData({ ...formData, displayOrder: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                Lower numbers appear first
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked: boolean) =>
                setFormData({ ...formData, isActive: checked })
              }
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Active (visible to customers)
            </Label>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                  ? "Create Product"
                  : "Update Product"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
