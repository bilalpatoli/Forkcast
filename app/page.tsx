import { SearchForm } from "@/components/search/search-form";

export default function SearchPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-72px)] max-w-3xl flex-col justify-center px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-red-600">
        Forkcast
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
        Find the spot. Know the order.
      </h1>
      <p className="mt-4 text-lg text-neutral-600">
        Search by location, cuisine, and mood to discover nearby restaurants and
        inferred dish recommendations.
      </p>
      <div className="mt-8">
        <SearchForm />
      </div>
    </section>
  );
}

