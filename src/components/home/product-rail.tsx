import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/catalog";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function ProductRail({
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn("py-20 sm:py-28", dark ? "bg-onyx" : "bg-ivory", className)}
      aria-label={title}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            tone={tone}
          />
          <Link
            href={viewAllHref}
            className={cn(
              "group inline-flex shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-[0.12em]",
              dark ? "text-ivory" : "text-onyx",
            )}
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Rail: horizontal scroll on mobile, grid on desktop */}
        <RevealGroup className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {products.map((p) => (
            <RevealItem
              key={p.slug}
              className="w-[72vw] shrink-0 snap-start sm:w-auto"
            >
              <ProductCard product={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
