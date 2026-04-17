import { NextResponse } from "next/server";
import {
  listSavedRestaurants,
  saveRestaurant,
  unsaveRestaurant
} from "@/lib/services/favorites";

export async function GET() {
  const restaurants = await listSavedRestaurants();

  return NextResponse.json({ restaurants });
}

export async function POST(request: Request) {
  const body = await request.json();
  const saved = await saveRestaurant(body);

  return NextResponse.json({ saved });
}

export async function DELETE(request: Request) {
  const { placeId } = await request.json();
  await unsaveRestaurant(placeId);

  return NextResponse.json({ ok: true });
}

