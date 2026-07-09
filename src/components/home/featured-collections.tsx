import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Ribbon } from "@/components/brand/ribbon";
import { SectionHeading } from "@/components/ui/section-heading";
import { CollectionCard } from "@/components/shop/collection-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { collections } from "@/data/catalog";

export function FeaturedCollections() {
  const featured = collections.slice(0, 5);

  return (
    <section
      className="relative bg-onyx pb-16 pt-6 text-ivory sm:pb-24 sm:pt-10"
      aria-labelledby="collections-heading"
    >
      <Ribbon tone="ivory" animated={false} className="opacity-[0.22]" />
      <div className="story-glow-gold pointer-events-none absolute inset-x-0 top-0 h-48" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Shop by category"
            title="Hair, wigs, care &amp; styling"
            description="Browse extensions, lace fronts, hair care, styling products, and everyday accessories."
            id="collections-heading"
            tone="dark"
          />
          <Link
            href="/shop"
            className="group relative z-10 inline-flex shrink-0 items-center gap-2 pb-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-stone transition-colors hover:text-ivory"
          >
            All products
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <RevealGroup className="relative z-0 mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3 md:mt-2 md:grid-cols-5">
          {featured.map((c, i) => (
            <RevealItem
              key={c.slug}
              className={i === 0 ? "md:-mt-6 lg:-mt-10" : undefined}
            >
              <CollectionCard collection={c} variant="photo" className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
