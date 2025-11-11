"use client";

import { Download, Eye } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatGenerationDate } from "@/lib/mock-data";

interface PlushieCardProps {
  image: string;
  date: string;
  onView?: () => void;
  onDownload?: () => void;
}

export function PlushieCard({
  image,
  date,
  onView,
  onDownload,
}: PlushieCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt="Plushie"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={onView}
            className="rounded-full"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={onDownload}
            className="rounded-full"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          {formatGenerationDate(date)}
        </p>
      </div>
    </Card>
  );
}
