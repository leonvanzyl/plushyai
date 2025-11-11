"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlushifyIcon } from "@/components/plushify-logo";
import { Sparkles, Zap, Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <PlushifyIcon size="lg" />
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Plushify
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Transform Photos into Adorable Plushies
          </h2>
          <p className="text-xl text-muted-foreground">
            Turn any photo into an adorable AI-generated plushie design. Fast,
            easy, and fun! Perfect for gifts, decorations, and memories.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/generate">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 border rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">AI-Powered Magic</h3>
            <p className="text-sm text-muted-foreground">
              Advanced AI technology transforms any photo into an adorable
              plushie design
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Get your plushie design in seconds, not hours. Instant results!
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Endless Fun</h3>
            <p className="text-sm text-muted-foreground">
              Create plushies of family, friends, pets, or anything else you
              love
            </p>
          </div>
        </div>

        <div className="space-y-6 mt-12">
          <h3 className="text-2xl font-semibold">Ready to Get Started?</h3>
          <p className="text-muted-foreground">
            Join thousands of users creating adorable plushie designs with
            Plushify
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
