export function buildGooglePhotoUrl(photoReference: string, maxWidth = 900) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return null;
  }

  const params = new URLSearchParams({
    maxwidth: String(maxWidth),
    photo_reference: photoReference,
    key: apiKey
  });

  return `https://maps.googleapis.com/maps/api/place/photo?${params.toString()}`;
}

