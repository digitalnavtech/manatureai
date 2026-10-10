import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AffiliateButton } from "@/components/content/Affiliate";
import { NewsletterCTA, RelatedArticles } from "@/components/content/ArticleComponents";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icons";
import { products } from "@/data/products";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Nature, Closer — Birds, Wildlife & Smart Nature Tech",
  description: "Explore thoughtful birding guides, backyard wildlife advice, and independent explainers about smart nature technology.",
  path: "/",
});

export default function Home() {
  const product = products[0];
  return (
    <main>
      <section className="home-hero">
        <Container className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Birds • wildlife • smart nature</span>
            <h1>Bring the wild<br /><em>a little closer.</em></h1>
            <p>Thoughtful guides to backyard birds, wildlife-friendly spaces, and technology that helps you notice more of nature.</p>
            <div className="hero-actions">
              <Link className="button-primary" href={`/reviews/${product.slug}`}>Read our latest guide <Icon name="arrow" /></Link>
              <Link className="text-link" href="/birds">Explore birding</Link>
            </div>
            <div className="trust-row"><span>Independent explanations</span><span>Clear affiliate disclosure</span><span>No invented ratings</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image"><Image src={product.heroImage.src} alt={product.heroImage.alt} width={product.heroImage.width} height={product.heroImage.height} priority sizes="(max-width: 768px) 100vw, 52vw" /></div>
            <div className="floating-note"><span>Today’s field note</span><strong>Small visitors.<br />Big personalities.</strong></div>
          </div>
        </Container>
      </section>

      <section className="section intro-section"><Container>
        <div className="section-heading"><span className="eyebrow">Start exploring</span><h2>Better ways to watch,<br />welcome, and wonder.</h2><p>Practical information, calm design, and honest context—made for people who care about what happens just outside the window.</p></div>
        <div className="topic-grid">
          <Link href="/birds"><span className="topic-number">01</span><h3>Know your visitors</h3><p>Approachable bird profiles and observation tips for curious beginners.</p><b>Explore birds <Icon name="arrow" /></b></Link>
          <Link href="/guides"><span className="topic-number">02</span><h3>Build a better backyard</h3><p>Simple, wildlife-aware guidance for feeding, placement, and habitat.</p><b>Read guides <Icon name="arrow" /></b></Link>
          <Link href="/best"><span className="topic-number">03</span><h3>Choose useful tech</h3><p>Clear-eyed explainers about cameras, feeders, and nature tools.</p><b>See best picks <Icon name="arrow" /></b></Link>
        </div>
      </Container></section>

      <section className="section featured-section"><Container><div className="featured-grid">
        <div className="featured-image"><Image src={product.gallery[0].src} alt={product.gallery[0].alt} width={1254} height={1254} sizes="(max-width: 768px) 100vw, 50vw" /></div>
        <div className="featured-copy"><span className="eyebrow">Featured review</span><h2>See who stopped by—even when you missed the moment.</h2><p>{product.description} We separate manufacturer claims from practical buying context, including the AI subscription detail.</p><ul><li><Icon name="camera" />2K HD video</li><li><Icon name="sun" />Solar-assisted power</li><li><Icon name="spark" />AI-assisted identification</li></ul><AffiliateButton href={product.affiliateUrl}>Check Current Availability</AffiliateButton><Link className="text-link" href={`/reviews/${product.slug}`}>Read the full review</Link></div>
      </div></Container></section>

      <section className="section"><Container><div className="section-heading row-heading"><div><span className="eyebrow">Keep learning</span><h2>From the field notes</h2></div><Link className="text-link" href="/guides">View all guides</Link></div><RelatedArticles /></Container></section>
      <section className="section section-tight"><Container><NewsletterCTA /></Container></section>
    </main>
  );
}
