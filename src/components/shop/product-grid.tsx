import { cn } from "@/lib/utils";
import type { Product } from "@/data/catalog";
import { ProductCard } from "@/components/shop/product-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <RevealGroup
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((p) => (
        <RevealItem key={p.slug}>
          <ProductCard product={p} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
