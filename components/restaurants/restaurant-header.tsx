import type { RestaurantDetails } from "@/types/restaurant";

export function RestaurantHeader({ restaurant }: { restaurant: RestaurantDetails }) {
  return (
    <div>
      <p className="text-sm text-neutral-500">{restaurant.address}</p>
      <h1 className="mt-2 text-4xl font-semibold">{restaurant.name}</h1>
      <p className="mt-3 text-neutral-600">
        {restaurant.rating ?? "No rating"} rating ·{" "}
        {restaurant.reviewCount ?? 0} reviews
      </p>
    </div>
  );
}

