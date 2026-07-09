"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { easeLux } from "@/lib/motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section className="border-t border-stone-line bg-onyx py-16 text-ivory sm:py-20">
      <Reveal className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="eyebrow text-gold">Restock alerts</p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
          Get new wigs &amp; bundles first
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone sm:text-base">
          Email alerts when new textures, lengths, and brands drop. No spam —
          unsubscribe anytime.
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: easeLux }}
              className="mx-auto mt-7 inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-5 py-3.5 backdrop-blur-sm"
            >
              <Check className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium">You&apos;re on the list.</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:flex-row sm:gap-0"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-1 border border-white/15 bg-white/5 px-4 text-sm text-ivory placeholder:text-muted-soft backdrop-blur-sm transition-colors focus:border-gold focus:bg-white/[0.07] focus:outline-none sm:border-r-0"
              />
              <Button type="submit" variant="gold" size="lg" className="sm:px-8">
                Notify me
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
