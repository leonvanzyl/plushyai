"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  trend,
  className,
}: StatCardProps) {
  // Dynamically get the icon component from Lucide
  const IconComponent =
    LucideIcons[icon as keyof typeof LucideIcons] || LucideIcons.BarChart;

  const TrendIcon =
    trend === "up"
      ? TrendingUp
      : trend === "down"
        ? TrendingDown
        : trend === "neutral"
          ? Minus
          : null;

  return (
    <Card className={cn("p-6 transition-all hover:shadow-lg", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          {/* @ts-expect-error - Dynamic icon component */}
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
      </div>

      {TrendIcon && (
        <div className="mt-4 flex items-center gap-1">
          <TrendIcon
            className={cn(
              "h-4 w-4",
              trend === "up" && "text-green-500",
              trend === "down" && "text-red-500",
              trend === "neutral" && "text-muted-foreground"
            )}
          />
          <span className="text-xs text-muted-foreground">
            {trend === "up" && "Increasing"}
            {trend === "down" && "Decreasing"}
            {trend === "neutral" && "Stable"}
          </span>
        </div>
      )}
    </Card>
  );
}
