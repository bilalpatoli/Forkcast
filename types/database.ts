export type SavedRestaurantRow = {
  id: string;
  user_id: string;
  place_id: string;
  restaurant_name: string;
  address: string | null;
  rating: number | null;
  review_count: number | null;
  photo_url: string | null;
  summary: string | null;
  created_at: string;
};

export type SearchHistoryRow = {
  id: string;
  user_id: string | null;
  location: string;
  cuisine: string;
  mood: string;
  created_at: string;
};
