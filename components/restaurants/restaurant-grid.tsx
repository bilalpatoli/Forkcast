import { RestaurantCard } from "@/components/restaurants/restaurant-card";
import type { RestaurantSearchResult } from "@/types/restaurant";

export function RestaurantGrid({
  restaurants
}: {
  restaurants: RestaurantSearchResult[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.placeId} restaurant={restaurant} />
      ))}
    </div>
  );
}

