import type { RestaurantSearchResult } from "@/types/restaurant";
import { ApiError } from "@/lib/api/errors";
import { getCurrentUser } from "@/lib/supabase/auth";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { SavedRestaurantRow } from "@/types/database";

export async function listSavedRestaurants(): Promise<RestaurantSearchResult[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("saved_restaurants")
    .select(
      "id,user_id,place_id,restaurant_name,address,rating,review_count,photo_url,summary,created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(error.message, 500);
  }

  return ((data ?? []) as SavedRestaurantRow[]).map(mapSavedRestaurant);
}

export async function saveRestaurant(restaurant: RestaurantSearchResult) {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.from("saved_restaurants").upsert(
    {
      user_id: user.id,
      place_id: restaurant.placeId,
      restaurant_name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
      review_count: restaurant.reviewCount,
      photo_url: restaurant.photoUrl,
      summary: restaurant.summary
    },
    { onConflict: "user_id,place_id" }
  );

  if (error) {
    throw new ApiError(error.message, 500);
  }

  return restaurant;
}

export async function unsaveRestaurant(placeId: string) {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from("saved_restaurants")
    .delete()
    .eq("user_id", user.id)
    .eq("place_id", placeId);

  if (error) {
    throw new ApiError(error.message, 500);
  }
}

async function requireUser() {
  if (!isSupabaseConfigured()) {
    throw new ApiError("Supabase is not configured", 503);
  }

  const user = await getCurrentUser();

  if (!user) {
    throw new ApiError("You must be signed in", 401);
  }

  return user;
}

function mapSavedRestaurant(row: SavedRestaurantRow): RestaurantSearchResult {
  return {
    placeId: row.place_id,
    name: row.restaurant_name,
    address: row.address ?? "",
    rating: row.rating ?? null,
    reviewCount: row.review_count ?? null,
    photoUrl: row.photo_url ?? null,
    summary: row.summary ?? ""
  };
}
