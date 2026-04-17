import type { RestaurantPhoto } from "@/types/restaurant";

export function PhotoGallery({ photos }: { photos: RestaurantPhoto[] }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">Photos</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {photos.map((photo) => (
          <div key={photo.photoReference} className="aspect-square overflow-hidden rounded-md bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

