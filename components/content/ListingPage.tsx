import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icons";

type Card = { eyebrow: string; title: string; description: string; href: string; image?: string };

export function ListingPage({ eyebrow, title, intro, cards }: { eyebrow: string; title: string; intro: string; cards: Card[] }) {
  return <main><section className="page-hero"><Container><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></Container></section><section className="section"><Container><div className="listing-grid">{cards.map((card) => <article className="listing-card" key={card.title}>{card.image && <div className="listing-image"><Image src={card.image} alt="" fill sizes="(max-width: 768px) 100vw, 420px" /></div>}<div><span>{card.eyebrow}</span><h2>{card.title}</h2><p>{card.description}</p><Link href={card.href}>Explore <Icon name="arrow" /></Link></div></article>)}</div></Container></section></main>;
}

export function SimplePage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <main><section className="page-hero page-hero-small"><Container><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></Container></section><section className="section"><Container className="prose legal-prose">{children}</Container></section></main>;
}
