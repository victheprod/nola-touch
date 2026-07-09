"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BrandPrimary } from "@/components/brand/brand-logo";
import { fadeUp, staggerContainer } from "@/lib/motion";

const shopLinks = [
  { label: "Hair Extensions", href: "/shop/extensions" },
  { label: "Wigs & Frontals", href: "/shop/wigs" },
  { label: "Hair Care", href: "/shop/hair-care" },
  { label: "Styling", href: "/shop/styling" },
  { label: "Accessories", href: "/shop/tools" },
  { label: "Beauty Essentials", href: "/shop/beauty" },
];

const secondary = [
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/shop/new" },
  { label: "Best Sellers", href: "/shop/best-sellers" },
  { label: "Hair Guides", href: "/learn" },
  { label: "About", href: "/about" },
];

export function MobileNav({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full max-w-md border-white/10 bg-onyx text-ivory"
      >
        <SheetHeader className="border-b border-white/10 pb-6">
          <SheetTitle asChild>
            <span>
              <BrandPrimary href={null} variant="ivory" />
            </span>
          </SheetTitle>
        </SheetHeader>

        <motion.nav
          variants={staggerContainer}
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          className="flex-1 overflow-y-auto px-2 py-8"
          aria-label="Mobile"
        >
          <motion.p variants={fadeUp} className="eyebrow px-3 text-gold">
            Shop
          </motion.p>
          <ul className="mt-3 flex flex-col">
            {shopLinks.map((l) => (
              <motion.li key={l.href} variants={fadeUp}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="flex items-center justify-between px-3 py-3.5 font-display text-2xl text-ivory transition-colors hover:text-gold"
                >
                  {l.label}
                  <ChevronRight className="h-4 w-4 text-stone" />
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="my-8 h-px bg-white/10" />

          <ul className="flex flex-col">
            {secondary.map((l) => (
              <motion.li key={l.href} variants={fadeUp}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="block px-3 py-2.5 text-sm font-medium uppercase tracking-[0.1em] text-stone transition-colors hover:text-ivory"
                >
                  {l.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        <div className="border-t border-white/10 px-6 py-5">
          <Link
            href="/account"
            onClick={close}
            className="block py-1.5 text-sm text-stone transition-colors hover:text-ivory"
          >
            Account
          </Link>
          <Link
            href="/contact"
            onClick={close}
            className="block py-1.5 text-sm text-stone transition-colors hover:text-ivory"
          >
            Help & Contact
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
