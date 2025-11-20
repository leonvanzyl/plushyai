"use client";

import { Check, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface PricingCardProps {
  name: string;
  price: number;
  credits: number;
  features: string[];
  isPopular?: boolean;
  className?: string;
  productId: string; // Polar product ID
}

export function PricingCard({
  name,
  price,
  credits,
  features,
  isPopular = false,
  className,
  productId,
}: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      await authClient.checkout({ products: productId });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={cn(
        "relative p-6 transition-all hover:shadow-lg",
        isPopular && "border-primary border-2 shadow-md",
        className
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-primary to-purple-500 px-4 py-1">
            <Sparkles className="mr-1 h-3 w-3" />
            Most Popular
          </Badge>
        </div>
      )}

      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold">{name}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-bold">${price}</span>
            <span className="text-muted-foreground">one-time</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {credits} credits
          </p>
        </div>

        {/* CTA Button */}
        <Button
          className="w-full"
          variant={isPopular ? "default" : "outline"}
          size="lg"
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Get Started"}
        </Button>

        {/* Features List */}
        <div className="space-y-3 pt-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
