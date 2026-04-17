import { NextResponse } from "next/server";
import { getRestaurantDetails } from "@/lib/services/restaurants";

type RouteContext = {
  params: Promise<{
    placeId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { placeId } = await context.params;
  const restaurant = await getRestaurantDetails(placeId);

  return NextResponse.json({ restaurant });
}

