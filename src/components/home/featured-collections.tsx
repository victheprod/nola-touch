import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CollectionCard } from "@/components/shop/collection-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { collections } from "@/data/catalog";

export function FeaturedCollections() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="collections-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Shop by Collection"
            title="Find exactly what you need"
            description="Six focused collections, so you get straight to the right products — no endless scrolling."
            id="collections-heading"
          />
          <Link
            href="/shop"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-onyx"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
          <RevealItem className="col-span-2 row-span-2 lg:col-span-2">
            <CollectionCard collection={collections[0]} className="h-full min-h-[22rem]" />
          </RevealItem>
          {collections.slice(1, 5).map((c) => (
            <RevealItem key={c.slug} className="col-span-1">
              <CollectionCard collection={c} className="h-full min-h-[15rem]" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
