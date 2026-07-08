"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Surface } from "@/data/catalog";
import { ProductSurface } from "@/components/shop/product-surface";
import { Badge } from "@/components/ui/badge";

export function ProductGallery({
  surface,
  badge,
}: {
  surface: Surface;
  badge?: string;
}) {
  const [active, setActive] = useState(0);
  const views = [0, 1, 2, 3];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <ProductSurface
          surface={surface}
          className="aspect-[4/5] w-full"
          markClassName="h-16 w-16"
        />
        {badge && (
          <Badge variant="gold" className="absolute left-4 top-4">
            {badge}
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {views.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setActive(v)}
            aria-label={`View ${v + 1}`}
            className={cn(
              "overflow-hidden border transition-colors",
              active === v ? "border-onyx" : "border-transparent hover:border-border",
            )}
          >
            <ProductSurface
              surface={surface}
              className="aspect-square w-full"
              markClassName="h-6 w-6"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
