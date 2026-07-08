import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Collection, Surface } from "@/data/catalog";
import { Ribbon } from "@/components/brand/ribbon";

const surfaceClass: Record<Surface, string> = {
  onyx: "surface-onyx",
  champagne: "surface-champagne",
  gold: "surface-gold",
  stone: "surface-stone",
};

export function CollectionCard({
  collection,
  className,
}: {
  collection: Collection;
  className?: string;
}) {
  const light = collection.surface !== "onyx";
  const text = light ? "text-onyx" : "text-ivory";
  const sub = light ? "text-charcoal/70" : "text-stone";

  return (
    <Link
      href={`/shop/${collection.slug}`}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden",
        surfaceClass[collection.surface],
        className,
      )}
    >
      <Ribbon
        tone={light ? "onyx" : "gold"}
        animated={false}
        className="opacity-70 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
      />
      {!light && (
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-onyx/10 to-transparent" />
      )}

      <div className="relative z-10 p-6 sm:p-7">
        <p className={cn("eyebrow", light ? "text-gold-deep" : "text-gold")}>
          {collection.productCount} products
        </p>
        <h3 className={cn("mt-2 font-display text-2xl sm:text-3xl", text)}>
          {collection.name}
        </h3>
        <p className={cn("mt-1.5 max-w-xs text-sm leading-relaxed", sub)}>
          {collection.tagline}
        </p>
        <span
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300 group-hover:gap-2.5",
            light ? "text-onyx" : "text-gold",
          )}
        >
          Shop now
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
