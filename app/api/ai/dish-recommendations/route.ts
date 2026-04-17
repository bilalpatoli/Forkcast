import { NextResponse } from "next/server";
import { getDishRecommendations } from "@/lib/openai/recommendations";

export async function POST(request: Request) {
  const body = await request.json();
  const recommendation = await getDishRecommendations(body);

  return NextResponse.json({ recommendation });
}

