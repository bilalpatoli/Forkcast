"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function SearchForm() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mood, setMood] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams({
      location,
      cuisine,
      mood
    });

    router.push(`/results?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Location"
        className="rounded-md border border-neutral-300 px-3 py-2"
        required
      />
      <input
        value={cuisine}
        onChange={(event) => setCuisine(event.target.value)}
        placeholder="Cuisine"
        className="rounded-md border border-neutral-300 px-3 py-2"
        required
      />
      <input
        value={mood}
        onChange={(event) => setMood(event.target.value)}
        placeholder="Mood"
        className="rounded-md border border-neutral-300 px-3 py-2"
      />
      <button className="rounded-md bg-red-600 px-4 py-2 font-medium text-white">
        Search
      </button>
    </form>
  );
}

