"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CreditDisplay } from "@/components/credits/credit-display";
import { GenerationPreview } from "@/components/plushie/generation-preview";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  mockUser,
  getRecentGenerations,
} from "@/lib/mock-data";
import {
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
  Clock,
  TrendingUp,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  const recentGenerations = getRecentGenerations(4);
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        {/* User Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 bg-primary/10 border-2 border-primary/20">
              <div className="flex items-center justify-center h-full w-full text-primary font-bold text-2xl">
                {mockUser.name[0]}
              </div>
            </Avatar>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome back, {mockUser.name.split(" ")[0]}!
              </h1>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {currentDate}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Credits Balance Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <CreditDisplay
                creditCount={mockUser.credits}
                showPurchaseButton={true}
              />
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Generations
                  </p>
                  <p className="text-2xl font-bold">{mockUser.totalGenerations}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ImageIcon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-lg font-bold">
                    {new Date(mockUser.memberSince).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="group p-8 hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
            <Link href="/generate" className="block">
              <div className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    Generate New Plushie
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground">
                    Upload a photo and transform it into an adorable plushie
                    design with our AI
                  </p>
                </div>
                <Badge variant="outline" className="mt-4">
                  1 Credit per generation
                </Badge>
              </div>
            </Link>
          </Card>

          <Card className="group p-8 hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
            <Link href="/gallery" className="block">
              <div className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <ImageIcon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    View Gallery
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground">
                    Browse all your created plushie designs and download your
                    favorites
                  </p>
                </div>
                <Badge variant="outline" className="mt-4">
                  {mockUser.totalGenerations} total plushies
                </Badge>
              </div>
            </Link>
          </Card>
        </div>

        {/* Recent Generations Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Recent Creations</h2>
              <p className="text-muted-foreground">
                Your latest plushie designs
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/gallery">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <GenerationPreview generations={recentGenerations} />
        </div>

        {/* Usage Statistics Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Your Statistics</h2>
            <p className="text-muted-foreground">
              Track your Plushify usage and activity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Total Generations"
              value={mockUser.totalGenerations}
              icon="Image"
              trend="up"
            />
            <StatCard
              label="Credits Used This Month"
              value={23}
              icon="TrendingUp"
            />
            <StatCard
              label="Member Since"
              value={new Date(mockUser.memberSince).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
              icon="Calendar"
            />
          </div>

          {/* Additional Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Credit Usage Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total Purchased
                  </span>
                  <span className="font-bold">{mockUser.totalCreditsPurchased}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total Used
                  </span>
                  <span className="font-bold">{mockUser.totalCreditsUsed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Remaining
                  </span>
                  <span className="font-bold text-primary">{mockUser.credits}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{
                        width: `${(mockUser.credits / mockUser.totalCreditsPurchased) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {((mockUser.credits / mockUser.totalCreditsPurchased) * 100).toFixed(1)}% remaining
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/generate">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate New Plushie
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/pricing">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Buy More Credits
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/profile">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/docs">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Documentation
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
