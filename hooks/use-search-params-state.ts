"use client";

import { useSearchParams } from "next/navigation";

export function useSearchParamsState() {
  const searchParams = useSearchParams();

  return {
    location: searchParams.get("location") ?? "",
    cuisine: searchParams.get("cuisine") ?? "",
    mood: searchParams.get("mood") ?? ""
  };
}

