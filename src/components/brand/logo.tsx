import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * LogoMark — client icon as transparent SVG.
 * Ribbon-like N with central oval loop. Uses currentColor for ivory/gold/onyx.
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
        d="M11 49 C9 36, 10 17, 22 12 C31 8, 36 14, 36 24 C37 34, 44 43, 51 49"
        stroke="currentColor"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="32"
        cy="31"
        rx="7.5"
        ry="10.5"
        transform="rotate(-22 32 31)"
        stroke="currentColor"
        strokeWidth="4.8"
      />
      <path
        d="M30 29 C31 19, 38 11, 46 13 C53 15, 51 30, 46 37 C42 44, 31 47, 29 39 C27 32, 35 31, 34 28"
        stroke="currentColor"
        strokeWidth="5.2"
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
  variant?: "onyx" | "ivory" | "gold";
  href?: string | null;
};

const variantColor = {
  onyx: "text-onyx",
  ivory: "text-ivory",
  gold: "text-gold",
};

/** Legacy text lockup — prefer PrimaryLogo / StackedLogo for brand moments. */
export function Logo({
  className,
  showTagline = true,
  showMark = false,
  variant = "onyx",
  href = "/",
}: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", variantColor[variant], className)}>
      {showMark && <LogoMark className="h-7 w-7 shrink-0" />}
      <span className="flex flex-col leading-none">
        <span className="wordmark text-[1.35rem] tracking-[0.08em] sm:text-[1.5rem]">NOLA</span>
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
