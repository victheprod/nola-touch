"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/data/catalog";
import { useCart } from "@/lib/cart/cart-context";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { ProductSurface } from "@/components/shop/product-surface";

const badgeVariant = {
  "Best Seller": "gold",
  New: "onyx",
  Limited: "onyx",
  Restocked: "outline",
} as const;

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      surface: product.surface,
      option: product.options?.values[0],
    });
  }

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden"
      >
        <ProductSurface
          surface={product.surface}
          className="aspect-[4/5] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {product.badge && (
          <Badge
            variant={badgeVariant[product.badge]}
            className="absolute left-3 top-3 z-10"
          >
            {product.badge}
          </Badge>
        )}

        {product.compareAt && !product.badge && (
          <Badge variant="sale" className="absolute left-3 top-3 z-10">
            Sale
          </Badge>
        )}

        {/* Quick add */}
        <button
          type="button"
          onClick={quickAdd}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 z-10 flex h-11 w-11 translate-y-2 items-center justify-center bg-ivory text-onyx opacity-0 shadow-lg transition-all duration-300 ease-out hover:bg-gold group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 cursor-pointer"
        >
          <Plus className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <p className="eyebrow text-muted-soft">{product.collectionName}</p>
        <h3 className="mt-2">
          <Link
            href={`/products/${product.slug}`}
            className="font-display text-[1.15rem] leading-snug tracking-tight text-onyx transition-colors group-hover:text-gold-deep"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={product.rating} size={13} />
          <span className="text-xs text-muted">({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="text-[0.95rem] font-semibold text-onyx">
            {formatPrice(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-sm text-muted-soft line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
