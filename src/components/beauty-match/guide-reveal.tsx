"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { revealPortrait } from "@/data/guide-images";
import { easeLux } from "@/lib/motion";

export function GuideReveal({
  onDone,
  onClose,
}: {
  onDone: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center text-stone transition-colors hover:text-ivory cursor-pointer"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative flex-1">
        <Image
          src={revealPortrait.src}
          alt={revealPortrait.alt}
          fill
          className="object-cover object-top"
          sizes="420px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeLux, delay: 0.3 }}
          className="absolute inset-x-0 bottom-0 px-6 pb-10"
        >
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-gold">
            Your beauty match
          </p>
          <h2 className="mt-2 font-display text-[1.75rem] leading-tight text-ivory">
            Here&apos;s what we recommend
            <br />
            <span className="italic text-gold">just for you.</span>
          </h2>
          <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full bg-gold"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: easeLux, delay: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
