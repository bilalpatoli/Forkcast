import type { DishRecommendationResult } from "@/types/recommendation";

export function WhatToOrder({
  recommendation
}: {
  recommendation: DishRecommendationResult;
}) {
  return (
    <aside className="h-fit rounded-md border border-neutral-200 p-5">
      <p className="text-sm font-medium text-red-600">Inferred recommendation</p>
      <h2 className="mt-2 text-2xl font-semibold">What to order</h2>
      <p className="mt-3 text-neutral-700">{recommendation.whatToOrder}</p>
      <div className="mt-5 space-y-4">
        {recommendation.topDishes.map((dish) => (
          <div key={dish.name}>
            <h3 className="font-medium">{dish.name}</h3>
            <p className="text-sm text-neutral-600">{dish.reason}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-neutral-500">{recommendation.summary}</p>
    </aside>
  );
}

