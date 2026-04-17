import type { DishRecommendationResult } from "@/types/recommendation";

export function isDishRecommendationResult(
  value: unknown
): value is DishRecommendationResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const recommendation = value as Partial<DishRecommendationResult>;

  return (
    Array.isArray(recommendation.topDishes) &&
    recommendation.topDishes.every(
      (dish) =>
        dish &&
        typeof dish === "object" &&
        "name" in dish &&
        typeof dish.name === "string" &&
        "reason" in dish &&
        typeof dish.reason === "string"
    ) &&
    typeof recommendation.whatToOrder === "string" &&
    typeof recommendation.summary === "string"
  );
}
