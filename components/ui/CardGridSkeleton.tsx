export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="aspect-3/2 bg-paper-warm" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-1/3 rounded bg-paper-warm" />
            <div className="h-5 w-3/4 rounded bg-paper-warm" />
            <div className="h-4 w-full rounded bg-paper-warm" />
          </div>
        </div>
      ))}
    </div>
  );
}
