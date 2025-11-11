"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CreditBadge } from "@/components/credits/credit-badge";
import { mockUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navigation: Array<{ name: string; href: string }>;
}

export function MobileMenu({ open, onClose, navigation }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Slide-out Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[300px] bg-background border-l shadow-lg transition-transform duration-300 md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Profile Section */}
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{mockUser.name}</p>
                <p className="text-xs text-muted-foreground">
                  {mockUser.email}
                </p>
              </div>
            </div>

            <Link href="/pricing" onClick={onClose}>
              <CreditBadge creditCount={mockUser.credits} className="w-fit" />
            </Link>
          </div>

          <Separator />

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-accent"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Separator />

          {/* Bottom Actions */}
          <div className="p-4 space-y-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/profile" onClick={onClose}>
                View Profile
              </Link>
            </Button>
            <Button variant="ghost" className="w-full">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
