import type { RestaurantSearchResult } from "@/types/restaurant";

export async function listSavedRestaurants(): Promise<RestaurantSearchResult[]> {
  // TODO: Read saved_restaurants for the current Supabase user.
  return [];
}

export async function saveRestaurant(restaurant: RestaurantSearchResult) {
  // TODO: Insert a saved restaurant for the current Supabase user.
  return restaurant;
}

export async function unsaveRestaurant(placeId: string) {
  // TODO: Delete a saved restaurant for the current Supabase user.
  void placeId;
}

