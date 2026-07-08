import Link from "next/link";
import { Ribbon } from "@/components/brand/ribbon";
import { LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-onyx px-4 text-center text-ivory">
      <Ribbon tone="gold" className="opacity-80" />
      <div className="relative">
        <LogoMark className="mx-auto h-12 w-12 text-gold" />
        <p className="eyebrow mt-8 text-gold">Error 404</p>
        <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
          This page slipped away
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
          get you back to shopping.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="gold" size="lg" asChild>
            <Link href="/">Back Home</Link>
          </Button>
          <Button variant="outline-ivory" size="lg" asChild>
            <Link href="/shop">Shop All</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
