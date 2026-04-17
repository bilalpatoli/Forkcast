import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold">
          Forkcast
        </Link>
        <nav className="flex items-center gap-4 text-sm text-neutral-600">
          <Link href="/favorites">Favorites</Link>
        </nav>
      </div>
    </header>
  );
}

