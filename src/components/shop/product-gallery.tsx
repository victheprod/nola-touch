"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Surface } from "@/data/catalog";
import { productImages, productGalleryViews } from "@/data/images";
import { ProductSurface } from "@/components/shop/product-surface";
import { Badge } from "@/components/ui/badge";
import { crossfade } from "@/lib/motion";

export function ProductGallery({
  surface,
  badge,
  slug,
}: {
  surface: Surface;
  badge?: string;
  slug?: string;
}) {
  const [active, setActive] = useState(0);
  const primary = slug ? productImages[slug] : undefined;
  const views = slug ? productGalleryViews(slug, primary) : [];
  const hasPhotos = views.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden bg-[#111]">
        <AnimatePresence mode="wait">
          {hasPhotos ? (
            <motion.div
              key={active}
              variants={crossfade}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative aspect-[4/5] w-full"
            >
              <Image
                src={views[active].src}
                alt={views[active].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={active === 0}
              />
            </motion.div>
          ) : (
            <ProductSurface
              surface={surface}
              className="aspect-[4/5] w-full"
              markClassName="h-16 w-16"
            />
          )}
        </AnimatePresence>
        {badge && (
          <Badge variant="gold" className="absolute left-4 top-4 z-10">
            {badge}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {(hasPhotos ? views : [0, 1, 2, 3]).map((v, i) => (
          <button
            key={hasPhotos ? `${views[i]?.src}-${i}` : i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View ${i + 1}`}
            className={cn(
              "relative overflow-hidden border transition-all duration-300",
              active === i
                ? "border-onyx ring-1 ring-gold/40"
                : "border-transparent opacity-80 hover:border-border hover:opacity-100",
            )}
          >
            {hasPhotos && views[i] ? (
              <div className="relative aspect-square w-full">
                <Image
                  src={views[i].src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ) : (
              <ProductSurface
                surface={surface}
                className="aspect-square w-full"
                markClassName="h-6 w-6"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
