import Image from "next/image";
import type { Metadata } from "next";
import { AffiliateButton, AffiliateDisclosure } from "@/components/content/Affiliate";
import { Breadcrumbs, JsonLd } from "@/components/content/ArticleComponents";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icons";
import { windowBirdFeeder as product } from "@/data/windowBirdFeeder";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const path = `/products/${product.slug}`;

export const metadata: Metadata = createMetadata({
  title: "Clear Window Bird Feeder with Strong Suction Cups",
  description:
    "Watch cardinals, finches, and chickadees up close with the Nature Anywhere clear window bird feeder: four EVERGRIP suction cups, a sliding seed tray, and no tools needed.",
  path,
  image: product.images.hero.src,
});

export default function ClearWindowBirdFeederPage() {
  const { hero, suction, setup, pets, gift } = product.images;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteConfig.url}/products` },
      { "@type": "ListItem", position: 3, name: product.shortTitle, item: `${siteConfig.url}${path}` },
    ],
  };

  return (
    <main className="landing">
      <JsonLd data={schema} />

      <section className="landing-hero">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.shortTitle }]} />
          <div className="landing-hero-grid">
            <div className="landing-hero-copy">
              <span className="eyebrow">{product.brand} window bird feeder</span>
              <h1>Bring Beautiful Birds Right to Your Window</h1>
              <p className="landing-subtitle">Experience Nature Up Close — Every Single Day</p>
              <p>Turn any ordinary window into your favorite bird-watching spot with the <strong>{product.name}</strong>.</p>
              <p>Watch colorful cardinals, finches, blue jays, chickadees, and other backyard visitors from the comfort of your home.</p>
              <p>Designed with four strong EVERGRIP suction cups, a crystal-clear viewing area, and an easy-clean sliding seed tray.</p>
              <div className="landing-cta">
                <AffiliateButton href={product.affiliateUrl}>Shop Now — {product.price}</AffiliateButton>
                <small>Price at time of writing. Check Amazon for the current price.</small>
              </div>
              <ul className="landing-chips">
                {product.highlights.map((item) => <li key={item}><Icon name="check" />{item}</li>)}
              </ul>
            </div>
            <figure className="landing-hero-image">
              <Image src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} loading="eager" fetchPriority="high" sizes="(max-width: 900px) 90vw, 46vw" />
            </figure>
          </div>
          <AffiliateDisclosure compact />
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading landing-center">
            <span className="eyebrow">Why bird lovers choose Nature Anywhere</span>
            <h2>A Front-Row Seat to the Beauty of Nature</h2>
          </div>
          <div className="landing-features">
            {product.features.map((feature) => (
              <article key={feature.title}>
                <span className="feature-icon"><Icon name={feature.icon} /></span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
          <div className="landing-split">
            <Image src={suction.src} alt={suction.alt} width={suction.width} height={suction.height} sizes="(max-width: 900px) 100vw, 50vw" />
            <div>
              <span className="section-kicker">4 strong EVERGRIP suction cups</span>
              <h3>Made to stay on the glass</h3>
              <p>Four heavy-duty suction cups help keep your feeder securely attached to clean glass, so you can enjoy close-up visits in every season.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section landing-steps-section">
        <Container>
          <div className="landing-steps-grid">
            <div>
              <div className="section-heading">
                <span className="eyebrow">Bird watching has never been this easy</span>
                <h2>Three Simple Steps</h2>
              </div>
              <ol className="landing-steps">
                {product.steps.map((step, index) => (
                  <li key={step.title}>
                    <span>{index + 1}</span>
                    <div><h3>{step.title}</h3><p>{step.description}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <Image src={setup.src} alt={setup.alt} width={setup.width} height={setup.height} sizes="(max-width: 900px) 100vw, 48vw" />
          </div>
        </Container>
      </section>

      <section className="section featured-section">
        <Container>
          <div className="featured-grid">
            <div className="featured-image"><Image src={pets.src} alt={pets.alt} width={pets.width} height={pets.height} sizes="(max-width: 900px) 100vw, 50vw" /></div>
            <div className="featured-copy">
              <span className="eyebrow">Entertainment for pets. Relaxation for you.</span>
              <h2>Your Pet’s New Favorite Window</h2>
              <p>Give your indoor cat or dog a fascinating view of the outdoors.</p>
              <p className="landing-gap">Watch your pet observe visiting birds safely from inside your home while you enjoy the peaceful beauty of nature.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="landing-gift">
            <div>
              <span className="eyebrow">A thoughtful gift that brings joy</span>
              <h2>Perfect for Bird Lovers of Every Age</h2>
              <p>Surprise someone special with a gift they can enjoy throughout the year.</p>
              <h3>Ideal for:</h3>
              <ul>
                {product.giftIdeas.map((item) => <li key={item}><Icon name="check" />{item}</li>)}
              </ul>
            </div>
            <Image src={gift.src} alt={gift.alt} width={gift.width} height={gift.height} sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
        </Container>
      </section>

      <section className="section section-tight">
        <Container>
          <div className="landing-final">
            <span className="eyebrow">Make every window a nature window</span>
            <h2>All you need is a window and a little curiosity.</h2>
            <p>There’s something special about seeing a beautiful bird just inches away.</p>
            <p>With Nature Anywhere, you don’t need a large garden or expensive equipment to enjoy backyard bird watching.</p>
            <AffiliateButton href={product.affiliateUrl}>Bring Nature Home — Shop Now</AffiliateButton>
            <small>Product details, price, and availability are set by the retailer and may change.</small>
          </div>
        </Container>
      </section>
    </main>
  );
}
