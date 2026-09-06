import Link from "next/link";

export function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-ink-muted">
        This article may contain affiliate links. Read our{" "}
        <Link href="/affiliate-disclosure" className="underline hover:text-forest">
          affiliate disclosure
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-sand bg-paper-warm p-5 text-sm leading-relaxed text-ink-muted">
      <p>
        <strong className="text-ink">Affiliate disclosure:</strong> some links in this guide are
        affiliate links. If you book or buy through them, Manature AI may earn a small commission
        at no extra cost to you. We only recommend products and experiences we believe are useful
        for travelers. Read the full{" "}
        <Link href="/affiliate-disclosure" className="font-medium text-forest underline">
          affiliate disclosure
        </Link>
        .
      </p>
    </div>
  );
}
