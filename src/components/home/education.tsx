import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { guides } from "@/data/guides";

export function Education() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="education-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Hair Guides"
            title="Know before you buy"
            description="Straightforward guides written to help you pick the right product the first time."
            id="education-heading"
          />
          <Link
            href="/learn"
            className="shrink-0 text-sm font-medium uppercase tracking-[0.12em] text-onyx underline-offset-4 hover:underline"
          >
            All guides
          </Link>
        </div>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {guides.map((g) => (
            <RevealItem key={g.slug}>
              <Link
                href={`/learn/${g.slug}`}
                className="group relative flex h-full flex-col overflow-hidden border border-border bg-ivory p-8 transition-colors hover:border-gold-deep/50"
              >
                <span className="eyebrow text-gold-deep">{g.kicker}</span>
                <h3 className="mt-4 font-display text-2xl leading-snug text-onyx">
                  {g.title}
                </h3>
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
    </section>
  );
}
