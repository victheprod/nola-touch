"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { GuideTrigger } from "@/components/beauty-match/guide-trigger";
import { GuideShell } from "@/components/beauty-match/guide-shell";
import { GuideIntro } from "@/components/beauty-match/guide-intro";
import { GuideLoading } from "@/components/beauty-match/guide-loading";
import { GuideReveal } from "@/components/beauty-match/guide-reveal";
import { ChoiceSelector, MultiChoiceSelector } from "@/components/beauty-match/choice-cards";
import { GuideResults } from "@/components/beauty-match/guide-results";
import { GUIDE_STEPS, TOTAL_PROGRESS_STEPS } from "@/lib/beauty-match/questions";
import { EMPTY_ANSWERS, type BeautyMatchAnswers, type BeautyMatchRecommendation } from "@/lib/beauty-match/types";
import { buildRecommendation } from "@/lib/beauty-match/recommend";
import { easeLux, fadeUp } from "@/lib/motion";
import { Button } from "@/components/ui/button";

type Phase = "intro" | "questions" | "loading" | "reveal" | "results";

export function BeautyMatchGuide() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<BeautyMatchAnswers>(EMPTY_ANSWERS);
  const [recommendation, setRecommendation] = useState<BeautyMatchRecommendation | null>(null);

  const step = GUIDE_STEPS[stepIndex];
  const isLastStep = stepIndex === GUIDE_STEPS.length - 1;

  const reset = useCallback(() => {
    setPhase("intro");
    setStepIndex(0);
    setAnswers(EMPTY_ANSWERS);
    setRecommendation(null);
  }, []);

  const close = () => {
    setOpen(false);
    setTimeout(reset, 450);
  };

  const canContinue = (): boolean => {
    if (!step) return false;
    if (step.type === "multi") return answers.hairConcerns.length > 0;
    const val = answers[step.id];
    return Boolean(val);
  };

  const finishQuestions = () => {
    const rec = buildRecommendation(answers);
    setRecommendation(rec);
    setPhase("loading");
  };

  const goNext = () => {
    if (isLastStep) {
      finishQuestions();
      return;
    }
    setStepIndex((i) => i + 1);
  };

  const goBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const updateAnswer = <K extends keyof BeautyMatchAnswers>(key: K, value: BeautyMatchAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const startGuide = () => {
    setPhase("questions");
    setStepIndex(0);
  };

  return (
    <>
      <AnimatePresence>
        {!open && <GuideTrigger onOpen={() => setOpen(true)} />}
      </AnimatePresence>

      <GuideShell
        open={open}
        onClose={close}
        stepIndex={stepIndex}
        totalSteps={TOTAL_PROGRESS_STEPS}
        phase={phase}
      >
        {phase === "intro" && <GuideIntro onStart={startGuide} onClose={close} />}

        {phase === "loading" && (
          <GuideLoading onDone={() => setPhase("reveal")} />
        )}

        {phase === "reveal" && (
          <GuideReveal onDone={() => setPhase("results")} onClose={close} />
        )}

        {phase === "results" && recommendation && (
          <GuideResults recommendation={recommendation} answers={answers} onRestart={reset} />
        )}

        {phase === "questions" && step && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: easeLux }}
                >
                  <motion.div variants={fadeUp} initial="hidden" animate="visible">
                    <h2 className="font-display text-[1.4rem] leading-snug tracking-tight text-ivory">
                      {step.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-stone">{step.subtitle}</p>
                  </motion.div>

                  <div className="mt-5">
                    {step.type === "single" && (
                      <ChoiceSelector
                        layout={step.layout}
                        stepId={step.id}
                        options={step.options}
                        value={answers[step.id]}
                        onChange={(id) => updateAnswer(step.id, id)}
                        unsureId={step.unsureId}
                      />
                    )}
                    {step.type === "multi" && (
                      <MultiChoiceSelector
                        options={step.options}
                        values={answers.hairConcerns}
                        onChange={(ids) => updateAnswer("hairConcerns", ids)}
                        unsureId={step.unsureId}
                      />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="shrink-0 border-t border-white/10 px-5 py-4">
              <div className="flex gap-2">
                {stepIndex > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={goBack}
                    className="shrink-0 rounded-full border-white/20 bg-transparent px-4 text-ivory hover:bg-white/10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}
                <Button
                  type="button"
                  variant="gold"
                  size="md"
                  className="flex-1 rounded-full"
                  disabled={!canContinue()}
                  onClick={goNext}
                >
                  {isLastStep ? "See my match" : "Next"}
                </Button>
              </div>
              {step.type === "multi" && answers.hairConcerns.length === 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, hairConcerns: ["unsure"] }));
                    finishQuestions();
                  }}
                  className="mt-3 w-full cursor-pointer text-center text-xs text-stone transition-colors hover:text-ivory"
                >
                  Skip for now
                </button>
              )}
            </div>
          </>
        )}
      </GuideShell>
    </>
  );
}
