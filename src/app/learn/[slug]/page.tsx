import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/shop/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { guides, getGuide } from "@/data/guides";

type Params = { slug: string };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Not Found" };
  return { title: guide.title, description: guide.excerpt };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <PageHero
        eyebrow={guide.kicker}
        title={guide.title}
        tone="dark"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Learn", href: "/learn" },
          { label: guide.title },
        ]}
      />
      <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="eyebrow text-muted-soft">{guide.readTime}</p>
        <Reveal className="mt-6 space-y-6">
          {guide.body.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-charcoal">
              {p}
            </p>
          ))}
        </Reveal>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-onyx"
          >
            <ArrowLeft className="h-4 w-4" /> All guides
          </Link>
          <Button variant="gold" asChild>
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </article>
    </>
  );
}
