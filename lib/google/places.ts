import type {
  GooglePlaceDetailsResult,
  GooglePlaceSearchResult,
  GooglePlacesResponse
} from "@/types/google";
import type {
  RestaurantDetails,
  RestaurantSearchResult
} from "@/types/restaurant";
import { ApiError } from "@/lib/api/errors";
import { buildGooglePhotoUrl } from "@/lib/google/photos";

export type RestaurantSearchInput = {
  location: string;
  cuisine: string;
  mood?: string;
};

const textSearchEndpoint =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const detailsEndpoint =
  "https://maps.googleapis.com/maps/api/place/details/json";

export async function searchPlaces(
  input: RestaurantSearchInput
): Promise<RestaurantSearchResult[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return [];
  }

  const params = new URLSearchParams({
    key: apiKey,
    query: buildSearchQuery(input),
    type: "restaurant"
  });

  const data = await fetchGooglePlaces<GooglePlaceSearchResult>(
    `${textSearchEndpoint}?${params.toString()}`
  );

  return (data.results ?? [])
    .filter((place) => place.business_status !== "CLOSED_PERMANENTLY")
    .map(mapSearchResult)
    .filter((restaurant): restaurant is RestaurantSearchResult =>
      Boolean(restaurant)
    );
}

export async function getPlaceDetails(
  placeId: string
): Promise<RestaurantDetails> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_PLACES_API_KEY is not configured");
  }

  const params = new URLSearchParams({
    key: apiKey,
    place_id: placeId,
    fields: [
      "place_id",
      "name",
      "formatted_address",
      "formatted_phone_number",
      "website",
      "rating",
      "user_ratings_total",
      "photos",
      "reviews"
    ].join(",")
  });

  const data = await fetchGooglePlaces<GooglePlaceDetailsResult>(
    `${detailsEndpoint}?${params.toString()}`
  );

  if (!data.result) {
    throw new ApiError("Restaurant was not found", 404);
  }

  return mapDetailsResult(data.result, placeId);
}

async function fetchGooglePlaces<T>(
  url: string
): Promise<GooglePlacesResponse<T>> {
  const response = await fetch(url, {
    next: { revalidate: 60 * 60 }
  });

  if (!response.ok) {
    throw new ApiError("Google Places request failed", response.status);
  }

  const data = (await response.json()) as GooglePlacesResponse<T>;

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new ApiError(
      data.error_message ?? `Google Places returned ${data.status}`,
      data.status === "NOT_FOUND" ? 404 : 502
    );
  }

  return data;
}

function buildSearchQuery(input: RestaurantSearchInput) {
  const mood = input.mood ? `${input.mood} ` : "";

  return `${mood}${input.cuisine} restaurants near ${input.location}`;
}

function mapSearchResult(
  place: GooglePlaceSearchResult
): RestaurantSearchResult | null {
  if (!place.place_id || !place.name) {
    return null;
  }

  const photoReference = place.photos?.[0]?.photo_reference;

  return {
    placeId: place.place_id,
    name: place.name,
    address: place.formatted_address ?? "",
    rating: place.rating ?? null,
    reviewCount: place.user_ratings_total ?? null,
    photoUrl: photoReference ? buildGooglePhotoUrl(photoReference) : null,
    summary: buildRestaurantSummary(place)
  };
}

function mapDetailsResult(
  place: GooglePlaceDetailsResult,
  fallbackPlaceId: string
): RestaurantDetails {
  const searchResult = mapSearchResult({
    ...place,
    place_id: place.place_id ?? fallbackPlaceId
  });

  if (!searchResult) {
    throw new ApiError("Restaurant details were incomplete", 502);
  }

  return {
    ...searchResult,
    phoneNumber: place.formatted_phone_number ?? null,
    website: place.website ?? null,
    reviews: (place.reviews ?? []).map((review) => ({
      authorName: review.author_name,
      rating: review.rating ?? null,
      text: review.text,
      relativeTimeDescription: review.relative_time_description
    })),
    photos: (place.photos ?? [])
      .map((photo) => {
        const url = buildGooglePhotoUrl(photo.photo_reference, 1200);

        if (!url) {
          return null;
        }

        return {
          photoReference: photo.photo_reference,
          url,
          width: photo.width,
          height: photo.height
        };
      })
      .filter((photo): photo is NonNullable<typeof photo> => Boolean(photo))
  };
}

function buildRestaurantSummary(place: GooglePlaceSearchResult) {
  const rating = place.rating ? `${place.rating.toFixed(1)} stars` : null;
  const reviewCount = place.user_ratings_total
    ? `${place.user_ratings_total.toLocaleString()} reviews`
    : null;

  return [rating, reviewCount].filter(Boolean).join(" · ");
}
