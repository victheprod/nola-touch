import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand/brand-mark";

/** Icon mark — client ribbon N from transparent brand artwork. */
export function LogoMark({
  className,
  variant = "gold",
}: {
  className?: string;
  variant?: "gold" | "ivory" | "onyx";
}) {
  return (
    <BrandMark
      asset="icon"
      variant={variant}
      className={cn("h-8 w-8", className)}
      label=""
    />
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
      {showMark && <LogoMark className="h-7 w-7" variant={variant} />}
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
