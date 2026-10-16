import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AffiliateButton, AffiliateDisclosure } from "@/components/content/Affiliate";
import { Breadcrumbs } from "@/components/content/ArticleComponents";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icons";
import { affiliateProducts, featuredCollections } from "@/data/affiliateLinks";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Shop Bird Feeders & Birding Gear",
  description:
    "All of ManatureAI's bird feeder and backyard birding picks in one place, with direct links to check current prices and availability on Amazon.",
  path: "/shop",
});

const affiliateRel = "sponsored nofollow noopener noreferrer";

export default function ShopPage() {
  return (
    <main>
      <section className="page-hero page-hero-small">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
          <span className="eyebrow">Shop our picks</span>
          <h1>Bird feeders and birding gear, all in one place.</h1>
          <p>Every product we feature, with a direct link to check the current price and availability on Amazon.</p>
        </Container>
      </section>

      <section className="section shop-section">
        <Container>
          <AffiliateDisclosure compact />

          <div className="shop-collections">
            {featuredCollections.map((collection) => (
              <article className="shop-collection" key={collection.url}>
                <div>
                  <span className="eyebrow">{collection.category}</span>
                  <h2>{collection.title}</h2>
                  <p>{collection.description}</p>
                </div>
                <AffiliateButton href={collection.url}>{collection.cta ?? "Shop on Amazon"}</AffiliateButton>
              </article>
            ))}
          </div>

          <div className="section-heading shop-heading">
            <span className="eyebrow">Featured products</span>
            <h2>Our bird feeder picks</h2>
          </div>
          <div className="shop-grid">
            {affiliateProducts.map((product) => (
              <article className="shop-card" key={product.url}>
                {product.image && (
                  <a className="shop-card-image" href={product.url} target="_blank" rel={affiliateRel} tabIndex={-1} aria-hidden="true">
                    <Image src={product.image.src} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 380px" />
                  </a>
                )}
                <div className="shop-card-body">
                  <span>{product.category}</span>
                  <h3><a href={product.url} target="_blank" rel={affiliateRel}>{product.title}<span className="sr-only"> (opens Amazon in a new tab)</span></a></h3>
                  <p>{product.description}</p>
                  <div className="shop-card-actions">
                    <AffiliateButton href={product.url}>{product.cta ?? "Check Price on Amazon"}</AffiliateButton>
                    {product.guideHref && <Link className="text-link" href={product.guideHref}>Read our guide <Icon name="arrow" /></Link>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="shop-note">Prices, offers, and availability are set by Amazon and can change at any time.</p>
        </Container>
      </section>
    </main>
  );
}
