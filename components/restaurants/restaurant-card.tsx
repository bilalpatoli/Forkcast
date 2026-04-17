import Link from "next/link";
import type { RestaurantSearchResult } from "@/types/restaurant";

export function RestaurantCard({
  restaurant
}: {
  restaurant: RestaurantSearchResult;
}) {
  return (
    <Link
      href={`/restaurants/${restaurant.placeId}`}
      className="block overflow-hidden rounded-md border border-neutral-200 bg-white"
    >
      <div className="aspect-[4/3] bg-neutral-100">
        {restaurant.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.photoUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-semibold">{restaurant.name}</h2>
          {restaurant.rating ? (
            <span className="text-sm font-medium">{restaurant.rating}</span>
          ) : null}
        </div>
        <p className="text-sm text-neutral-600">{restaurant.address}</p>
        <p className="text-sm text-neutral-500">
          {restaurant.reviewCount ?? 0} reviews
        </p>
        <p className="text-sm text-neutral-700">{restaurant.summary}</p>
      </div>
    </Link>
  );
}

