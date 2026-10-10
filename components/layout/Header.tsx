import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { LeafMark } from "@/components/ui/Icons";

export function Header() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link className="brand" href="/" aria-label="ManatureAI home">
          <LeafMark className="brand-mark" />
          <span>Manature<span>AI</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation"><span /><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link href="/about">About</Link>
          </nav>
        </details>
      </Container>
    </header>
  );
}
