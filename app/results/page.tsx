import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { EmptyState } from "@/components/states/empty-state";
import { searchRestaurants } from "@/lib/services/restaurants";

type ResultsPageProps = {
  searchParams: Promise<{
    location?: string;
    cuisine?: string;
    mood?: string;
  }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const location = params.location ?? "";
  const cuisine = params.cuisine ?? "";
  const mood = params.mood ?? "";

  if (!location || !cuisine) {
    return (
      <EmptyState
        title="Start with a search"
        description="Add a location and cuisine so Forkcast can find nearby restaurants."
      />
    );
  }

  const restaurants = await searchRestaurants({ location, cuisine, mood });

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm text-neutral-500">
          {cuisine} near {location}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Restaurant matches</h1>
      </div>
      <RestaurantGrid restaurants={restaurants} />
    </section>
  );
}

