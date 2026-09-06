interface AffiliateButtonProps {
  label: string;
  href: string;
  provider: string;
}

/**
 * Generic outbound affiliate CTA. `href` should be a real partner link once
 * an affiliate program is signed up for — until then this points at a
 * clearly-labelled placeholder so nothing looks like a live, working link.
 */
export function AffiliateButton({ label, href, provider }: AffiliateButtonProps) {
  const isPlaceholder = href.includes("#affiliate-placeholder");

  return (
    <a
      href={isPlaceholder ? "#" : href}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener noreferrer sponsored"}
      aria-disabled={isPlaceholder}
      onClick={(e) => {
        if (isPlaceholder) e.preventDefault();
      }}
      className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4 text-sm transition-colors hover:border-forest"
    >
      <span>
        <span className="block font-semibold text-ink">{label}</span>
        <span className="text-xs text-ink-muted">via {provider}{isPlaceholder ? " — link pending" : ""}</span>
      </span>
      <span aria-hidden="true" className="text-forest">→</span>
    </a>
  );
}
