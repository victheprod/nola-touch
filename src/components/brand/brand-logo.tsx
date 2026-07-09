import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ASSETS = {
  icon: "/images/brand/icon.png",
  primary: "/images/brand/primary-logo.png",
  stacked: "/images/brand/stacked-logo.png",
} as const;

type BrandLogoProps = {
  className?: string;
  href?: string | null;
};

/** Icon-only mark — for header navigation on dark backgrounds. */
export function BrandIcon({ className, href = "/" }: BrandLogoProps) {
  const img = (
    <Image
      src={ASSETS.icon}
      alt="Nola Touch"
      width={120}
      height={120}
      className={cn("h-9 w-9 object-contain brightness-0 invert sm:h-10 sm:w-10", className)}
      priority
    />
  );

  if (href === null) return img;
  return (
    <Link href={href} aria-label="Nola Touch — home" className="inline-flex shrink-0">
      {img}
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
