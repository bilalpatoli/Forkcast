import { PhotoGallery } from "@/components/restaurants/photo-gallery";
import { RestaurantHeader } from "@/components/restaurants/restaurant-header";
import { ReviewSnippets } from "@/components/restaurants/review-snippets";
import { WhatToOrder } from "@/components/restaurants/what-to-order";
import { getRestaurantDetails } from "@/lib/services/restaurants";
import { getDishRecommendations } from "@/lib/openai/recommendations";

type RestaurantPageProps = {
  params: Promise<{
    placeId: string;
  }>;
};

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { placeId } = await params;
  const restaurant = await getRestaurantDetails(placeId);
  const recommendations = await getDishRecommendations({
    restaurantName: restaurant.name,
    reviews: restaurant.reviews,
    photos: restaurant.photos
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <RestaurantHeader restaurant={restaurant} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <PhotoGallery photos={restaurant.photos} />
          <ReviewSnippets reviews={restaurant.reviews} />
        </div>
        <WhatToOrder recommendation={recommendations} />
      </div>
    </section>
  );
}

