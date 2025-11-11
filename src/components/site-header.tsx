import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";
import { PlushifyLogo } from "./plushify-logo";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity"
        >
          <PlushifyLogo size="md" showText={true} />
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
