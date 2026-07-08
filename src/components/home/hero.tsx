"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ribbon } from "@/components/brand/ribbon";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useMounted } from "@/lib/use-mounted";

export function Hero() {
  const mounted = useMounted();

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-onyx text-ivory">
      {/* Editorial gradient stand-in for hero photography */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(11,11,12,0.92) 0%, rgba(11,11,12,0.55) 45%, rgba(11,11,12,0.75) 100%), radial-gradient(ellipse 80% 60% at 75% 40%, rgba(184,145,46,0.18) 0%, transparent 60%), linear-gradient(160deg, #1a1714 0%, #0b0b0c 50%, #26241f 100%)",
        }}
      />
      <Ribbon tone="gold" className="opacity-90" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-onyx to-transparent" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial={mounted ? "hidden" : false}
          animate="visible"
          className="max-w-2xl"
        >
          <motion.p variants={fadeUp} className="eyebrow text-gold">
            Premium Beauty Supply — New Orleans
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-[3.25rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]"
          >
            Your Hair.
            <br />
            <span className="italic text-gold">Your Crown.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg text-base leading-relaxed text-stone sm:text-lg"
          >
            Everything you need for extensions, wigs, natural hair care, and
            everyday styling — curated for Black women, delivered to your door.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <Button variant="gold" size="lg" asChild>
              <Link href="/shop">
                Shop Now <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </Button>
            <Button variant="outline-ivory" size="lg" asChild>
              <Link href="/shop/wigs">View Collections</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
