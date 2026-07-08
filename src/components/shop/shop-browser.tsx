"use client";

import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Collection, Product } from "@/data/catalog";
import { ProductGrid } from "@/components/shop/product-grid";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

export function ShopBrowser({
  products,
  collections,
}: {
  products: Product[];
  collections: Collection[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = active ? products.filter((p) => p.collection === active) : products;
    list = [...list];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return list;
  }, [active, sort, products]);

  return (
    <div>
      {/* Filter + sort bar */}
      <div className="sticky top-[4.5rem] z-30 -mx-4 mb-10 border-y border-border bg-ivory/90 px-4 py-3 backdrop-blur-md sm:top-[5rem] sm:mx-0 sm:px-0 sm:backdrop-blur-none">
        <div className="flex items-center justify-between gap-4">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto sm:px-0">
            <FilterChip active={active === null} onClick={() => setActive(null)}>
              All
            </FilterChip>
            {collections.map((c) => (
              <FilterChip
                key={c.slug}
                active={active === c.slug}
                onClick={() => setActive(c.slug)}
              >
                {c.name}
              </FilterChip>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden text-xs text-muted sm:inline">
              {filtered.length} items
            </span>
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted sm:hidden" />
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="cursor-pointer appearance-none border border-border bg-transparent py-2 pl-9 pr-8 text-xs font-medium uppercase tracking-[0.1em] text-onyx focus:border-onyx focus:outline-none sm:pl-3"
              >
                {sortOptions.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            </div>
          </div>
        </div>
      </div>

      <ProductGrid key={`${active}-${sort}`} products={filtered} />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap border px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors cursor-pointer",
        active
          ? "border-onyx bg-onyx text-ivory"
          : "border-border bg-transparent text-charcoal hover:border-onyx",
      )}
    >
      {children}
    </button>
  );
}
