import type { DishRecommendationResult } from "@/types/recommendation";
import type {
  RestaurantDetails,
  RestaurantSearchResult
} from "@/types/restaurant";

export type RestaurantSearchResponse = {
  restaurants: RestaurantSearchResult[];
};

export type RestaurantDetailsResponse = {
  restaurant: RestaurantDetails;
};

export type DishRecommendationResponse = {
  recommendation: DishRecommendationResult;
};

