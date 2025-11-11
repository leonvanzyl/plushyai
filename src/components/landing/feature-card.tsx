"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  // Dynamically get the icon component from Lucide
  const IconComponent =
    LucideIcons[icon as keyof typeof LucideIcons] || LucideIcons.Sparkles;

  return (
    <Card
      className={cn(
        "p-6 transition-all hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      <div className="space-y-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          {/* @ts-expect-error - Dynamic icon component */}
          <IconComponent className="h-6 w-6 text-primary" />
        </div>

        <h3 className="text-xl font-bold">{title}</h3>

        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
