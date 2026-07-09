import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { educationImage } from "@/data/images";
import { guides } from "@/data/guides";

export function Education() {
  return (
    <section
      className="border-y border-stone-line bg-champagne py-16 sm:py-24"
      aria-labelledby="education-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="relative overflow-hidden bg-stone">
            <div className="relative aspect-[4/5] max-h-[28rem] lg:max-h-none">
              <Image
                src={educationImage.src}
                alt={educationImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow text-gold-deep">Hair guides</p>
            <h2
              id="education-heading"
              className="mt-3 font-display text-3xl leading-tight tracking-tight text-onyx sm:text-4xl"
            >
              Pick the right product the first time
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Straight guides on wig density, bundle counts, and protective style
              care — written for real shopping decisions.
            </p>

            <ul className="mt-8 space-y-5">
              {guides.map((g) => (
                <li key={g.slug} className="border-b border-stone-line pb-5 last:border-0">
                  <Link href={`/learn/${g.slug}`} className="group block">
                    <h3 className="font-display text-lg text-onyx transition-colors group-hover:text-gold-deep">
                      {g.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
                      {g.excerpt}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-charcoal group-hover:text-onyx">
                      {g.readTime}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/learn"
              className="group mt-8 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-onyx"
            >
              All hair guides
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
