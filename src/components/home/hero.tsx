"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useMounted } from "@/lib/use-mounted";
import { heroImage } from "@/data/images";

export function Hero() {
  const mounted = useMounted();

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-onyx text-ivory sm:min-h-[88vh]">
      <div className="absolute inset-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          className="object-cover object-[center_20%] opacity-[0.68] sm:object-center"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-4 py-20 sm:min-h-[88vh] sm:px-6 sm:py-24 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial={mounted ? "hidden" : false}
          animate="visible"
          className="max-w-xl lg:max-w-2xl"
        >
          <motion.p variants={fadeUp} className="eyebrow text-gold">
            Beauty Supply · New Orleans
          </motion.p>

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
            for Black women and shipped to your door.
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
      </div>
    </section>
  );
}
