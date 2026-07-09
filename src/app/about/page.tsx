import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ProductSurface } from "@/components/shop/product-surface";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nola Touch is a digital beauty supply store built for Black women — curated hair and beauty products, honest pricing, and real support.",
};

const facts = [
  { value: "500+", label: "Products in stock" },
  { value: "12k+", label: "Verified reviews" },
  { value: "1–2 days", label: "To ship your order" },
  { value: "50 states", label: "We ship across the US" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Nola Touch"
        title="A beauty supply built for Black women"
        description="The convenience of shopping online, with the curation and care of a beauty supply that actually knows textured hair — proudly based in San Antonio, Texas."
        tone="dark"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ProductSurface
              surface="champagne"
              className="aspect-[4/3] w-full"
              markClassName="h-16 w-16"
            />
          </Reveal>
          <Reveal className="max-w-xl">
            <h2 className="font-display text-3xl leading-tight tracking-tight text-onyx sm:text-4xl">
              Shopping for hair shouldn&apos;t be a gamble
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                Too often, buying hair online means guessing at quality, sorting
                through endless listings, and hoping the texture matches the
                photos. We started Nola Touch to fix that — a focused store where
                every wig, bundle, and product is vetted before it earns a spot.
              </p>
              <p>
                We stock the brands stylists trust and the staples you actually
                reach for, from HD lace units to edge control that doesn&apos;t
                flake. Clear product details, honest pricing, and fast shipping
                mean you can shop with confidence and get back to your day.
              </p>
            </div>
            <Button variant="gold" size="lg" className="mt-8" asChild>
              <Link href="/shop">Shop the Collection</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-champagne py-16">
        <RevealGroup className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {facts.map((f) => (
            <RevealItem key={f.label} className="text-center">
              <p className="font-display text-4xl text-onyx sm:text-5xl">
                {f.value}
              </p>
              <p className="mt-2 text-sm text-muted">{f.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
