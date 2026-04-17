"use client";

import { useFavoriteRestaurant } from "@/hooks/use-favorite-restaurant";
import type { RestaurantSearchResult } from "@/types/restaurant";

export function FavoriteButton({
  restaurant
}: {
  restaurant: RestaurantSearchResult;
}) {
  const { isSaved, toggleFavorite } = useFavoriteRestaurant(restaurant);

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
    >
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}

