import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Collection, Surface } from "@/data/catalog";
import { collectionImages } from "@/data/images";
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
  variant = "photo",
}: {
  collection: Collection;
  className?: string;
  variant?: "photo" | "surface";
}) {
  const image = collectionImages[collection.slug];

  if (variant === "photo" && image) {
    return (
      <Link
        href={`/shop/${collection.slug}`}
        className={cn(
          "group relative block overflow-hidden bg-[#111]",
          className,
        )}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover opacity-[0.85] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
          <div className="card-overlay absolute inset-0" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="glass-panel translate-y-1 p-4 transition-transform duration-500 group-hover:translate-y-0 sm:p-5">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.12em] text-gold">
              {collection.productCount}+ products
            </p>
            <h3 className="mt-1 font-display text-lg leading-tight text-ivory sm:text-xl">
              {collection.name}
            </h3>
            <p className="mt-1 line-clamp-1 text-xs text-stone">{collection.tagline}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-ivory/80 transition-colors group-hover:text-gold">
              Shop
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

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
      <Ribbon tone={light ? "onyx" : "gold"} animated={false} className="opacity-40" />
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
            "mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] transition-all group-hover:gap-2",
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
