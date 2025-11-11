"use client";

import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface CreditDisplayProps {
  creditCount: number;
  showPurchaseButton?: boolean;
}

export function CreditDisplay({ creditCount, showPurchaseButton = false }: CreditDisplayProps) {
  const percentage = Math.min((creditCount / 200) * 100, 100);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Available Credits</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-bold tracking-tight">{creditCount}</h2>
            <Coins className="h-6 w-6 text-primary" />
          </div>
        </div>
        {showPurchaseButton && (
          <Button asChild>
            <Link href="/pricing">Purchase More</Link>
          </Button>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {creditCount > 0 ? "You're all set!" : "Purchase credits to get started"}
        </p>
      </div>
    </Card>
  );
}
