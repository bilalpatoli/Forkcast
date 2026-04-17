type ErrorStateProps = {
  title: string;
  description: string;
};

export function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <section className="mx-auto max-w-lg px-6 py-20 text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-3 text-neutral-600">{description}</p>
    </section>
  );
}

