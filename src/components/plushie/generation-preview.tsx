"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatGenerationDate, type PlushieGeneration } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

interface GenerationPreviewProps {
  generations: PlushieGeneration[];
}

export function GenerationPreview({ generations }: GenerationPreviewProps) {
  if (generations.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No generations yet</p>
        <Button asChild className="mt-4">
          <Link href="/generate">Create Your First Plushie</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {generations.slice(0, 4).map((generation) => (
          <Card
            key={generation.id}
            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
          >
            <Link href="/gallery">
              <div className="relative aspect-square">
                <Image
                  src={generation.plushieImage}
                  alt="Plushie generation"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground">
                  {formatGenerationDate(generation.createdAt)}
                </p>
                <p className="text-xs text-muted-foreground capitalize mt-1">
                  {generation.subjectType}
                </p>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/gallery">
            View All Generations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
