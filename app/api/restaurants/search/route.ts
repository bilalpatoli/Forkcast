import { NextResponse } from "next/server";
import { searchRestaurants } from "@/lib/services/restaurants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location") ?? "";
  const cuisine = searchParams.get("cuisine") ?? "";
  const mood = searchParams.get("mood") ?? "";

  if (!location || !cuisine) {
    return NextResponse.json(
      { error: "location and cuisine are required" },
      { status: 400 }
    );
  }

  const restaurants = await searchRestaurants({ location, cuisine, mood });

  return NextResponse.json({ restaurants });
}

