interface AdSlotProps {
  id: string;
  label?: string;
  className?: string;
}

/**
 * Reserved space for a future ad network (e.g. Mediavine, Ezoic, AdSense).
 * Fixed min-height prevents layout shift once a real ad script fills it.
 */
export function AdSlot({ id, label = "Advertisement", className }: AdSlotProps) {
  return (
    <div
      id={id}
      data-ad-slot={id}
      aria-label={label}
      className={`flex min-h-[100px] items-center justify-center rounded-xl border border-dashed border-border bg-paper-warm text-xs uppercase tracking-wide text-ink-muted ${className ?? ""}`}
    >
      {label} slot
    </div>
  );
}
