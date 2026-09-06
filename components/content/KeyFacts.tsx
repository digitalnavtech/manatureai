import type { KeyFact } from "@/types/content";

export function KeyFacts({ facts, title = "Key facts" }: { facts: KeyFact[]; title?: string }) {
  if (facts.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-paper-warm p-6">
      <h2 className="font-display text-lg text-ink">{title}</h2>
      <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label} className="border-t border-border/70 pt-3 first:border-t-0 first:pt-0 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(-n+2)]:pt-0">
            <dt className="text-xs font-semibold uppercase tracking-wide text-moss">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
