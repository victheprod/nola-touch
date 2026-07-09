import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/logo";
import { PrimaryLogo } from "@/components/brand/primary-logo";
import { StackedLogo } from "@/components/brand/stacked-logo";

type BrandLogoProps = {
  className?: string;
  href?: string | null;
};

/** Icon mark — gold on dark surfaces, scales cleanly at any size. */
export function BrandIcon({ className, href = "/" }: BrandLogoProps) {
  const mark = (
    <LogoMark
      className={cn(
        "h-9 w-9 text-gold transition-[filter,transform] duration-300 hover:drop-shadow-[0_0_12px_rgba(252,215,107,0.45)] sm:h-10 sm:w-10",
        className,
      )}
    />
  );

  if (href === null) return mark;
  return (
    <Link href={href} aria-label="Nola Touch — home" className="inline-flex shrink-0">
      {mark}
    </Link>
  );
}

/** Horizontal lockup — traced NOLA wordmark + TOUCH. */
export function BrandPrimary({
  className,
  href = "/",
  variant = "onyx",
}: BrandLogoProps & { variant?: "onyx" | "ivory" | "gold" }) {
  return <PrimaryLogo href={href} variant={variant} className={className} />;
}

/** Stacked lockup — footer and brand moments on dark backgrounds. */
export function BrandStacked({
  className,
  href = "/",
  variant = "gold",
  size = "md",
}: BrandLogoProps & {
  variant?: "onyx" | "ivory" | "gold";
  size?: "sm" | "md" | "lg";
}) {
  const logo = <StackedLogo variant={variant} size={size} className={className} />;

  if (href === null) return logo;
  return (
    <Link href={href} aria-label="Nola Touch — home" className="inline-flex">
      {logo}
    </Link>
  );
}
