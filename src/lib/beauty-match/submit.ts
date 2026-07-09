import type {
  BeautyMatchAnswers,
  BeautyMatchRecommendation,
  BeautyMatchSubmission,
  IntegrationTarget,
  SubmitResult,
} from "./types";
import { buildRecommendation } from "./recommend";
import { getRecommendedProducts } from "./recommend";

/** Shape answers + recommendation into a CRM-ready payload. */
export function toSubmission(
  answers: BeautyMatchAnswers,
  recommendation: BeautyMatchRecommendation,
): BeautyMatchSubmission {
  const products = getRecommendedProducts(recommendation.productSlugs);

  return {
    name: answers.name.trim(),
    email: answers.email.trim(),
    phone: answers.phone.trim() || undefined,
    shoppingGoal: answers.shoppingGoal,
    categoryInterest: answers.shoppingGoal,
    texturePreference: answers.texture,
    lengthPreference: answers.length,
    colorPreference: answers.color,
    budget: answers.budget,
    hairConcerns: answers.hairConcerns,
    experienceLevel: answers.experienceLevel,
    lookGoal: answers.lookGoal,
    occasion: answers.occasion,
    protectiveStyle: answers.protectiveStyle,
    recommendedCategory: recommendation.category,
    recommendedProducts: products.map((p) => p.name),
    recommendedProductSlugs: recommendation.productSlugs,
    priceRange: recommendation.priceRange,
    careTips: recommendation.careTips,
    addOns: recommendation.addOns,
    shopHref: recommendation.shopHref,
    createdAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Integration adapters — wire these when backends are ready.
// ---------------------------------------------------------------------------

async function saveToSupabase(_payload: BeautyMatchSubmission): Promise<SubmitResult> {
  // await supabase.from('beauty_match_submissions').insert(payload)
  return { ok: false, error: "Supabase adapter not configured" };
}

async function syncShopifyTags(_payload: BeautyMatchSubmission): Promise<SubmitResult> {
  // Map categoryInterest, texturePreference → customer tags via Admin API
  return { ok: false, error: "Shopify tags adapter not configured" };
}

async function syncKlaviyo(_payload: BeautyMatchSubmission): Promise<SubmitResult> {
  // POST /api/profile-subscriptions with custom properties
  return { ok: false, error: "Klaviyo adapter not configured" };
}

async function syncMailchimp(_payload: BeautyMatchSubmission): Promise<SubmitResult> {
  return { ok: false, error: "Mailchimp adapter not configured" };
}

async function syncCrm(_payload: BeautyMatchSubmission): Promise<SubmitResult> {
  return { ok: false, error: "CRM adapter not configured" };
}

const ADAPTERS: Record<IntegrationTarget, (p: BeautyMatchSubmission) => Promise<SubmitResult>> = {
  supabase: saveToSupabase,
  shopify_tags: syncShopifyTags,
  klaviyo: syncKlaviyo,
  mailchimp: syncMailchimp,
  crm: syncCrm,
};

/** Local placeholder persistence until a backend is connected. */
function saveLocally(payload: BeautyMatchSubmission): string {
  const id = `bm_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  try {
    const key = "nola_beauty_match_submissions";
    const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as BeautyMatchSubmission[];
    existing.push({ ...payload });
    localStorage.setItem(key, JSON.stringify(existing.slice(-20)));
  } catch {
    // SSR or storage blocked — console only
  }
  return id;
}

export type SubmitOptions = {
  integrations?: IntegrationTarget[];
};

/**
 * Submit a Beauty Match Guide completion.
 * Logs to console, stores locally, and optionally fans out to configured integrations.
 */
export async function submitBeautyMatch(
  answers: BeautyMatchAnswers,
  options: SubmitOptions = {},
): Promise<{ submission: BeautyMatchSubmission; result: SubmitResult }> {
  const recommendation = buildRecommendation(answers);
  const submission = toSubmission(answers, recommendation);

  const id = saveLocally(submission);

  if (typeof window !== "undefined") {
    console.info("[Beauty Match Guide] Submission", submission);
  }

  const integrations = options.integrations ?? [];
  for (const target of integrations) {
    const adapter = ADAPTERS[target];
    if (adapter) await adapter(submission);
  }

  return {
    submission,
    result: { ok: true, id },
  };
}
