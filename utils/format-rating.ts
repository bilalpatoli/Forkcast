export function formatRating(rating: number | null) {
  return rating ? rating.toFixed(1) : "No rating";
}

