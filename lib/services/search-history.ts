import { ApiError } from "@/lib/api/errors";
import { getCurrentUser } from "@/lib/supabase/auth";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { normalizeSearchInput } from "@/lib/validators/search";

type SearchHistoryInput = {
  location: string;
  cuisine: string;
  mood?: string;
};

export async function saveSearchHistory(input: SearchHistoryInput) {
  if (!isSupabaseConfigured()) {
    return;
  }

  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const normalized = normalizeSearchInput(input);
  const supabase = await createClient();
  const { error } = await supabase.from("search_history").insert({
    user_id: user.id,
    location: normalized.location,
    cuisine: normalized.cuisine,
    mood: normalized.mood
  });

  if (error) {
    throw new ApiError(error.message, 500);
  }
}
