import type { RestaurantPhoto, RestaurantReview } from "@/types/restaurant";

type BuildRecommendationPromptInput = {
  restaurantName: string;
  reviews: RestaurantReview[];
  photos: RestaurantPhoto[];
};

export function buildRecommendationPrompt({
  restaurantName,
  reviews,
  photos
}: BuildRecommendationPromptInput) {
  return [
    "You are helping a diner decide what to order.",
    "Infer likely popular dishes only from review text and available food photos.",
    "If uncertain, make a conservative best guess and say the recommendation is inferred.",
    "Do not invent unsupported official menu rankings.",
    `Restaurant: ${restaurantName}`,
    `Reviews: ${JSON.stringify(reviews.slice(0, 8))}`,
    `Photo URLs: ${JSON.stringify(photos.slice(0, 8).map((photo) => photo.url))}`
  ].join("\n\n");
}

