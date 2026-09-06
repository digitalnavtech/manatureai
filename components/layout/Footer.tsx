import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS, LEGAL_LINKS } from "@/lib/nav";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, SITE_NAME } from "@/lib/seo/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-paper-warm">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-xl font-semibold text-forest">{SITE_NAME}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
            Practical Finland travel guides, hidden places and unforgettable nature
            experiences from Helsinki to Lapland — written by people who actually go there.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-light"
          >
            Follow {INSTAGRAM_HANDLE} on Instagram
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-forest">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Legal</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-forest">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {SITE_NAME}. All rights reserved.</p>
          <p>Some links on this site are affiliate links. See our affiliate disclosure.</p>
        </Container>
      </div>
    </footer>
  );
}
