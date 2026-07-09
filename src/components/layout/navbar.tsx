"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, User, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandIcon } from "@/components/brand/brand-logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useCart } from "@/lib/cart/cart-context";

const navLinks = [
  { label: "Extensions", href: "/shop/extensions" },
  { label: "Wigs", href: "/shop/wigs" },
  { label: "Hair Care", href: "/shop/hair-care" },
  { label: "Styling", href: "/shop/styling" },
  { label: "Accessories", href: "/shop/tools" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="relative z-40 bg-gold px-4 py-2 text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-onyx sm:text-[0.68rem]">
          Free shipping over $75
          <span className="mx-2 opacity-40">·</span>
          Ships in 1–3 days
        </p>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-white/10 bg-onyx/95 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-white/5 bg-onyx",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
            scrolled ? "py-3" : "py-3.5",
          )}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="-ml-1 flex h-10 w-10 items-center justify-center text-ivory lg:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <BrandIcon />
          </div>

          <nav
            className="hidden flex-1 items-center justify-center gap-5 xl:gap-7 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-stone transition-colors hover:text-ivory"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center text-stone transition-colors hover:text-ivory sm:flex cursor-pointer"
            >
              <Search className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.5} />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center text-stone transition-colors hover:text-ivory sm:flex"
            >
              <User className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.5} />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open bag, ${count} items`}
              className="relative flex h-10 w-10 items-center justify-center text-ivory transition-colors hover:text-gold cursor-pointer"
            >
              <ShoppingBag className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[0.55rem] font-bold text-onyx">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
