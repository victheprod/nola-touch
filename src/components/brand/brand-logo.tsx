import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand/brand-mark";

type BrandLogoProps = {
  className?: string;
  href?: string | null;
};

/** Icon mark — gold ribbon N on dark header. */
export function BrandIcon({ className, href = "/" }: BrandLogoProps) {
  const mark = (
    <BrandMark
      asset="icon"
      variant="gold"
      className={cn(
        "h-9 w-9 transition-[filter] duration-300 hover:drop-shadow-[0_0_14px_rgba(252,215,107,0.5)] sm:h-10 sm:w-10",
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

/** Horizontal lockup from client artwork. */
export function BrandPrimary({
  className,
  href = "/",
  variant = "onyx",
}: BrandLogoProps & { variant?: "onyx" | "ivory" | "gold" }) {
  const logo = (
    <BrandMark
      asset="primary"
      variant={variant}
      className={cn("h-7 w-[8.75rem] sm:h-8 sm:w-[10rem]", className)}
    />
  );

  if (href === null) return logo;
  return (
    <Link href={href} aria-label="Nola Touch — home" className="inline-flex">
      {logo}
    </Link>
  );
}

/** Stacked lockup from client artwork — footer, brand moments. */
export function BrandStacked({
  className,
  href = "/",
  variant = "gold",
  size = "md",
}: BrandLogoProps & {
  variant?: "onyx" | "ivory" | "gold";
  size?: "sm" | "md" | "lg";
}) {
  const scale =
    size === "sm"
      ? "h-12 w-[7.25rem]"
      : size === "lg"
        ? "h-[4.75rem] w-[7.35rem]"
        : "h-14 w-[8.5rem]";

  const logo = (
    <BrandMark
      asset="stacked"
      variant={variant}
      className={cn(scale, className)}
    />
  );

  if (href === null) return logo;
  return (
    <Link href={href} aria-label="Nola Touch — home" className="inline-flex">
      {logo}
    </Link>
  );
}
