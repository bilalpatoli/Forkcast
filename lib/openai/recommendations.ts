import { buildRecommendationPrompt } from "@/lib/openai/prompts";
import type { DishRecommendationResult } from "@/types/recommendation";
import type { RestaurantPhoto, RestaurantReview } from "@/types/restaurant";

type GetDishRecommendationsInput = {
  restaurantName: string;
  reviews: RestaurantReview[];
  photos: RestaurantPhoto[];
};

const fallbackRecommendation: DishRecommendationResult = {
  topDishes: [],
  whatToOrder:
    "Recommendations are not available yet. Check the reviews for repeated dish mentions.",
  summary: "Forkcast needs review and photo evidence before suggesting dishes."
};

export async function getDishRecommendations(
  input: GetDishRecommendationsInput
): Promise<DishRecommendationResult> {
  if (!process.env.OPENAI_API_KEY) {
    return fallbackRecommendation;
  }

  const prompt = buildRecommendationPrompt(input);

  // TODO: Call the OpenAI API and validate the structured JSON response.
  void prompt;
  return fallbackRecommendation;
}

