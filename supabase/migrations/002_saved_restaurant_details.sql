alter table public.saved_restaurants
  add column if not exists address text,
  add column if not exists rating numeric,
  add column if not exists review_count integer,
  add column if not exists photo_url text,
  add column if not exists summary text;
