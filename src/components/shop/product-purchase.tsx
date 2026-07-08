"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/catalog";
import { useCart } from "@/lib/cart/cart-context";
import { Button } from "@/components/ui/button";

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [option, setOption] = useState(product.options?.values[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      surface: product.surface,
      option,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-6">
      {product.options && (
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <span className="text-sm font-medium uppercase tracking-[0.1em] text-onyx">
              {product.options.label}
            </span>
            <span className="text-sm text-muted">{option}</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.options.values.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setOption(value)}
                className={cn(
                  "min-w-12 border px-4 py-2.5 text-sm transition-colors cursor-pointer",
                  option === value
                    ? "border-onyx bg-onyx text-ivory"
                    : "border-border text-charcoal hover:border-onyx",
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-stretch gap-3">
        <div className="flex items-center border border-border">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-full w-11 items-center justify-center text-muted transition-colors hover:text-onyx cursor-pointer"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-medium">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-full w-11 items-center justify-center text-muted transition-colors hover:text-onyx cursor-pointer"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          variant="gold"
          size="lg"
          onClick={handleAdd}
          className="flex-1"
        >
          {added ? (
            <>
              <Check className="h-4 w-4" strokeWidth={2} /> Added to bag
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" strokeWidth={1.75} /> Add to bag
            </>
          )}
        </Button>
      </div>

      <Button variant="outline" size="lg">
        Buy it now
      </Button>
    </div>
  );
}
