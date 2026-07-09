"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { BeautyMatchRecommendation } from "@/lib/beauty-match/types";
import { getRecommendedProducts } from "@/lib/beauty-match/recommend";
import { productImages } from "@/data/images";

export function GuideResults({
  recommendation,
  onRestart,
  alertsJoined,
}: {
  recommendation: BeautyMatchRecommendation;
  onRestart: () => void;
  alertsJoined: boolean;
}) {
  const products = getRecommendedProducts(recommendation.productSlugs);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-2"
    >
      <motion.div variants={fadeUp} className="relative overflow-hidden border border-gold/30 bg-onyx p-5 text-ivory">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />
        <div className="relative flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-gold/40 bg-gold/10">
            <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.5} />
          </span>
          <div>
            <p className="eyebrow text-gold">Your match</p>
            <h3 className="mt-1 font-display text-2xl leading-tight tracking-tight">
              {recommendation.category}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              {recommendation.whyItFits}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-gold/90">
              Est. {recommendation.priceRange}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted">
          Suggested for you
        </p>
        <ul className="mt-2 space-y-1.5">
          {recommendation.productTypes.map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm text-charcoal">
              <span className="h-1 w-1 shrink-0 bg-gold-deep" />
              {t}
            </li>
          ))}
        </ul>
      </motion.div>

      {products.length > 0 && (
        <motion.div variants={fadeUp} className="space-y-3">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted">
            Shop these picks
          </p>
          <ul className="divide-y divide-stone-line border border-stone-line">
            {products.map((p) => {
              const img = productImages[p.slug];
              return (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="flex items-center gap-3 bg-ivory p-3 transition-colors hover:bg-champagne/50"
                  >
                    <div className="relative h-14 w-11 shrink-0 overflow-hidden bg-stone">
                      {img ? (
                        <Image src={img.src} alt="" fill className="object-cover" sizes="44px" />
                      ) : (
                        <div className="surface-champagne h-full w-full" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm text-onyx">{p.name}</p>
                      <p className="text-xs text-muted">{formatPrice(p.price)}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}

      <motion.div variants={fadeUp}>
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted">
          Care tips
        </p>
        <ul className="mt-2 space-y-2">
          {recommendation.careTips.map((tip) => (
            <li key={tip} className="text-sm leading-relaxed text-charcoal">
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={fadeUp}>
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted">
          Consider adding
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {recommendation.addOns.map((a) => (
            <span
              key={a}
              className="border border-stone-line bg-champagne/60 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.08em] text-charcoal"
            >
              {a}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-col gap-2.5 pt-2">
        <Button variant="gold" size="lg" className="w-full" asChild>
          <Link href={recommendation.shopHref}>
            Shop your match <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        {alertsJoined ? (
          <p className="text-center text-xs text-muted">
            You&apos;re on the list for restock &amp; texture alerts.
          </p>
        ) : (
          <Button variant="outline" size="md" className="w-full" asChild>
            <Link href="/#newsletter">Join product alerts</Link>
          </Button>
        )}
        <button
          type="button"
          onClick={onRestart}
          className="py-2 text-center text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-onyx cursor-pointer"
        >
          Start over
        </button>
      </motion.div>
    </motion.div>
  );
}
