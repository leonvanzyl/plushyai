"use client";

import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditBadgeProps {
  creditCount: number;
  className?: string;
}

export function CreditBadge({ creditCount, className }: CreditBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20",
        className
      )}
    >
      <Coins className="h-4 w-4" />
      <span>{creditCount}</span>
    </div>
  );
}
