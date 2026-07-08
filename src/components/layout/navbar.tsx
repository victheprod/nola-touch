"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, User, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrimaryLogo } from "@/components/brand/primary-logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useCart } from "@/lib/cart/cart-context";

const navLinks = [
  { label: "Hair Extensions", href: "/shop/extensions" },
  { label: "Wigs & Frontals", href: "/shop/wigs" },
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
      {/* Gold announcement — matches Figma Make V4 */}
      <div className="relative z-40 bg-gold px-4 py-2.5 text-center">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-onyx">
          Free shipping on orders over $75
          <span className="mx-2.5 opacity-40">·</span>
          Ships within 1–3 business days
        </p>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-500",
          scrolled
            ? "border-white/10 bg-onyx/95 backdrop-blur-xl"
            : "border-white/5 bg-onyx",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-all duration-500 sm:px-6 lg:px-8",
            scrolled ? "py-3.5" : "py-4",
          )}
        >
          {/* Logo — left, per Figma */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="-ml-1 flex h-10 w-10 items-center justify-center text-ivory lg:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <PrimaryLogo variant="ivory" />
          </div>

          {/* Category nav — center */}
          <nav
            className="hidden flex-1 items-center justify-center gap-6 xl:gap-8 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap py-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-stone transition-colors hover:text-ivory"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions — right */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center text-stone transition-colors hover:text-ivory sm:flex cursor-pointer"
            >
              <Search className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center text-stone transition-colors hover:text-ivory sm:flex"
            >
              <User className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open bag, ${count} items`}
              className="relative flex h-10 w-10 items-center justify-center text-ivory transition-colors hover:text-gold cursor-pointer"
            >
              <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-gold px-1 text-[0.6rem] font-bold text-onyx">
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
