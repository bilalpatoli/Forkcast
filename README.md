# Forkcast

Forkcast helps users decide where to eat and what to order. Users search by location, cuisine, and mood, then get nearby restaurant results and inferred dish recommendations based on reviews and photos.

## MVP

- Search by location, cuisine, and mood
- Restaurant results list
- Restaurant cards with name, rating, review count, address, and photo
- Restaurant detail page
- Review snippets
- Photo gallery
- AI-generated "what to order" recommendations
- Optional saved favorites with Supabase auth

## Structure

```txt
app/          Next.js App Router pages and API routes
components/   Reusable UI components
lib/          Server integrations, services, validators, and app logic
hooks/        Client-side React hooks
utils/        Small shared utility functions
types/        Shared TypeScript types
supabase/     Database migrations and Supabase project notes
public/       Static assets
```

## Environment

Copy `.env.example` to `.env.local` and fill in the values.

