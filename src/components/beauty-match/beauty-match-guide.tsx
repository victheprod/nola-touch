"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Sparkles, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Ribbon } from "@/components/brand/ribbon";
import { GuideProgress } from "@/components/beauty-match/guide-progress";
import { ChoiceCards, MultiChoiceCards } from "@/components/beauty-match/choice-cards";
import { GuideResults } from "@/components/beauty-match/guide-results";
import { GUIDE_STEPS, TOTAL_PROGRESS_STEPS } from "@/lib/beauty-match/questions";
import { EMPTY_ANSWERS, type BeautyMatchAnswers, type BeautyMatchRecommendation } from "@/lib/beauty-match/types";
import { buildRecommendation } from "@/lib/beauty-match/recommend";
import { submitBeautyMatch } from "@/lib/beauty-match/submit";
import { easeLux, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

function LoadingReveal({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        className="h-12 w-12 border border-stone-line border-t-gold"
      />
      <p className="mt-6 font-display text-xl text-onyx">Finding your match</p>
      <p className="mt-2 max-w-xs text-sm text-muted">
        Curating textures, lengths, and care based on what you shared.
      </p>
    </motion.div>
  );
}

export function BeautyMatchGuide() {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<BeautyMatchAnswers>(EMPTY_ANSWERS);
  const [phase, setPhase] = useState<"questions" | "loading" | "results">("questions");
  const [recommendation, setRecommendation] = useState<BeautyMatchRecommendation | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isDesktop = useIsDesktop();

  const step = GUIDE_STEPS[stepIndex];
  const isContact = step?.type === "contact";

  const reset = useCallback(() => {
    setStepIndex(0);
    setAnswers(EMPTY_ANSWERS);
    setPhase("questions");
    setRecommendation(null);
    setSubmitted(false);
  }, []);

  const close = () => {
    setOpen(false);
    setTimeout(reset, 400);
  };

  const canContinue = (): boolean => {
    if (!step) return false;
    if (step.type === "contact") {
      return answers.name.trim().length > 1 && answers.email.includes("@");
    }
    if (step.type === "multi") {
      return answers.hairConcerns.length > 0;
    }
    const val = answers[step.id];
    return Boolean(val);
  };

  const goNext = async () => {
    if (isContact) {
      setPhase("loading");
      const rec = buildRecommendation(answers);
      await submitBeautyMatch(answers);
      setSubmitted(true);
      setRecommendation(rec);
      return;
    }
    if (stepIndex < GUIDE_STEPS.length - 1) {
      setStepIndex((i) => i + 1);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const updateAnswer = <K extends keyof BeautyMatchAnswers>(key: K, value: BeautyMatchAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Floating glass trigger */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: easeLux }}
            onClick={() => setOpen(true)}
            className={cn(
              "fixed z-[35] flex items-center gap-2.5 border border-white/15 bg-onyx/75 px-4 py-3 text-ivory shadow-[0_16px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors hover:bg-onyx/90 cursor-pointer",
              "bottom-[max(1rem,env(safe-area-inset-bottom))] right-4",
              "lg:bottom-6 lg:right-6",
              "max-sm:bottom-[max(5.5rem,env(safe-area-inset-bottom))]",
            )}
            aria-label="Open Beauty Match Guide"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
            <span className="flex flex-col items-start text-left">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em]">
                Beauty Match Guide
              </span>
              <span className="hidden text-[0.7rem] font-normal normal-case tracking-normal text-stone sm:inline">
                Find your match
              </span>
              <span className="text-[0.7rem] font-normal normal-case tracking-normal text-stone sm:hidden">
                Need help choosing?
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <Sheet open={open} onOpenChange={(v) => (v ? setOpen(true) : close())}>
        <SheetContent
          side={isDesktop ? "right" : "bottom"}
          showClose={false}
          className={cn(
            "flex max-h-[92vh] flex-col border-stone-line bg-ivory p-0",
            isDesktop ? "max-w-md" : "rounded-t-xl",
          )}
        >
          <Ribbon tone="gold" animated={false} className="opacity-[0.12]" />

          <SheetHeader className="relative shrink-0 border-b border-stone-line bg-ivory/95 px-5 py-4 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 pr-8">
                <SheetTitle className="font-display text-lg">Beauty Match Guide</SheetTitle>
                <SheetDescription className="text-xs leading-relaxed">
                  Your personal beauty concierge — not a chatbot.
                </SheetDescription>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close guide"
                className="absolute right-4 top-4 text-muted transition-colors hover:text-onyx cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {phase === "questions" && (
              <GuideProgress step={stepIndex} total={TOTAL_PROGRESS_STEPS} className="mt-4" />
            )}
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <AnimatePresence mode="wait">
                {phase === "loading" && (
                  <LoadingReveal onDone={() => setPhase("results")} />
                )}

                {phase === "results" && recommendation && (
                  <GuideResults
                    recommendation={recommendation}
                    onRestart={reset}
                    alertsJoined={submitted}
                  />
                )}

                {phase === "questions" && step && (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.45, ease: easeLux }}
                  >
                    <motion.div variants={fadeUp} initial="hidden" animate="visible">
                      <h2 className="font-display text-xl leading-snug tracking-tight text-onyx sm:text-2xl">
                        {step.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{step.subtitle}</p>
                    </motion.div>

                    <div className="mt-6">
                      {step.type === "single" && (
                        <ChoiceCards
                          options={step.options}
                          value={answers[step.id]}
                          onChange={(id) => updateAnswer(step.id, id)}
                          unsureId={step.unsureId}
                        />
                      )}
                      {step.type === "multi" && (
                        <MultiChoiceCards
                          options={step.options}
                          values={answers.hairConcerns}
                          onChange={(ids) => updateAnswer("hairConcerns", ids)}
                          unsureId={step.unsureId}
                        />
                      )}
                      {step.type === "contact" && (
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="bm-name" className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal">
                              Name
                            </label>
                            <input
                              id="bm-name"
                              type="text"
                              autoComplete="name"
                              value={answers.name}
                              onChange={(e) => updateAnswer("name", e.target.value)}
                              placeholder="Your first name"
                              className="mt-1.5 h-11 w-full border border-stone-line bg-ivory px-3 text-sm focus:border-gold-deep focus:outline-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="bm-email" className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal">
                              Email
                            </label>
                            <input
                              id="bm-email"
                              type="email"
                              autoComplete="email"
                              required
                              value={answers.email}
                              onChange={(e) => updateAnswer("email", e.target.value)}
                              placeholder="you@email.com"
                              className="mt-1.5 h-11 w-full border border-stone-line bg-ivory px-3 text-sm focus:border-gold-deep focus:outline-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="bm-phone" className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal">
                              Phone <span className="text-muted-soft">(optional)</span>
                            </label>
                            <input
                              id="bm-phone"
                              type="tel"
                              autoComplete="tel"
                              value={answers.phone}
                              onChange={(e) => updateAnswer("phone", e.target.value)}
                              placeholder="For restock texts"
                              className="mt-1.5 h-11 w-full border border-stone-line bg-ivory px-3 text-sm focus:border-gold-deep focus:outline-none"
                            />
                          </div>
                          <p className="text-[0.65rem] leading-relaxed text-muted-soft">
                            By continuing, you agree to receive recommendations and product alerts.
                            Unsubscribe anytime.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {phase === "questions" && (
              <div className="shrink-0 border-t border-stone-line bg-ivory/95 px-5 py-4 backdrop-blur-sm">
                <div className="flex gap-2">
                  {stepIndex > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={goBack}
                      className="shrink-0 px-4"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant={isContact ? "gold" : "primary"}
                    size="md"
                    className="flex-1"
                    disabled={!canContinue()}
                    onClick={goNext}
                  >
                    {isContact ? "See my match" : "Continue"}
                  </Button>
                </div>
                {step?.type === "multi" && answers.hairConcerns.length === 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, hairConcerns: ["unsure"] }));
                      setStepIndex((i) => i + 1);
                    }}
                    className="mt-3 w-full text-center text-xs uppercase tracking-[0.12em] text-muted hover:text-onyx cursor-pointer"
                  >
                    Skip for now
                  </button>
                )}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
