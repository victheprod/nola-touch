import { cn } from "@/lib/utils";

const ASSETS = {
  icon: "/images/brand/icon-mark.png",
  primary: "/images/brand/primary-logo.png",
  stacked: "/images/brand/stacked-logo.png",
} as const;

const COLOR: Record<"gold" | "ivory" | "onyx", string> = {
  gold: "bg-gold",
  ivory: "bg-ivory",
  onyx: "bg-onyx",
};

type BrandMarkProps = {
  className?: string;
  variant?: "gold" | "ivory" | "onyx";
  asset?: keyof typeof ASSETS;
  label?: string;
};

/**
 * Renders client brand artwork (transparent PNG) via CSS mask so
 * the mark inherits gold / ivory / onyx without a paper background.
 */
export function BrandMark({
  className,
  variant = "gold",
  asset = "icon",
  label = "Nola Touch",
}: BrandMarkProps) {
  const src = ASSETS[asset];

  return (
    <span
      role="img"
      aria-label={label}
      className={cn("inline-block shrink-0", COLOR[variant], className)}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
