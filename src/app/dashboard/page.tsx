"use client";

import { mockUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Generate Plushie</h2>
          <p className="text-muted-foreground mb-4">
            Transform your photos into adorable plushies
          </p>
          <Button asChild>
            <Link href="/generate">Generate Now</Link>
          </Button>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-muted-foreground mb-4">
            Manage your account settings and preferences
          </p>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {mockUser.name}
            </p>
            <p>
              <strong>Email:</strong> {mockUser.email}
            </p>
            <p>
              <strong>Credits:</strong> {mockUser.credits}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
