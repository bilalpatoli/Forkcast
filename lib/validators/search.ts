export function isValidSearchInput(location: string, cuisine: string) {
  return location.trim().length > 0 && cuisine.trim().length > 0;
}

export function normalizeSearchInput(input: {
  location: string;
  cuisine: string;
  mood?: string;
}) {
  return {
    location: input.location.trim(),
    cuisine: input.cuisine.trim(),
    mood: input.mood?.trim() ?? ""
  };
}
