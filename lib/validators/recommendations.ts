import type { DishRecommendationResult } from "@/types/recommendation";

export function isDishRecommendationResult(
  value: unknown
): value is DishRecommendationResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "topDishes" in value && "whatToOrder" in value && "summary" in value;
}

