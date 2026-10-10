import { Icon } from "@/components/ui/Icons";

export function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={compact ? "disclosure disclosure-compact" : "disclosure"} aria-label="Affiliate disclosure">
      <strong>Affiliate disclosure</strong>
      <p>This article contains affiliate links. If you purchase through these links, we may earn a commission at no additional cost to you. As an Amazon Associate I earn from qualifying purchases.</p>
    </aside>
  );
}

export function AffiliateButton({ href, children = "Check Price on Amazon" }: { href: string; children?: React.ReactNode }) {
  return <a className="affiliate-button" href={href} target="_blank" rel="sponsored nofollow noopener noreferrer">{children}<Icon name="arrow" /></a>;
}
