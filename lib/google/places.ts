import type {
  RestaurantDetails,
  RestaurantSearchResult
} from "@/types/restaurant";

export type RestaurantSearchInput = {
  location: string;
  cuisine: string;
  mood?: string;
};

export async function searchPlaces(
  input: RestaurantSearchInput
): Promise<RestaurantSearchResult[]> {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    return [];
  }

  // TODO: Call Google Places Text Search and map results to RestaurantSearchResult.
  void input;
  return [];
}

export async function getPlaceDetails(
  placeId: string
): Promise<RestaurantDetails> {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    throw new Error("GOOGLE_PLACES_API_KEY is not configured");
  }

  // TODO: Call Google Places Details and Photos APIs.
  return {
    placeId,
    name: "Restaurant",
    address: "",
    rating: null,
    reviewCount: null,
    photoUrl: null,
    summary: "",
    reviews: [],
    photos: []
  };
}

