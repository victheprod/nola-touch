"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand/brand-mark";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useMounted } from "@/lib/use-mounted";
import { heroImage } from "@/data/images";

export function Hero() {
  const mounted = useMounted();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 72]);
  const imageScale = useTransform(scrollY, [0, 600], [1, 1.06]);
  const contentOpacity = useTransform(scrollY, [0, 420], [1, 0.72]);

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-onyx text-ivory sm:min-h-[88vh]">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          className="object-cover object-[center_20%] opacity-[0.72] sm:object-center"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div
          className="pointer-events-none absolute -left-1/4 top-1/3 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl"
          aria-hidden="true"
        />
      </motion.div>

      <BrandMark
        asset="icon"
        variant="gold"
        className="pointer-events-none absolute -right-6 top-14 z-[1] h-44 w-44 opacity-[0.06] sm:top-16 sm:h-56 sm:w-56 lg:h-72 lg:w-72"
      />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-4 py-20 sm:min-h-[88vh] sm:px-6 sm:py-24 lg:px-8"
      >
        <motion.div
          variants={staggerContainer}
          initial={mounted ? "hidden" : false}
          animate="visible"
          className="max-w-xl lg:max-w-2xl"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <p className="eyebrow text-gold">Beauty Supply · San Antonio, Texas</p>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-[2.75rem] font-normal leading-[1.05] tracking-[-0.02em] sm:mt-6 sm:text-6xl lg:text-[5.25rem] lg:leading-[1.02]"
          >
            <span className="block">Your Hair.</span>
            <span className="mt-2 block italic text-gold sm:mt-3">Your Crown.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-stone sm:mt-7 sm:text-base"
          >
            Wigs, bundles, hair care, styling products, and accessories — curated
            for Black women. Shipped nationwide or pick up locally in San Antonio.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <Button variant="gold" size="lg" asChild>
              <Link href="/shop">
                Shop hair <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </Button>
            <Button variant="outline-ivory" size="lg" asChild>
              <Link href="/shop/wigs">Shop wigs</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bleed into trust band — no hard seam */}
      <div
        className="story-hero-fade pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 sm:h-52"
        aria-hidden="true"
      />
    </section>
  );
}
