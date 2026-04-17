create extension if not exists "pgcrypto";

create table if not exists public.saved_restaurants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  place_id text not null,
  restaurant_name text not null,
  address text,
  rating numeric,
  review_count integer,
  photo_url text,
  summary text,
  created_at timestamptz not null default now(),
  unique (user_id, place_id)
);

create table if not exists public.search_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  location text not null,
  cuisine text not null,
  mood text not null,
  created_at timestamptz not null default now()
);

alter table public.saved_restaurants enable row level security;
alter table public.search_history enable row level security;

create policy "Users can read their saved restaurants"
  on public.saved_restaurants for select
  using (auth.uid() = user_id);

create policy "Users can insert their saved restaurants"
  on public.saved_restaurants for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their saved restaurants"
  on public.saved_restaurants for delete
  using (auth.uid() = user_id);

create policy "Users can read their search history"
  on public.search_history for select
  using (auth.uid() = user_id);

create policy "Users can insert their search history"
  on public.search_history for insert
  with check (auth.uid() = user_id);
