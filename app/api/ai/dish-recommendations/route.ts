import { NextResponse } from "next/server";
import { getErrorResponse } from "@/lib/api/errors";
import { getDishRecommendations } from "@/lib/openai/recommendations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const recommendation = await getDishRecommendations(body);

    return NextResponse.json({ recommendation });
  } catch (error) {
    const response = getErrorResponse(error);

    return NextResponse.json(response.body, { status: response.status });
  }
}
