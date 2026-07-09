"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { guideIntroCollage } from "@/data/guide-images";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function GuideIntro({ onStart, onClose }: { onStart: () => void; onClose: () => void }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center text-stone transition-colors hover:text-ivory cursor-pointer"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
          {guideIntroCollage.map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="210px" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="absolute inset-x-0 bottom-0 px-6 pb-8 pt-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 text-gold">
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em]">
              Beauty Match Guide
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-[2rem] leading-[1.05] tracking-tight text-ivory"
          >
            Your hair.
            <br />
            <span className="italic text-gold">Your vibe.</span>
          </motion.h2>
          <motion.ul variants={fadeUp} className="mt-4 space-y-1.5 text-sm text-stone">
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold" />
              Personalized just for you
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold" />
              Expert curated recommendations
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold" />
              Saves you time &amp; money
            </li>
          </motion.ul>
        </motion.div>
      </div>

      <div className="shrink-0 border-t border-white/10 bg-[#0a0a0b] px-5 py-5">
        <Button variant="gold" size="lg" className="w-full rounded-full text-[0.7rem] uppercase tracking-[0.12em]" onClick={onStart}>
          Find your match
          <span className="ml-2 font-normal normal-case tracking-normal text-onyx/70">
            · takes 60 sec
          </span>
        </Button>
      </div>
    </div>
  );
}
