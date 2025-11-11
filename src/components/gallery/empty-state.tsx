"use client";

import { ImagePlus, Sparkles } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <Card className="max-w-md p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <ImagePlus className="h-12 w-12 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-purple-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-3">No Plushies Yet</h3>

        <p className="text-muted-foreground mb-6">
          Your gallery is empty. Start creating adorable plushies from your
          photos and they&apos;ll appear here!
        </p>

        <Button asChild size="lg" className="w-full">
          <Link href="/generate">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Your First Plushie
          </Link>
        </Button>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            Not sure where to start?{" "}
            <Link
              href="/docs"
              className="text-primary hover:underline font-medium"
            >
              Check out our tips
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
