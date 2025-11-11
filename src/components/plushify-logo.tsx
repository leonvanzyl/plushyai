import { cn } from "@/lib/utils";

interface PlushifyLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export function PlushifyLogo({
  className,
  size = "md",
  showText = true,
}: PlushifyLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Plushify Icon - Cute teddy bear/plushie shape */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sizeClasses[size])}
      >
        {/* Left ear */}
        <circle cx="30" cy="25" r="15" className="fill-primary" />
        {/* Right ear */}
        <circle cx="70" cy="25" r="15" className="fill-primary" />
        {/* Head */}
        <circle cx="50" cy="45" r="25" className="fill-primary" />
        {/* Body */}
        <ellipse cx="50" cy="75" rx="20" ry="18" className="fill-primary" />
        {/* Left arm */}
        <ellipse
          cx="30"
          cy="70"
          rx="8"
          ry="15"
          className="fill-primary"
          transform="rotate(-20 30 70)"
        />
        {/* Right arm */}
        <ellipse
          cx="70"
          cy="70"
          rx="8"
          ry="15"
          className="fill-primary"
          transform="rotate(20 70 70)"
        />
        {/* Left eye */}
        <circle cx="42" cy="42" r="3" className="fill-primary-foreground" />
        {/* Right eye */}
        <circle cx="58" cy="42" r="3" className="fill-primary-foreground" />
        {/* Nose/snout */}
        <ellipse
          cx="50"
          cy="52"
          rx="5"
          ry="4"
          className="fill-primary-foreground/80"
        />
        {/* Smile */}
        <path
          d="M 45 55 Q 50 58 55 55"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="stroke-primary-foreground/60"
        />
        {/* Heart on chest (for extra cuteness) */}
        <path
          d="M 50 72 L 54 68 Q 56 66 56 69 Q 56 71 54 73 L 50 77 L 46 73 Q 44 71 44 69 Q 44 66 46 68 Z"
          className="fill-primary-foreground/40"
        />
      </svg>

      {/* Plushify text logo */}
      {showText && (
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Plushify
        </span>
      )}
    </div>
  );
}

// Simplified icon-only version
export function PlushifyIcon({
  className,
  size = "md",
}: Omit<PlushifyLogoProps, "showText">) {
  return <PlushifyLogo className={className} size={size} showText={false} />;
}
