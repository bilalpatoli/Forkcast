import { NextResponse } from "next/server";
import { getErrorResponse } from "@/lib/api/errors";
import { searchRestaurants } from "@/lib/services/restaurants";
import { saveSearchHistory } from "@/lib/services/search-history";
import {
  isValidSearchInput,
  normalizeSearchInput
} from "@/lib/validators/search";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const input = normalizeSearchInput({
      location: searchParams.get("location") ?? "",
      cuisine: searchParams.get("cuisine") ?? "",
      mood: searchParams.get("mood") ?? ""
    });

    if (!isValidSearchInput(input.location, input.cuisine)) {
      return NextResponse.json(
        { error: "location and cuisine are required" },
        { status: 400 }
      );
    }

    const restaurants = await searchRestaurants(input);
    await saveSearchHistory(input);

    return NextResponse.json({ restaurants });
  } catch (error) {
    const response = getErrorResponse(error);

    return NextResponse.json(response.body, { status: response.status });
  }
}
