"use client";

import { useState } from "react";
import type { RestaurantSearchResult } from "@/types/restaurant";

export function useFavoriteRestaurant(restaurant: RestaurantSearchResult) {
  const [isSaved, setIsSaved] = useState(false);

  async function toggleFavorite() {
    const method = isSaved ? "DELETE" : "POST";
    const body = isSaved
      ? { placeId: restaurant.placeId }
      : restaurant;

    await fetch("/api/favorites", {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    setIsSaved((current) => !current);
  }

  return {
    isSaved,
    toggleFavorite
  };
}

