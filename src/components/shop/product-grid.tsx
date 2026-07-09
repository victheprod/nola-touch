"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/catalog";
import { ProductCard } from "@/components/shop/product-card";
import { gridItem } from "@/lib/motion";

export function ProductGrid({
  products,
  className,
  tone = "light",
}: {
  products: Product[];
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <motion.div
      layout
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      <AnimatePresence mode="popLayout">
        {products.map((p) => (
          <motion.div
            key={p.slug}
            layout
            variants={gridItem}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ProductCard product={p} tone={tone} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
