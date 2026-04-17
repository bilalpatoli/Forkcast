import type { RestaurantReview } from "@/types/restaurant";

export function ReviewSnippets({ reviews }: { reviews: RestaurantReview[] }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">Review snippets</h2>
      <div className="mt-4 space-y-3">
        {reviews.map((review, index) => (
          <article key={`${review.authorName}-${index}`} className="rounded-md border border-neutral-200 p-4">
            <p className="text-sm text-neutral-500">
              {review.authorName} · {review.rating ?? "No rating"}
            </p>
            <p className="mt-2 text-neutral-700">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

