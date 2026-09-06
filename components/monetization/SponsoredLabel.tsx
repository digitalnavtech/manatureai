export function SponsoredLabel({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-sand bg-paper-warm px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-muted ${className ?? ""}`}
    >
      Sponsored
    </span>
  );
}
