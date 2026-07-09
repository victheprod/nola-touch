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
      options: QuestionOption[];
      unsureId?: string;
    }
  | {
      id: "hairConcerns";
      type: "multi";
      title: string;
      subtitle: string;
      options: QuestionOption[];
      unsureId?: string;
    }
  | {
      id: "contact";
      type: "contact";
      title: string;
      subtitle: string;
    };

const UNSURE = { id: "unsure", label: "I'm not sure", description: "We'll suggest a flexible starting point" };

export const GUIDE_STEPS: GuideStep[] = [
  {
    id: "shoppingGoal",
    type: "single",
    title: "What are you shopping for today?",
    subtitle: "We'll tailor everything from here.",
    options: [
      { id: "wigs", label: "Wig or frontal", description: "Ready-to-wear units & lace" },
      { id: "extensions", label: "Bundles & extensions", description: "Sew-in, quick weave, or DIY" },
      { id: "hair-care", label: "Hair care", description: "Cleanse, treat & protect" },
      { id: "styling", label: "Styling products", description: "Edges, hold & finish" },
      { id: "tools", label: "Accessories & tools", description: "Bonnets, grips, brushes" },
      { id: "beauty", label: "Beauty essentials", description: "Lashes, nails & extras" },
    ],
    unsureId: UNSURE.id,
  },
  {
    id: "lookGoal",
    type: "single",
    title: "What look are you going for?",
    subtitle: "Think vibe, not perfection.",
    options: [
      { id: "natural-everyday", label: "Natural everyday", description: "Soft, believable, low-maintenance" },
      { id: "glam-event", label: "Glam or event-ready", description: "Volume, length, statement" },
      { id: "protective", label: "Protective & low tension", description: "Give your hair a break" },
      { id: "fresh-color", label: "Color or highlights", description: "Dimension without damage" },
      { id: "sleek-pressed", label: "Sleek & polished", description: "Straight, smooth, refined" },
      UNSURE,
    ],
  },
  {
    id: "texture",
    type: "single",
    title: "Which texture feels most like you?",
    subtitle: "Match your natural pattern or the curl you love.",
    options: [
      { id: "kinky-coily", label: "Kinky / coily", description: "4A–4C pattern" },
      { id: "curly", label: "Curly", description: "Defined S-curls & ringlets" },
      { id: "wavy", label: "Wavy", description: "Loose body wave" },
      { id: "straight", label: "Straight", description: "Silky, bone-straight" },
      { id: "yaki", label: "Yaki / blown-out", description: "Relaxed-texture straight" },
      UNSURE,
    ],
  },
  {
    id: "length",
    type: "single",
    title: "What length are you considering?",
    subtitle: "Inches or general range both work.",
    options: [
      { id: "short", label: "Short (10–14″)", description: "Bob, collarbone, easy styling" },
      { id: "medium", label: "Medium (16–20″)", description: "Versatile everyday length" },
      { id: "long", label: "Long (22–26″+)", description: "Drama, layers, glam" },
      { id: "custom", label: "I'll mix lengths", description: "Bundles, layers, or custom cut" },
      UNSURE,
    ],
  },
  {
    id: "color",
    type: "single",
    title: "Color preference?",
    subtitle: "Natural tones or something bolder.",
    options: [
      { id: "natural-black", label: "Natural black / 1B", description: "Classic, seamless blend" },
      { id: "brown", label: "Brown / ombré", description: "Warm dimension" },
      { id: "honey-blonde", label: "Honey blonde", description: "Sun-kissed highlights" },
      { id: "fantasy", label: "Bold or fantasy", description: "Burgundy, copper, custom" },
      UNSURE,
    ],
  },
  {
    id: "budget",
    type: "single",
    title: "What's your comfortable budget?",
    subtitle: "We'll stay in range — no pressure.",
    options: [
      { id: "under-75", label: "Under $75", description: "Essentials & restocks" },
      { id: "75-150", label: "$75 – $150", description: "Quality mid-range picks" },
      { id: "150-300", label: "$150 – $300", description: "Premium units & bundles" },
      { id: "300-plus", label: "$300+", description: "Investment pieces & full looks" },
      UNSURE,
    ],
  },
  {
    id: "occasion",
    type: "single",
    title: "Everyday or a specific occasion?",
    subtitle: "Helps us balance durability and finish.",
    options: [
      { id: "everyday", label: "Everyday wear", description: "Work, school, errands" },
      { id: "special", label: "Special occasion", description: "Wedding, photos, event" },
      { id: "travel", label: "Travel / vacation", description: "Low fuss, photo-ready" },
      { id: "workout", label: "Active lifestyle", description: "Sweat-friendly, secure" },
      UNSURE,
    ],
  },
  {
    id: "protectiveStyle",
    type: "single",
    title: "Interested in protective styling?",
    subtitle: "Wigs, braids-under, or low-manipulation routines.",
    options: [
      { id: "yes-wig", label: "Yes — wig protective", description: "Cover & protect natural hair" },
      { id: "yes-braids", label: "Yes — under braids/weave", description: "Extensions with tuck-away" },
      { id: "sometimes", label: "Sometimes", description: "Rotate between looks" },
      { id: "no", label: "Not right now", description: "Focus on care or daily styling" },
      UNSURE,
    ],
  },
  {
    id: "hairConcerns",
    type: "multi",
    title: "Any hair concerns right now?",
    subtitle: "Select all that apply — or skip if none.",
    options: [
      { id: "dryness", label: "Dryness" },
      { id: "shedding", label: "Shedding / breakage" },
      { id: "growth", label: "Growth & thickness" },
      { id: "moisture", label: "Moisture retention" },
      { id: "scalp", label: "Scalp care" },
      { id: "edges", label: "Edge control" },
      { id: "heat", label: "Heat protection" },
      { id: "none", label: "None right now" },
    ],
    unsureId: UNSURE.id,
  },
  {
    id: "experienceLevel",
    type: "single",
    title: "How comfortable are you with installs & styling?",
    subtitle: "We'll match complexity to your skill level.",
    options: [
      { id: "beginner", label: "Beginner", description: "Glueless, clip-ins, simple routines" },
      { id: "comfortable", label: "Comfortable", description: "Some install experience" },
      { id: "expert", label: "Expert", description: "Custom cuts, lace tint, advanced styling" },
      UNSURE,
    ],
  },
  {
    id: "contact",
    type: "contact",
    title: "Almost done — where should we send your match?",
    subtitle: "Restock alerts, texture drops & personalized picks. No spam.",
  },
];

export const TOTAL_PROGRESS_STEPS = GUIDE_STEPS.length;
