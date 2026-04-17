import { getPlaceDetails, searchPlaces } from "@/lib/google/places";
import type {
  RestaurantDetails,
  RestaurantSearchResult
} from "@/types/restaurant";

type SearchRestaurantsInput = {
  location: string;
  cuisine: string;
  mood?: string;
};

export async function searchRestaurants(
  input: SearchRestaurantsInput
): Promise<RestaurantSearchResult[]> {
  return searchPlaces(input);
}

export async function getRestaurantDetails(
  placeId: string
): Promise<RestaurantDetails> {
  return getPlaceDetails(placeId);
}

