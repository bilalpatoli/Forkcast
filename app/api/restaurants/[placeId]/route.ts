import { NextResponse } from "next/server";
import { getErrorResponse } from "@/lib/api/errors";
import { getRestaurantDetails } from "@/lib/services/restaurants";

type RouteContext = {
  params: Promise<{
    placeId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { placeId } = await context.params;

    if (!placeId) {
      return NextResponse.json(
        { error: "placeId is required" },
        { status: 400 }
      );
    }

    const restaurant = await getRestaurantDetails(placeId);

    return NextResponse.json({ restaurant });
  } catch (error) {
    const response = getErrorResponse(error);

    return NextResponse.json(response.body, { status: response.status });
  }
}
