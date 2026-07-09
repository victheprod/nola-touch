import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/logo";

const ASSETS = {
  primary: "/images/brand/primary-logo.png",
  stacked: "/images/brand/stacked-logo.png",
} as const;

type BrandLogoProps = {
  className?: string;
  href?: string | null;
};

/** Icon-only mark — SVG on dark nav (client PNG has opaque paper bg). */
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

/** Full horizontal lockup — primary logo for light backgrounds. */
export function BrandPrimary({ className, href = "/" }: BrandLogoProps) {
  const img = (
    <Image
      src={ASSETS.primary}
      alt="Nola Touch"
      width={280}
      height={80}
      className={cn("h-8 w-auto object-contain sm:h-9", className)}
    />
  );

  if (href === null) return img;
  return (
    <Link href={href} aria-label="Nola Touch — home" className="inline-flex">
      {img}
    </Link>
  );
}

/** Stacked sculptural lockup — footer and brand moments. */
export function BrandStacked({ className, href = "/" }: BrandLogoProps) {
  const img = (
    <Image
      src={ASSETS.stacked}
      alt="Nola Touch"
      width={200}
      height={120}
      className={cn("h-16 w-auto object-contain sm:h-[4.5rem]", className)}
    />
  );

  if (href === null) return img;
  return (
    <Link href={href} aria-label="Nola Touch — home" className="inline-flex">
      {img}
    </Link>
  );
}
