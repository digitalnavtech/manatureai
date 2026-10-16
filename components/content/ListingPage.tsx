import Image from "next/image";
import Link from "next/link";
import { AffiliateDisclosure } from "@/components/content/Affiliate";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icons";

type Card = { eyebrow: string; title: string; description: string; href: string; image?: string; affiliateUrl?: string };

const affiliateRel = "sponsored nofollow noopener noreferrer";

function CardImage({ card }: { card: Card }) {
  const image = <Image src={card.image!} alt="" fill sizes="(max-width: 768px) 100vw, 420px" />;
  // The title carries the same link, so the image link is skipped by keyboard and screen readers.
  return <div className="listing-image">{card.affiliateUrl ? <a href={card.affiliateUrl} target="_blank" rel={affiliateRel} tabIndex={-1} aria-hidden="true">{image}</a> : image}</div>;
}

export function ListingPage({ eyebrow, title, intro, cards }: { eyebrow: string; title: string; intro: string; cards: Card[] }) {
  const hasAffiliateLinks = cards.some((card) => card.affiliateUrl);
  return <main><section className="page-hero"><Container><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></Container></section><section className="section"><Container>{hasAffiliateLinks && <div className="listing-disclosure"><AffiliateDisclosure compact /></div>}<div className="listing-grid">{cards.map((card) => <article className="listing-card" key={card.title}>{card.image && <CardImage card={card} />}<div><span>{card.eyebrow}</span><h2>{card.affiliateUrl ? <a href={card.affiliateUrl} target="_blank" rel={affiliateRel}>{card.title}<span className="sr-only"> (opens Amazon in a new tab)</span></a> : card.title}</h2><p>{card.description}</p><Link href={card.href}>Explore <Icon name="arrow" /></Link></div></article>)}</div></Container></section></main>;
}

export function SimplePage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <main><section className="page-hero page-hero-small"><Container><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></Container></section><section className="section"><Container className="prose legal-prose">{children}</Container></section></main>;
}
