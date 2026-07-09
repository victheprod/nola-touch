export type QuestionLayout = "image-grid" | "vibe-grid" | "swatch-grid" | "pill-list" | "chip-rail";

export type QuestionOption = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
};

export type GuideStep =
  | {
      id: keyof Omit<
        import("./types").BeautyMatchAnswers,
        "hairConcerns" | "name" | "email" | "phone"
      >;
      type: "single";
      title: string;
      subtitle: string;
      layout: QuestionLayout;
      options: QuestionOption[];
      unsureId?: string;
    }
  | {
      id: "hairConcerns";
      type: "multi";
      title: string;
      subtitle: string;
      layout: "chip-rail";
      options: QuestionOption[];
      unsureId?: string;
    };

const UNSURE = { id: "unsure", label: "I'm not sure yet", description: "We'll suggest a flexible starting point" };

export const GUIDE_STEPS: GuideStep[] = [
  {
    id: "shoppingGoal",
    type: "single",
    layout: "image-grid",
    title: "What are you shopping for?",
    subtitle: "Select the category that fits your needs.",
    options: [
      { id: "extensions", label: "Bundles & Weave", description: "Sew-in, quick weave, DIY" },
      { id: "wigs", label: "Wigs & Frontals", description: "Ready-to-wear lace units" },
      { id: "hair-care", label: "Hair Care", description: "Cleanse, treat & protect" },
      { id: "styling", label: "Styling Products", description: "Hold, edges & finish" },
      { id: "tools", label: "Accessories", description: "Bonnets, grips, brushes" },
      { id: "beauty", label: "Beauty Essentials", description: "Lashes, nails & extras" },
    ],
    unsureId: UNSURE.id,
  },
  {
    id: "lookGoal",
    type: "single",
    layout: "vibe-grid",
    title: "What look are you going for?",
    subtitle: "Choose the vibe that speaks to you.",
    options: [
      { id: "natural-everyday", label: "Natural & Effortless", description: "Soft, believable, everyday" },
      { id: "sleek-pressed", label: "Sleek & Polished", description: "Straight, smooth, refined" },
      { id: "glam-event", label: "Glam & Bold", description: "Volume, length, statement" },
      { id: "fresh-color", label: "Soft & Romantic", description: "Dimension, warmth, glow" },
      { id: "protective", label: "Protective & Low Tension", description: "Give your hair a break" },
      UNSURE,
    ],
  },
  {
    id: "texture",
    type: "single",
    layout: "swatch-grid",
    title: "What is your hair texture?",
    subtitle: "Match your natural pattern or the curl you love.",
    options: [
      { id: "straight", label: "Straight" },
      { id: "wavy", label: "Body Wave" },
      { id: "curly", label: "Curly" },
      { id: "kinky-coily", label: "Kinky Curly" },
      { id: "yaki", label: "Yaki / Blown-out" },
      UNSURE,
    ],
  },
  {
    id: "budget",
    type: "single",
    layout: "pill-list",
    title: "What's your budget range?",
    subtitle: "We'll stay in range — no pressure.",
    options: [
      { id: "under-75", label: "Under $75" },
      { id: "75-150", label: "$75 – $150" },
      { id: "150-300", label: "$150 – $300" },
      { id: "300-plus", label: "$300+" },
      UNSURE,
    ],
  },
  {
    id: "length",
    type: "single",
    layout: "pill-list",
    title: "What length are you considering?",
    subtitle: "Inches or general range both work.",
    options: [
      { id: "short", label: "Short (10–14″)" },
      { id: "medium", label: "Medium (16–20″)" },
      { id: "long", label: "Long (22–26″+)" },
      { id: "custom", label: "I'll mix lengths" },
      UNSURE,
    ],
  },
  {
    id: "color",
    type: "single",
    layout: "pill-list",
    title: "Color preference?",
    subtitle: "Natural tones or something bolder.",
    options: [
      { id: "natural-black", label: "Natural black / 1B" },
      { id: "brown", label: "Brown / ombré" },
      { id: "honey-blonde", label: "Honey blonde" },
      { id: "fantasy", label: "Bold or fantasy" },
      UNSURE,
    ],
  },
  {
    id: "occasion",
    type: "single",
    layout: "pill-list",
    title: "Everyday or a specific occasion?",
    subtitle: "Helps us balance durability and finish.",
    options: [
      { id: "everyday", label: "Everyday wear" },
      { id: "special", label: "Special occasion" },
      { id: "travel", label: "Travel / vacation" },
      { id: "workout", label: "Active lifestyle" },
      UNSURE,
    ],
  },
  {
    id: "protectiveStyle",
    type: "single",
    layout: "pill-list",
    title: "Interested in protective styling?",
    subtitle: "Wigs, braids-under, or low-manipulation routines.",
    options: [
      { id: "yes-wig", label: "Yes — wig protective" },
      { id: "yes-braids", label: "Yes — under braids/weave" },
      { id: "sometimes", label: "Sometimes" },
      { id: "no", label: "Not right now" },
      UNSURE,
    ],
  },
  {
    id: "hairConcerns",
    type: "multi",
    layout: "chip-rail",
    title: "Any hair concerns right now?",
    subtitle: "Select all that apply — or skip if none.",
    options: [
      { id: "dryness", label: "Dryness" },
      { id: "shedding", label: "Shedding" },
      { id: "growth", label: "Growth" },
      { id: "moisture", label: "Moisture" },
      { id: "scalp", label: "Scalp care" },
      { id: "edges", label: "Edges" },
      { id: "heat", label: "Heat damage" },
      { id: "none", label: "None right now" },
    ],
    unsureId: UNSURE.id,
  },
  {
    id: "experienceLevel",
    type: "single",
    layout: "pill-list",
    title: "How comfortable are you with installs?",
    subtitle: "We'll match complexity to your skill level.",
    options: [
      { id: "beginner", label: "Beginner" },
      { id: "comfortable", label: "Comfortable" },
      { id: "expert", label: "Expert" },
      UNSURE,
    ],
  },
];

export const TOTAL_PROGRESS_STEPS = GUIDE_STEPS.length;

/** Human labels for match summary screen. */
export function answerLabel(stepId: string, value: string): string {
  const step = GUIDE_STEPS.find((s) => s.id === stepId);
  if (!step) return value;
  const opt = step.options.find((o) => o.id === value);
  return opt?.label ?? value;
}
