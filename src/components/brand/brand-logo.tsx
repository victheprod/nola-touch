import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/logo";
import { PrimaryLogo } from "@/components/brand/primary-logo";
import { StackedLogo } from "@/components/brand/stacked-logo";

type BrandLogoProps = {
  className?: string;
  href?: string | null;
};

/** Icon mark — dark header, ivory on onyx. */
export function BrandIcon({ className, href = "/" }: BrandLogoProps) {
  const mark = (
    <LogoMark className={cn("h-9 w-9 text-ivory sm:h-10 sm:w-10", className)} />
  );
  if (href === null) return mark;
  return (
    <Link href={href} aria-label="Nola Touch — home" className="inline-flex shrink-0">
      {mark}
    </Link>
  );
}

/** Horizontal lockup — light surfaces (mobile menu, etc.). */
export function BrandPrimary({ className, href = "/" }: BrandLogoProps) {
  return <PrimaryLogo variant="onyx" href={href} className={className} />;
}

/** Stacked lockup — dark footer, gold wordmark. */
export function BrandStacked({ className, href = "/" }: BrandLogoProps) {
  const stacked = <StackedLogo variant="gold" size="md" className={className} />;
  if (href === null) return stacked;
  return (
    <Link href={href} aria-label="Nola Touch — home" className="inline-flex">
      {stacked}
    </Link>
  );
}
