interface MapPlaceholderProps {
  label: string;
  mapsQuery?: string;
}

export function MapPlaceholder({ label, mapsQuery }: MapPlaceholderProps) {
  const href = mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
    : undefined;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-paper-warm">
      <div className="flex aspect-16/9 flex-col items-center justify-center gap-2 px-6 text-center">
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-moss">
          <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="max-w-xs text-xs text-ink-muted">
          Interactive map coming soon. Use the link below to open this location in Google Maps.
        </p>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-forest underline">
            Open in Google Maps
          </a>
        ) : null}
      </div>
    </div>
  );
}
