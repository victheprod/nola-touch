import { cn } from "@/lib/utils";
import type { Surface } from "@/data/catalog";
import { LogoMark } from "@/components/brand/logo";

const surfaceClass: Record<Surface, string> = {
  onyx: "surface-onyx",
  champagne: "surface-champagne",
  gold: "surface-gold",
  stone: "surface-stone",
};

/**
 * ProductSurface — an editorial placeholder standing in for product
 * photography. A tonal gradient with a single flowing silk line and a
 * quiet logo mark, so the catalog looks intentional before real imagery.
 */
export function ProductSurface({
  surface,
  className,
  markClassName,
}: {
  surface: Surface;
  className?: string;
  markClassName?: string;
}) {
  const light = surface === "champagne" || surface === "stone" || surface === "gold";
  const line = light ? "rgba(11,11,12,0.16)" : "rgba(252,215,107,0.32)";

  return (
    <div className={cn("relative overflow-hidden", surfaceClass[surface], className)}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-20 320 C 90 210, 190 400, 300 260 C 380 156, 430 300, 460 220"
          stroke={line}
          strokeWidth="1.25"
          fill="none"
        />
        <path
          d="M-20 370 C 100 260, 210 440, 320 300"
          stroke={line}
          strokeWidth="0.75"
          fill="none"
          opacity="0.6"
        />
      </svg>
      <LogoMark
        variant={light ? "onyx" : "gold"}
        className={cn(
          "absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 opacity-25",
          !light && "opacity-40",
          markClassName,
        )}
      />
    </div>
  );
}
