/** Answers collected step-by-step in the Beauty Match Guide. */
export type BeautyMatchAnswers = {
  shoppingGoal: string;
  lookGoal: string;
  texture: string;
  length: string;
  color: string;
  budget: string;
  occasion: string;
  protectiveStyle: string;
  hairConcerns: string[];
  experienceLevel: string;
  name: string;
  email: string;
  phone: string;
};

export const EMPTY_ANSWERS: BeautyMatchAnswers = {
  shoppingGoal: "",
  lookGoal: "",
  texture: "",
  length: "",
  color: "",
  budget: "",
  occasion: "",
  protectiveStyle: "",
  hairConcerns: [],
  experienceLevel: "",
  name: "",
  email: "",
  phone: "",
};

/** Persisted submission — ready for Supabase, Klaviyo, Shopify tags, CRM. */
export type BeautyMatchSubmission = {
  name: string;
  email: string;
  phone?: string;
  shoppingGoal: string;
  categoryInterest: string;
  texturePreference: string;
  lengthPreference: string;
  colorPreference: string;
  budget: string;
  hairConcerns: string[];
  experienceLevel: string;
  lookGoal: string;
  occasion: string;
  protectiveStyle: string;
  recommendedCategory: string;
  recommendedProducts: string[];
  recommendedProductSlugs: string[];
  priceRange: string;
  careTips: string[];
  addOns: string[];
  shopHref: string;
  createdAt: string;
};

export type BeautyMatchRecommendation = {
  category: string;
  categorySlug: string;
  productTypes: string[];
  productSlugs: string[];
  whyItFits: string;
  priceRange: string;
  careTips: string[];
  addOns: string[];
  shopHref: string;
};

export type IntegrationTarget =
  | "supabase"
  | "shopify_tags"
  | "klaviyo"
  | "mailchimp"
  | "crm";

export type SubmitResult = {
  ok: boolean;
  id?: string;
  error?: string;
};
