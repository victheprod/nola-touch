import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * LogoMark — intertwined ribbon "N" icon (sculptural continuity).
 * A fluid, knotted N: left arch, top-right peak, and a central loop the
 * diagonal threads through. Uses currentColor so it adapts to gold/onyx/ivory.
 * Used as favicon, product surfaces, and optional lockup accent.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <path
        d="M 12 50 C 10 37, 11 19, 22 14 C 30 10, 35 15, 35 24 C 36 34, 45 44, 50 50 C 53 53, 57 47, 52 44"
        stroke="currentColor"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 31 30 C 32 20, 39 12, 46 14 C 53 16, 50 31, 45 38 C 41 45, 30 48, 28 40 C 26 33, 34 32, 33 29"
        stroke="currentColor"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  showTagline?: boolean;
  showMark?: boolean;
  variant?: "onyx" | "ivory";
  href?: string | null;
};

/**
 * Logo — Figma / brand-sheet lockup:
 * large serif NOLA, small tracked TOUCH beneath.
 */
export function Logo({
  className,
  showTagline = true,
  showMark = false,
  variant = "onyx",
  href = "/",
}: LogoProps) {
  const color = variant === "ivory" ? "text-ivory" : "text-onyx";

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", color, className)}>
      {showMark && <LogoMark className="h-7 w-7 shrink-0" />}
      <span className="flex flex-col leading-none">
        <span className="wordmark text-[1.35rem] tracking-[0.08em] sm:text-[1.5rem]">
          NOLA
        </span>
        {showTagline && (
          <span className="mt-1 text-[0.48rem] font-medium uppercase tracking-[0.55em] text-current/75">
            Touch
          </span>
        )}
      </span>
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} aria-label="Nola Touch — home" className="inline-flex">
      {content}
    </Link>
  );
}
