import { cn } from "@/lib/utils";

type RibbonProps = {
  className?: string;
  tone?: "gold" | "onyx" | "ivory";
  animated?: boolean;
};

/**
 * Ribbon — a refined single-flow line motif inspired by moving hair and silk.
 * Deliberately quiet: thin strokes, low opacity, used as a background accent.
 */
export function Ribbon({ className, tone = "gold", animated = true }: RibbonProps) {
  const stroke =
    tone === "onyx"
      ? "rgba(11,11,12,0.10)"
      : tone === "ivory"
        ? "rgba(250,247,241,0.22)"
        : "rgba(252,215,107,0.30)";

  const strokeFaint =
    tone === "onyx"
      ? "rgba(11,11,12,0.06)"
      : tone === "ivory"
        ? "rgba(250,247,241,0.12)"
        : "rgba(252,215,107,0.16)";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        animated && "animate-ribbon",
        className,
      )}
    >
      <path
        d="M-60 380 C 220 220, 420 460, 640 300 C 860 140, 1020 360, 1280 220"
        stroke={stroke}
        strokeWidth="1.25"
        fill="none"
      />
      <path
        d="M-60 430 C 240 280, 460 500, 680 340 C 900 180, 1060 400, 1280 270"
        stroke={strokeFaint}
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M-60 330 C 200 200, 380 420, 600 260 C 820 100, 1000 320, 1280 180"
        stroke={strokeFaint}
        strokeWidth="0.75"
        fill="none"
      />
    </svg>
  );
}

/** A hairline divider with a subtle flowing curve. */
export function RibbonRule({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 8"
      preserveAspectRatio="none"
      className={cn("h-2 w-full", className)}
    >
      <path
        d="M0 4 C 300 1, 480 7, 720 4 C 900 1.5, 1020 6, 1200 4"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
