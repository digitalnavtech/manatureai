import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "@/lib/nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <Container className="flex h-[73px] items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-forest"
        >
          Manature <span className="text-moss">AI</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-ink">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-forest">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact">Plan Your Trip</Button>
        </div>

        <MobileMenu links={NAV_LINKS} />
      </Container>
    </header>
  );
}
