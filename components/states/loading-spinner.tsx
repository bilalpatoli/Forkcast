export function LoadingSpinner({ label }: { label: string }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center px-6">
      <p className="text-sm text-neutral-500">{label}</p>
    </div>
  );
}

