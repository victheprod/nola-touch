import { products, getProductsByCollection, type Product } from "@/data/catalog";
import type { BeautyMatchAnswers, BeautyMatchRecommendation } from "./types";

const CATEGORY_MAP: Record<string, { name: string; slug: string }> = {
  wigs: { name: "Wigs & Frontals", slug: "wigs" },
  extensions: { name: "Bundles & Extensions", slug: "extensions" },
  "hair-care": { name: "Hair Care", slug: "hair-care" },
  styling: { name: "Styling", slug: "styling" },
  tools: { name: "Tools & Accessories", slug: "tools" },
  beauty: { name: "Beauty Essentials", slug: "beauty" },
  unsure: { name: "Curated for you", slug: "wigs" },
};

const BUDGET_RANGE: Record<string, string> = {
  "under-75": "$25 – $75",
  "75-150": "$75 – $150",
  "150-300": "$150 – $300",
  "300-plus": "$300 – $500+",
  unsure: "$50 – $250",
};

const TEXTURE_PRODUCT_HINTS: Record<string, string[]> = {
  "kinky-coily": ["Kinky curly units", "Coily clip-ins", "Moisturizing leave-in"],
  curly: ["Curly lace wigs", "Deep wave bundles", "Curl-defining mousse"],
  wavy: ["Body wave wigs", "Loose wave bundles", "Light hold styling"],
  straight: ["Straight bundles", "HD lace straight units", "Heat protectant"],
  yaki: ["Yaki straight textures", "Silk press–friendly units"],
  unsure: ["Versatile body wave", "Everyday-friendly textures"],
};

const CONCERN_TIPS: Record<string, string> = {
  dryness: "Layer a leave-in under oil on damp hair — seal ends before bed.",
  shedding: "Detangle from ends up; sleep on satin and avoid tight tension.",
  growth: "Massage scalp with lightweight oil 2–3× weekly; protect at night.",
  moisture: "LOC or LCO method after wash day; refresh mid-week with mist.",
  scalp: "Clarify monthly; keep lace and part lines clean between installs.",
  edges: "Use alcohol-free edge control; avoid daily tight pulls on hairline.",
  heat: "Always use heat protectant before flat iron or blow-dry.",
  none: "Maintain a simple wash-day rhythm — consistency beats product overload.",
};

const CONCERN_ADDONS: Record<string, string[]> = {
  dryness: ["Leave-in conditioner", "Hair oil", "Satin bonnet"],
  shedding: ["Wide-tooth detangling", "Deep conditioner", "Satin scarf"],
  growth: ["Scalp treatment oil", "Silk pillowcase or bonnet"],
  moisture: ["Deep conditioner", "Leave-in spray"],
  scalp: ["Clarifying shampoo", "Scalp oil", "Edge brush"],
  edges: ["Edge control", "Edge brush", "Wig grip band"],
  heat: ["Heat protectant spray", "Silk press serum"],
  none: ["Satin bonnet", "Edge brush"],
};

function scoreProduct(p: Product, answers: BeautyMatchAnswers): number {
  let score = p.featured ? 2 : 0;
  if (p.badge === "Best Seller") score += 2;
  if (p.rating >= 4.8) score += 1;

  const budget = answers.budget;
  if (budget === "under-75" && p.price <= 75) score += 3;
  if (budget === "75-150" && p.price > 50 && p.price <= 150) score += 3;
  if (budget === "150-300" && p.price > 120 && p.price <= 300) score += 3;
  if (budget === "300-plus" && p.price >= 200) score += 3;
  if (budget === "unsure") score += 1;

  const tex = answers.texture;
  const name = p.name.toLowerCase();
  if (tex === "kinky-coily" && (name.includes("kinky") || name.includes("curly"))) score += 2;
  if (tex === "curly" && (name.includes("wave") || name.includes("curly"))) score += 2;
  if (tex === "wavy" && name.includes("body wave")) score += 2;
  if (tex === "straight" && name.includes("straight")) score += 2;
  if (tex === "yaki" && (name.includes("bob") || name.includes("straight"))) score += 1;

  const exp = answers.experienceLevel;
  if (exp === "beginner" && (name.includes("glueless") || name.includes("clip"))) score += 2;
  if (exp === "expert" && (name.includes("frontal") || name.includes("hd lace"))) score += 1;

  return score;
}

function pickProducts(categorySlug: string, answers: BeautyMatchAnswers, limit = 3): Product[] {
  const pool = getProductsByCollection(categorySlug);
  const scored = [...pool].sort((a, b) => scoreProduct(b, answers) - scoreProduct(a, answers));
  if (scored.length >= limit) return scored.slice(0, limit);
  const fallback = [...products]
    .filter((p) => p.collection !== categorySlug)
    .sort((a, b) => scoreProduct(b, answers) - scoreProduct(a, answers));
  return [...scored, ...fallback].slice(0, limit);
}

function buildWhyItFits(answers: BeautyMatchAnswers, categoryName: string): string {
  const parts: string[] = [];

  if (answers.lookGoal === "natural-everyday") {
    parts.push("You want a believable, everyday look");
  } else if (answers.lookGoal === "glam-event") {
    parts.push("You're aiming for event-ready volume and presence");
  } else if (answers.lookGoal === "protective") {
    parts.push("Protective styling is a priority for your routine");
  } else if (answers.lookGoal === "sleek-pressed") {
    parts.push("A polished, sleek finish matches your goal");
  }

  if (answers.experienceLevel === "beginner") {
    parts.push("we leaned toward lower-fuss options");
  } else if (answers.experienceLevel === "expert") {
    parts.push("you're ready for premium lace and customization");
  }

  if (answers.protectiveStyle.startsWith("yes")) {
    parts.push("with protective wear in mind");
  }

  if (parts.length === 0) {
    return `Based on what you shared, ${categoryName} gives you the best starting point with room to grow your routine.`;
  }

  return `${parts.join(", ")} — so ${categoryName} is a strong match from Nola Touch.`;
}

function productTypeLabels(answers: BeautyMatchAnswers, categorySlug: string): string[] {
  const hints = TEXTURE_PRODUCT_HINTS[answers.texture] ?? TEXTURE_PRODUCT_HINTS.unsure;
  const types = [...hints];

  if (categorySlug === "wigs" && answers.experienceLevel === "beginner") {
    types.unshift("Glueless or beginner-friendly units");
  }
  if (categorySlug === "extensions" && answers.length === "long") {
    types.push("3-bundle sets with frontal");
  }
  if (answers.hairConcerns.includes("edges")) {
    types.push("Edge-friendly install accessories");
  }

  return [...new Set(types)].slice(0, 4);
}

function collectCareTips(concerns: string[]): string[] {
  if (concerns.includes("none") || concerns.length === 0) {
    return [CONCERN_TIPS.none];
  }
  const tips = concerns
    .filter((c) => c !== "none" && CONCERN_TIPS[c])
    .map((c) => CONCERN_TIPS[c]);
  return tips.length ? tips.slice(0, 3) : [CONCERN_TIPS.none];
}

function collectAddOns(concerns: string[], categorySlug: string): string[] {
  const addOns = new Set<string>();
  concerns.forEach((c) => CONCERN_ADDONS[c]?.forEach((a) => addOns.add(a)));
  if (categorySlug === "wigs") addOns.add("Wig grip band");
  if (categorySlug === "extensions") addOns.add("Edge brush");
  addOns.add("Satin bonnet");
  return [...addOns].slice(0, 5);
}

export function buildRecommendation(answers: BeautyMatchAnswers): BeautyMatchRecommendation {
  const goal = answers.shoppingGoal || "unsure";
  const cat = CATEGORY_MAP[goal] ?? CATEGORY_MAP.wigs;
  const picks = pickProducts(cat.slug, answers);
  const productTypes = productTypeLabels(answers, cat.slug);

  return {
    category: cat.name,
    categorySlug: cat.slug,
    productTypes,
    productSlugs: picks.map((p) => p.slug),
    whyItFits: buildWhyItFits(answers, cat.name),
    priceRange: BUDGET_RANGE[answers.budget] ?? BUDGET_RANGE.unsure,
    careTips: collectCareTips(answers.hairConcerns),
    addOns: collectAddOns(answers.hairConcerns, cat.slug),
    shopHref: `/shop/${cat.slug}`,
  };
}

export function getRecommendedProducts(slugs: string[]): Product[] {
  return slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}
