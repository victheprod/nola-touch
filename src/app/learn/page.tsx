import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shop/page-hero";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Hair Guides",
  description:
    "Straightforward guides on wig density, bundle counts, and protective style care — written to help you shop with confidence.",
};

export default function LearnPage() {
  return (
    <>
      <PageHero
        eyebrow="Hair Guides"
        title="Know before you buy"
        description="Practical, honest guides to help you choose the right product the first time — no jargon."
        crumbs={[{ label: "Home", href: "/" }, { label: "Learn" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {guides.map((g) => (
            <RevealItem key={g.slug}>
              <Link
                href={`/learn/${g.slug}`}
                className="group flex h-full flex-col border border-border bg-ivory p-8 transition-colors hover:border-gold-deep/50"
              >
                <span className="eyebrow text-gold-deep">{g.kicker}</span>
                <h2 className="mt-4 font-display text-2xl leading-snug text-onyx">
                  {g.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {g.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-onyx">
                  {g.readTime}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
