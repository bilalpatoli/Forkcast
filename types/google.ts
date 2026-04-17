export type GooglePlacePhoto = {
  photo_reference: string;
  width?: number;
  height?: number;
};

export type GooglePlaceReview = {
  author_name: string;
  rating?: number;
  text: string;
  relative_time_description?: string;
};

export type GooglePlaceSearchResult = {
  place_id?: string;
  name?: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  photos?: GooglePlacePhoto[];
  business_status?: string;
};

export type GooglePlaceDetailsResult = GooglePlaceSearchResult & {
  formatted_phone_number?: string;
  website?: string;
  reviews?: GooglePlaceReview[];
};

export type GooglePlacesResponse<T> = {
  status: string;
  error_message?: string;
  results?: T[];
  result?: T;
};
