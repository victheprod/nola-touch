"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StackedLogo } from "@/components/brand/stacked-logo";
import { Ribbon } from "@/components/brand/ribbon";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useMounted } from "@/lib/use-mounted";
import { heroImage } from "@/data/images";

export function Hero() {
  const mounted = useMounted();

  return (
    <section className="relative h-[92vh] min-h-[600px] max-h-[900px] overflow-hidden bg-onyx text-ivory">
      <div className="absolute inset-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          className="object-cover opacity-[0.72]"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <Ribbon tone="gold" className="bottom-0 left-0 h-[45%] w-full opacity-[0.14]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial={mounted ? "hidden" : false}
          animate="visible"
          className="max-w-[640px]"
        >
          <motion.p variants={fadeUp} className="eyebrow text-gold">
            Premium Beauty Supply · New Orleans
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-7 font-display font-normal leading-[0.94] tracking-[-0.02em]"
          >
            <span className="block text-[3.5rem] sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]">
              Your Hair.
            </span>
            <span className="block text-[3.5rem] italic text-gold sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]">
              Your Crown.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-md text-[0.95rem] leading-[1.8] text-stone sm:text-base"
          >
            Everything you need for extensions, wigs, natural hair care, and
            everyday styling — curated for Black women, delivered to your door.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
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

      <div
        className="pointer-events-none absolute bottom-8 right-6 opacity-20 sm:right-10 lg:right-14"
        aria-hidden
      >
        <StackedLogo variant="gold" size="sm" />
      </div>
    </section>
  );
}
