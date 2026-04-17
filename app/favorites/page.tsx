import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { EmptyState } from "@/components/states/empty-state";
import { listSavedRestaurants } from "@/lib/services/favorites";

export default async function FavoritesPage() {
  const restaurants = await listSavedRestaurants();

  if (restaurants.length === 0) {
    return (
      <EmptyState
        title="No saved restaurants yet"
        description="Save restaurants you want to remember for later."
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-semibold">Saved restaurants</h1>
      <RestaurantGrid restaurants={restaurants} />
    </section>
  );
}

