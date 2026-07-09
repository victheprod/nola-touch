export type {
  BeautyMatchAnswers,
  BeautyMatchSubmission,
  BeautyMatchRecommendation,
  IntegrationTarget,
  SubmitResult,
} from "./types";
export { EMPTY_ANSWERS } from "./types";
export { GUIDE_STEPS, TOTAL_PROGRESS_STEPS } from "./questions";
export { buildRecommendation, getRecommendedProducts } from "./recommend";
export { submitBeautyMatch, toSubmission } from "./submit";
