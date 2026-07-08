"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Ribbon } from "@/components/brand/ribbon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden bg-gold py-20 sm:py-24">
      <Ribbon tone="onyx" className="opacity-70" />
      <Reveal className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="eyebrow text-charcoal">Stay in the loop</p>
        <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-balance text-onyx sm:text-4xl lg:text-5xl">
          New drops &amp; restock alerts, first
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-charcoal">
          Be first to know when new textures, lengths, and brands land — plus the
          occasional subscriber-only code. No spam, unsubscribe anytime.
        </p>

        {submitted ? (
          <div className="mx-auto mt-8 inline-flex items-center gap-2 bg-onyx px-6 py-4 text-ivory">
            <Check className="h-5 w-5 text-gold" />
            <span className="font-medium">You&apos;re on the list. Welcome.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 flex-1 border border-onyx/25 bg-ivory px-5 text-sm text-onyx placeholder:text-muted focus:border-onyx focus:outline-none sm:border-r-0"
            />
            <Button type="submit" variant="primary" size="lg" className="sm:px-10">
              Subscribe
            </Button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
