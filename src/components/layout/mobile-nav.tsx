import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BrandPrimary } from "@/components/brand/brand-logo";

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
      <SheetContent side="left" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle asChild>
            <span>
              <BrandPrimary href={null} />
            </span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile">
          <p className="eyebrow px-3 text-muted-soft">Shop</p>
          <ul className="mt-2 flex flex-col">
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="flex items-center justify-between px-3 py-3 font-display text-xl text-onyx transition-colors hover:text-gold-deep"
                >
                  {l.label}
                  <ChevronRight className="h-4 w-4 text-muted-soft" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-6 h-px bg-border" />

          <ul className="flex flex-col">
            {secondary.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="block px-3 py-2.5 text-sm font-medium uppercase tracking-[0.1em] text-charcoal transition-colors hover:text-onyx"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border px-6 py-5">
          <Link
            href="/account"
            onClick={close}
            className="block py-1.5 text-sm text-muted transition-colors hover:text-onyx"
          >
            Account
          </Link>
          <Link
            href="/contact"
            onClick={close}
            className="block py-1.5 text-sm text-muted transition-colors hover:text-onyx"
          >
            Help & Contact
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
