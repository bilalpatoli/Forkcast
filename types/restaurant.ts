export type RestaurantSearchResult = {
  placeId: string;
  name: string;
  address: string;
  rating: number | null;
  reviewCount: number | null;
  photoUrl: string | null;
  summary: string;
};

export type RestaurantDetails = RestaurantSearchResult & {
  phoneNumber?: string | null;
  website?: string | null;
  reviews: RestaurantReview[];
  photos: RestaurantPhoto[];
};

export type RestaurantReview = {
  authorName: string;
  rating: number | null;
  text: string;
  relativeTimeDescription?: string;
};

export type RestaurantPhoto = {
  photoReference: string;
  url: string;
  width?: number;
  height?: number;
};

