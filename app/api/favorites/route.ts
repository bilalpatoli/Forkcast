import { NextResponse } from "next/server";
import { getErrorResponse } from "@/lib/api/errors";
import {
  listSavedRestaurants,
  saveRestaurant,
  unsaveRestaurant
} from "@/lib/services/favorites";
import type { RestaurantSearchResult } from "@/types/restaurant";

export async function GET() {
  try {
    const restaurants = await listSavedRestaurants();

    return NextResponse.json({ restaurants });
  } catch (error) {
    const response = getErrorResponse(error);

    return NextResponse.json(response.body, { status: response.status });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isRestaurantSearchResult(body)) {
      return NextResponse.json(
        { error: "A valid restaurant is required" },
        { status: 400 }
      );
    }

    const saved = await saveRestaurant(body);

    return NextResponse.json({ saved });
  } catch (error) {
    const response = getErrorResponse(error);

    return NextResponse.json(response.body, { status: response.status });
  }
}

export async function DELETE(request: Request) {
  try {
    const { placeId } = (await request.json()) as { placeId?: unknown };

    if (typeof placeId !== "string" || placeId.trim().length === 0) {
      return NextResponse.json(
        { error: "placeId is required" },
        { status: 400 }
      );
    }

    await unsaveRestaurant(placeId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const response = getErrorResponse(error);

    return NextResponse.json(response.body, { status: response.status });
  }
}

function isRestaurantSearchResult(
  value: unknown
): value is RestaurantSearchResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const restaurant = value as Partial<RestaurantSearchResult>;

  return (
    typeof restaurant.placeId === "string" &&
    restaurant.placeId.trim().length > 0 &&
    typeof restaurant.name === "string" &&
    restaurant.name.trim().length > 0
  );
}
