import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/catalog";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import { Ribbon } from "@/components/brand/ribbon";
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
      className={cn(
        "relative overflow-hidden py-20 sm:py-28",
        dark ? "bg-[#0D0D0D]" : "bg-ivory",
        className,
      )}
      aria-label={title}
    >
      {dark && <Ribbon tone="gold" className="opacity-[0.055]" />}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              "group inline-flex shrink-0 items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors",
              dark ? "text-stone hover:text-ivory" : "text-onyx",
            )}
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <RevealGroup className="no-scrollbar mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((p) => (
            <RevealItem key={p.slug}>
              <ProductCard product={p} tone={tone} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
