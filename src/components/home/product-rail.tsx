import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/catalog";
import { Ribbon } from "@/components/brand/ribbon";
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
  flow = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref: string;
  tone?: "light" | "dark";
  className?: string;
  /** `continue` = same-tone chapter with less top padding; `lift` = cards overlap the seam above */
  flow?: "default" | "continue" | "lift";
}) {
  const dark = tone === "dark";

  return (
    <section
      className={cn(
        "relative",
        flow === "continue" ? "pb-16 pt-4 sm:pb-20 sm:pt-6" : "py-16 sm:py-24",
        flow === "lift" && "pb-16 pt-8 sm:pb-24 sm:pt-12",
        dark ? "bg-[#0D0D0D]" : "bg-ivory",
        className,
      )}
      aria-label={title}
    >
      {dark && flow !== "continue" && (
        <Ribbon tone="ivory" animated={false} className="opacity-[0.18]" />
      )}
      {!dark && (
        <div className="story-glow-ivory pointer-events-none absolute inset-x-0 top-0 h-40" aria-hidden />
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            tone={tone}
          />
          <Link
            href={viewAllHref}
            className={cn(
              "group inline-flex shrink-0 items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors",
              dark ? "text-stone hover:text-ivory" : "text-onyx hover:text-gold-deep",
            )}
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <RevealGroup
          className={cn(
            "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",
            flow === "lift" ? "mt-6 sm:mt-8" : "mt-8 sm:mt-10",
            flow === "lift" && "-mt-4 sm:-mt-8",
          )}
        >
          {products.slice(0, 4).map((p) => (
            <RevealItem key={p.slug}>
              <ProductCard product={p} tone={tone} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
