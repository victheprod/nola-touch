import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CollectionCard } from "@/components/shop/collection-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { collections } from "@/data/catalog";

export function FeaturedCollections() {
  const featured = collections.slice(0, 5);

  return (
    <section
      className="bg-onyx py-20 text-ivory sm:py-28"
      aria-labelledby="collections-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Shop by Category"
            title="Find what you need"
            description="Five focused collections — straight to the right products, no endless scrolling."
            id="collections-heading"
            tone="dark"
          />
          <Link
            href="/shop"
            className="group inline-flex shrink-0 items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-stone transition-colors hover:text-ivory"
          >
            All categories
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <RevealGroup className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
          {featured.map((c) => (
            <RevealItem key={c.slug}>
              <CollectionCard collection={c} variant="photo" className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
