import Image from "next/image";
import { cn } from "@/lib/utils";

const ASSETS = {
  icon: {
    gold: "/images/brand/icon-gold.png",
    ivory: "/images/brand/icon-ivory.png",
    onyx: "/images/brand/icon-onyx.png",
  },
  primary: {
    gold: "/images/brand/primary-gold.png",
    ivory: "/images/brand/primary-ivory.png",
    onyx: "/images/brand/primary-onyx.png",
  },
  stacked: {
    gold: "/images/brand/stacked-gold.png",
    ivory: "/images/brand/stacked-ivory.png",
    onyx: "/images/brand/stacked-onyx.png",
  },
} as const;

type BrandMarkProps = {
  className?: string;
  variant?: "gold" | "ivory" | "onyx";
  asset?: keyof typeof ASSETS;
  label?: string;
  priority?: boolean;
};

/**
 * Client brand artwork — true RGBA PNGs from designer files.
 * No CSS masks; transparent backgrounds render correctly everywhere.
 */
export function BrandMark({
  className,
  variant = "gold",
  asset = "icon",
  label = "Nola Touch",
  priority = false,
}: BrandMarkProps) {
  const src = ASSETS[asset][variant];

  return (
    <Image
      src={src}
      alt={label}
      width={asset === "icon" ? 528 : asset === "stacked" ? 666 : 1152}
      height={asset === "icon" ? 424 : asset === "stacked" ? 430 : 450}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
