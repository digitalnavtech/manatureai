import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LeafMark } from "@/components/ui/Icons";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div>
            <Link className="brand brand-light" href="/"><LeafMark className="brand-mark" /><span>Manature<span>AI</span></span></Link>
            <p>Thoughtful guidance for a more connected backyard.</p>
          </div>
          <div><h2>Explore</h2>{siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
          <div><h2>About</h2><Link href="/about">Our approach</Link><Link href="/contact">Contact</Link><Link href="/affiliate-disclosure">Affiliate disclosure</Link></div>
          <div><h2>Legal</h2><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms">Terms</Link></div>
        </div>
        <div className="footer-bottom"><p>As an Amazon Associate I earn from qualifying purchases.</p><p>© {new Date().getFullYear()} ManatureAI</p></div>
      </Container>
    </footer>
  );
}
