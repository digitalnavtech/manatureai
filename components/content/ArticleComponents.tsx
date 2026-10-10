import Image from "next/image";
import Link from "next/link";
import type { Product, ProductImage } from "@/data/products";
import { Icon } from "@/components/ui/Icons";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb">{items.map((item, index) => <span key={item.label}>{index > 0 && <span aria-hidden="true">/</span>}{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}

export function LastUpdated() {
  return <p className="article-meta"><span>By ManatureAI Editorial</span><span aria-hidden="true">•</span><time dateTime="2026-09-21">Updated September 21, 2026</time><span aria-hidden="true">•</span><span>12 min read</span></p>;
}

export function FeatureGrid({ features }: { features: Product["features"] }) {
  return <div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.title}><span className="feature-icon"><Icon name={feature.icon} /></span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>;
}

export function ProsCons({ pros, cons }: Pick<Product, "pros" | "cons">) {
  return <div className="pros-cons"><section className="pros"><h3>What stands out</h3><ul>{pros.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul></section><section className="cons"><h3>What to consider</h3><ul>{cons.map((item) => <li key={item}><Icon name="close" />{item}</li>)}</ul></section></div>;
}

export function ProductSpecifications({ items }: { items: Product["specifications"] }) {
  return <div className="spec-wrap"><table><caption className="sr-only">Smart bird feeder product specifications</caption><tbody>{items.map((item) => <tr key={item.label}><th scope="row">{item.label}</th><td>{item.value}</td></tr>)}</tbody></table></div>;
}

export function ImageGallery({ images }: { images: ProductImage[] }) {
  return <div className="image-gallery">{images.map((image, index) => <figure className={index === 0 ? "gallery-wide" : ""} key={image.src}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={index === 0 ? "(max-width: 768px) 100vw, 760px" : "(max-width: 768px) 100vw, 380px"} /></figure>)}</div>;
}

export function FAQ({ items }: { items: Product["faq"] }) {
  return <div className="faq-list">{items.map((item) => <FAQItem key={item.question} {...item} />)}</div>;
}

export function FAQItem({ question, answer }: { question: string; answer: string }) {
  return <details className="faq-item"><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>;
}

export function TableOfContents({ items }: { items: { href: string; label: string }[] }) {
  return <aside className="toc"><strong>In this guide</strong><ol>{items.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ol></aside>;
}

export function AuthorBox() {
  return <aside className="author-box"><div className="author-avatar">M</div><div><span>Written by</span><h2>ManatureAI Editorial</h2><p>Our editorial team explains backyard wildlife technology using manufacturer documentation, careful research, and clear buying context. This article does not claim hands-on testing.</p></div></aside>;
}

export function RelatedArticles() {
  const items = [
    { type: "Guide", title: "How smart bird feeders work", href: "/guides" },
    { type: "Birding", title: "A beginner’s guide to backyard bird watching", href: "/birds" },
    { type: "Best picks", title: "Choosing a bird feeder camera", href: "/best" },
  ];
  return <div className="related-grid">{items.map((item) => <Link href={item.href} key={item.title}><span>{item.type}</span><h3>{item.title}</h3><p>Explore practical advice from ManatureAI.</p><b>Read more <Icon name="arrow" /></b></Link>)}</div>;
}

export function NewsletterCTA() {
  return <aside className="newsletter"><span>Field notes, not inbox noise</span><h2>Make your backyard a little wilder.</h2><p>Seasonal birding ideas and carefully researched gear guides are coming soon.</p><Link className="button-secondary" href="/contact">Stay in the loop</Link></aside>;
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
