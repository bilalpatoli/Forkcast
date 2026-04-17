"use client";

import { ErrorState } from "@/components/states/error-state";

export default function Error() {
  return (
    <ErrorState
      title="Restaurant details could not load"
      description="Try refreshing the page or searching again."
    />
  );
}

