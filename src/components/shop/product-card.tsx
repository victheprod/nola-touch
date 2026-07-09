"use client";

import Link from "next/link";
import Image from "next/image";
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
    <article className={cn("product-card group flex flex-col", className)}>
      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-[#111]"
      >
        {image ? (
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 72vw, 25vw"
            />
          </div>
        ) : (
          <ProductSurface
            surface={product.surface}
            className="aspect-[3/4] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}

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

        <button
          type="button"
          onClick={quickAdd}
          aria-label={`Add ${product.name} to cart`}
          className="product-cta absolute bottom-0 left-0 right-0 z-10 bg-gold py-3.5 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-onyx transition-colors hover:bg-ivory cursor-pointer"
        >
          Add to bag
        </button>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <p className={cn("eyebrow", dark ? "text-muted-soft" : "text-muted-soft")}>
          {product.collectionName}
        </p>
        <h3 className="mt-2">
          <Link
            href={`/products/${product.slug}`}
            className={cn(
              "font-display text-[1.05rem] leading-snug tracking-tight transition-colors sm:text-[1.1rem]",
              dark
                ? "text-ivory hover:text-gold"
                : "text-onyx hover:text-gold-deep",
            )}
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={product.rating} size={13} />
          <span className={cn("text-xs", dark ? "text-stone" : "text-muted")}>
            ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span
            className={cn(
              "font-display text-[1.05rem] italic",
              dark ? "text-gold" : "text-onyx",
            )}
          >
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
