export function isValidSearchInput(location: string, cuisine: string) {
  return location.trim().length > 0 && cuisine.trim().length > 0;
}

