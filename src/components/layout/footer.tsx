import Link from "next/link";
import { BrandStacked } from "@/components/brand/brand-logo";
import { collections } from "@/data/catalog";

const help = [
  { label: "Contact", href: "/contact" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "FAQ", href: "/faq" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Hair guides", href: "/learn" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.28 2.69.08 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.28 0 .56.04.82.12V9.4a6.34 6.34 0 00-.82-.05A6.34 6.34 0 004 15.69a6.34 6.34 0 0010.86 4.43 6.33 6.33 0 001.86-4.48V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.05-.07z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M24 12a12 12 0 10-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0024 12z",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-onyx text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <BrandStacked variant="gold" size="md" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone">
              Wigs, bundles, hair care, styling products, and accessories for
              Black women — shipped fast from New Orleans.
            </p>
            <p className="mt-4 text-sm text-stone">
              <a
                href="mailto:hello@nolatouch.com"
                className="transition-colors hover:text-gold"
              >
                hello@nolatouch.com
              </a>
            </p>
            <form
              className="mt-6 flex max-w-sm border border-white/15 focus-within:border-gold"
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Email for restock alerts"
                className="h-11 flex-1 bg-transparent px-4 text-sm text-ivory placeholder:text-muted-soft focus:outline-none"
              />
              <button
                type="submit"
                className="h-11 px-4 text-xs font-semibold uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-onyx cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="eyebrow text-gold">Shop</h3>
              <ul className="mt-4 space-y-2.5">
                {collections.slice(0, 5).map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/shop/${c.slug}`}
                      className="text-sm text-stone transition-colors hover:text-ivory"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/shop"
                    className="text-sm font-medium text-gold transition-colors hover:text-ivory"
                  >
                    All products
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-gold">Help</h3>
              <ul className="mt-4 space-y-2.5">
                {help.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-stone transition-colors hover:text-ivory"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-gold">Company</h3>
              <ul className="mt-4 space-y-2.5">
                {company.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-stone transition-colors hover:text-ivory"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <div className="flex gap-2.5">
            {socials.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-stone transition-colors hover:border-gold hover:text-gold"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-xs text-muted-soft sm:flex-row sm:items-center sm:gap-5">
            <p>&copy; {new Date().getFullYear()} Nola Touch</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-stone">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-stone">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
