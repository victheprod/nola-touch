import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * LogoMark — ribbon "N" with central oval, traced from the client icon.
 * Stroke-based with round caps so it reads at favicon and header sizes.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <ellipse
        cx="40"
        cy="40"
        rx="8.5"
        ry="12.5"
        transform="rotate(-32 40 40)"
        stroke="currentColor"
        strokeWidth="4.8"
      />
      <path
        d="M15 58.5C13 44.5 14 24.5 25.5 17.5C32 13.5 37 18.5 37.5 28.5C38 38.5 32.5 46.5 27 50.5C22.5 54 18 51 17 46.5C16 42 18 36.5 21 32C24 27.5 28.5 24 33.5 22.5C38 21 42.5 22.5 45.5 26.5C48.5 30.5 49 36.5 46.5 41.5C44 46.5 39 50.5 34 52.5C29 54.5 24 55 20 57.5"
        stroke="currentColor"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 31.5C34 22 40.5 14.5 47.5 16.5C54 18.5 51.5 32.5 46.5 39C42 45 31.5 48 29 40.5C27 34.5 34.5 33 33.5 30"
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

export function Logo({
  className,
  showTagline = true,
  showMark = false,
  variant = "onyx",
  href = "/",
}: LogoProps) {
  const color =
    variant === "ivory"
      ? "text-ivory"
      : variant === "gold"
        ? "text-gold"
        : "text-onyx";

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
