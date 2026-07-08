import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Ribbon } from "@/components/brand/ribbon";
import { Reveal } from "@/components/motion/reveal";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-onyx text-ivory" : "border-b border-border bg-champagne",
      )}
    >
      {dark && <Ribbon tone="gold" className="opacity-80" />}
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link
                      href={c.href}
                      className={cn(
                        "transition-colors hover:text-onyx",
                        dark && "hover:text-gold",
                      )}
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className={dark ? "text-stone" : "text-onyx"}>
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal>
          {eyebrow && (
            <p className={cn("eyebrow mb-4", dark ? "text-gold" : "text-gold-deep")}>
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl lg:text-6xl",
              dark ? "text-ivory" : "text-onyx",
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mt-5 max-w-xl text-base leading-relaxed sm:text-lg",
                dark ? "text-stone" : "text-muted",
              )}
            >
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
