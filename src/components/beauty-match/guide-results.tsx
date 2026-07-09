"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { BeautyMatchAnswers, BeautyMatchRecommendation } from "@/lib/beauty-match/types";
import { getRecommendedProducts } from "@/lib/beauty-match/recommend";
import { answerLabel, GUIDE_STEPS } from "@/lib/beauty-match/questions";
import { productImages } from "@/data/images";
import { submitBeautyMatch } from "@/lib/beauty-match/submit";

type ResultsView = "product" | "summary";

export function GuideResults({
  recommendation,
  answers,
  onRestart,
}: {
  recommendation: BeautyMatchRecommendation;
  answers: BeautyMatchAnswers;
  onRestart: () => void;
}) {
  const [view, setView] = useState<ResultsView>("product");
  const [name, setName] = useState(answers.name);
  const [email, setEmail] = useState(answers.email);
  const [phone, setPhone] = useState(answers.phone);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const products = getRecommendedProducts(recommendation.productSlugs);
  const hero = products[0];
  const heroImg = hero ? productImages[hero.slug] : null;

  const summaryItems = GUIDE_STEPS.filter((s) => s.type === "single")
    .map((s) => {
      const val = answers[s.id as keyof BeautyMatchAnswers];
      if (typeof val !== "string" || !val) return null;
      return { label: s.title.replace("?", ""), value: answerLabel(s.id, val) };
    })
    .filter(Boolean) as { label: string; value: string }[];

  const concerns = answers.hairConcerns
    .filter((c) => c !== "unsure" && c !== "none")
    .map((c) => {
      const step = GUIDE_STEPS.find((s) => s.id === "hairConcerns");
      return step?.options.find((o) => o.id === c)?.label ?? c;
    });

  const handleSave = async () => {
    if (!email.includes("@") || name.trim().length < 2) return;
    setSaving(true);
    const payload = { ...answers, name: name.trim(), email, phone };
    await submitBeautyMatch(payload);
    setSaved(true);
    setSaving(false);
  };

  return (
    <AnimatePresence mode="wait">
      {view === "product" && (
        <motion.div
          key="product"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, x: -12 }}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-6"
        >
          {hero && heroImg && (
            <motion.div variants={fadeUp} className="relative -mx-5 mb-5 aspect-[4/3] overflow-hidden">
              <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" sizes="420px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
            </motion.div>
          )}

          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2 text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-[0.58rem] font-semibold uppercase tracking-[0.2em]">
                Top pick for you
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl leading-tight text-ivory">
              {hero?.name ?? recommendation.category}
            </h3>
            {hero && (
              <p className="mt-1 font-display text-xl text-gold">{formatPrice(hero.price)}</p>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-5 space-y-2">
            {recommendation.productTypes.slice(0, 4).map((t) => (
              <div key={t} className="flex items-start gap-2 text-sm text-stone">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} />
                {t}
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-gold">
              Why we love this for you
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone">{recommendation.whyItFits}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-2">
            {hero && (
              <Button variant="gold" size="lg" className="w-full rounded-full" asChild>
                <Link href={`/products/${hero.slug}`}>Shop this look</Link>
              </Button>
            )}
            <Button
              variant="outline"
              size="md"
              className="w-full rounded-full border-white/20 bg-transparent text-ivory hover:bg-white/10"
              onClick={() => setView("summary")}
            >
              View match summary
            </Button>
            <Button variant="outline" size="md" className="w-full rounded-full border-white/20 bg-transparent text-ivory hover:bg-white/10" asChild>
              <Link href={recommendation.shopHref}>Browse {recommendation.category}</Link>
            </Button>
          </motion.div>
        </motion.div>
      )}

      {view === "summary" && (
        <motion.div
          key="summary"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-6"
        >
          <h3 className="font-display text-xl text-ivory">Match summary</h3>
          <p className="mt-1 text-sm text-stone">Here&apos;s what we learned about your style.</p>

          <ul className="mt-5 space-y-3">
            {summaryItems.map((item) => (
              <li key={item.label} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-xs text-stone">{item.label}</span>
                <span className="text-right text-sm text-ivory">{item.value}</span>
              </li>
            ))}
            {concerns.length > 0 && (
              <li className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-xs text-stone">Concerns</span>
                <span className="text-right text-sm text-ivory">{concerns.join(", ")}</span>
              </li>
            )}
          </ul>

          <div className="mt-8">
            <p className="font-display text-lg text-ivory">What&apos;s next?</p>
            <p className="mt-1 text-sm text-stone">
              Save your match and get restock alerts when your textures drop.
            </p>

            {!saved ? (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="match-guide-input-dark w-full"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="match-guide-input-dark w-full"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (optional)"
                  className="match-guide-input-dark w-full"
                />
                <Button
                  variant="gold"
                  size="lg"
                  className="mt-2 w-full rounded-full"
                  disabled={saving || !email.includes("@") || name.trim().length < 2}
                  onClick={handleSave}
                >
                  {saving ? "Saving…" : "Save my match"}
                </Button>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold">
                <Check className="h-4 w-4" />
                Match saved — we&apos;ll be in touch.
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onRestart}
            className="mt-6 py-2 text-center text-[0.65rem] uppercase tracking-[0.14em] text-stone transition-colors hover:text-ivory cursor-pointer"
          >
            Retake guide
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
