"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, ShoppingBag } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/data/catalog";
import { productImages } from "@/data/images";
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

function salePercent(price: number, compareAt: number) {
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function ProductCard({
  product,
  className,
  tone = "light",
}: {
  product: Product;
  className?: string;
  tone?: "light" | "dark";
}) {
  const { addItem } = useCart();
  const dark = tone === "dark";
  const image = productImages[product.slug];
  const onSale = product.compareAt && product.compareAt > product.price;

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      surface: product.surface,
      option: product.options?.values[0],
    });
  }

  return (
    <article className={cn("product-card group flex flex-col", className)}>
      <div className="relative overflow-hidden bg-[#111]">
        <Link href={`/products/${product.slug}`} className="relative block">
          {image ? (
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ) : (
            <ProductSurface
              surface={product.surface}
              className="aspect-[3/4] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          )}
        </Link>

        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1.5 sm:left-3 sm:top-3">
          {product.badge && (
            <Badge variant={badgeVariant[product.badge]}>{product.badge}</Badge>
          )}
          {onSale && (
            <Badge variant="sale">
              {product.badge ? "Sale" : `-${salePercent(product.price, product.compareAt!)}%`}
            </Badge>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 flex translate-y-0 gap-px sm:translate-y-full sm:transition-transform sm:duration-300 sm:ease-out sm:group-hover:translate-y-0 sm:group-focus-within:translate-y-0">
          <Link
            href={`/products/${product.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 bg-ivory/95 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-onyx backdrop-blur-sm transition-colors hover:bg-ivory sm:text-[0.625rem]"
          >
            <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
            Quick view
          </Link>
          <button
            type="button"
            onClick={quickAdd}
            className="flex flex-1 items-center justify-center gap-1.5 bg-gold py-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-onyx transition-colors hover:bg-gold-soft sm:text-[0.625rem] cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
            Add to bag
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-3 sm:pt-4">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.14em] text-muted-soft">
          {product.collectionName}
        </p>
        <h3 className="mt-1.5 line-clamp-2">
          <Link
            href={`/products/${product.slug}`}
            className={cn(
              "font-display text-[1rem] leading-snug tracking-tight transition-colors sm:text-[1.05rem]",
              dark ? "text-ivory hover:text-gold" : "text-onyx hover:text-gold-deep",
            )}
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-2 flex items-center gap-1.5">
          <StarRating rating={product.rating} size={12} />
          <span className={cn("text-xs", dark ? "text-stone" : "text-muted")}>
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-2.5 sm:pt-3">
          <span
            className={cn(
              "text-[0.95rem] font-semibold sm:text-base",
              dark ? "text-gold" : "text-onyx",
            )}
          >
            {formatPrice(product.price)}
          </span>
          {onSale && (
            <span className="text-sm text-muted-soft line-through">
              {formatPrice(product.compareAt!)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
