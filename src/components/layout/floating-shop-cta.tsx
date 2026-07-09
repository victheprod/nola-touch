"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { easeLux } from "@/lib/motion";

/** Mobile-only floating shop CTA — appears after scrolling past hero. */
export function FloatingShopCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.45, ease: easeLux }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <Link
            href="/shop"
            className="pointer-events-auto mx-auto flex max-w-sm items-center justify-center gap-2.5 border border-white/10 bg-onyx/85 px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ivory shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:bg-onyx"
          >
            <ShoppingBag className="h-4 w-4 text-gold" strokeWidth={1.5} />
            Shop all hair
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
