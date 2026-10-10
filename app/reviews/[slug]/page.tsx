import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AffiliateButton, AffiliateDisclosure } from "@/components/content/Affiliate";
import { AuthorBox, Breadcrumbs, FAQ, FeatureGrid, ImageGallery, JsonLd, LastUpdated, ProductSpecifications, ProsCons, RelatedArticles, TableOfContents } from "@/components/content/ArticleComponents";
import { Container } from "@/components/ui/Container";
import { getProduct, products } from "@/data/products";
import { createMetadata } from "@/lib/metadata";
import { displayPublishedDate, publishedDate, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return createMetadata({
    title: "Smart Bird Feeder with Camera: 2K, Solar & AI Features",
    description: "Explore the features of this solar-powered smart bird feeder with a 2K camera, AI bird identification, instant alerts and weather-resistant design.",
    path: `/reviews/${product.slug}`,
    image: product.heroImage.src,
    type: "article",
  });
}

const toc = [
  { href: "#overview", label: "Product overview" }, { href: "#features", label: "Key features" },
  { href: "#who-for", label: "Who it is for" }, { href: "#pros-cons", label: "Pros and considerations" },
  { href: "#specifications", label: "Specifications" }, { href: "#setup", label: "How it works and setup" },
  { href: "#faq", label: "Frequently asked questions" }, { href: "#verdict", label: "Final summary" },
];

export default async function ProductReviewPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const pageUrl = `${siteConfig.url}/reviews/${product.slug}`;
  const schema = [
    { "@context": "https://schema.org", "@type": "Article", headline: "Smart Bird Feeder with Camera: Features, AI Identification & Solar Power", description: product.description, image: `${siteConfig.url}${product.heroImage.src}`, datePublished: publishedDate, dateModified: publishedDate, author: { "@type": "Organization", name: "ManatureAI Editorial" }, publisher: { "@type": "Organization", name: siteConfig.name }, mainEntityOfPage: pageUrl },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Reviews", item: `${siteConfig.url}/reviews` }, { "@type": "ListItem", position: 3, name: product.shortTitle, item: pageUrl }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: product.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ];

  return (
    <main>
      <JsonLd data={schema} />
      <article>
        <header className="article-hero"><Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews", href: "/reviews" }, { label: product.shortTitle }]} />
          <div className="article-hero-grid">
            <div><span className="eyebrow">Smart bird feeder review</span><h1>Smart Bird Feeder with Camera: Features, AI Identification &amp; Solar Power</h1><p className="article-deck">A closer look at 2K video, solar-assisted charging, bird arrival alerts, and what to know about the optional AI service.</p><LastUpdated /><AffiliateDisclosure compact /></div>
            <figure><Image src={product.heroImage.src} alt={product.heroImage.alt} width={product.heroImage.width} height={product.heroImage.height} priority sizes="(max-width: 900px) 100vw, 45vw" /><figcaption>Manufacturer-supplied product imagery.</figcaption></figure>
          </div>
        </Container></header>
        <Container className="article-shell">
          <aside className="article-sidebar"><TableOfContents items={toc} /></aside>
          <div className="article-body prose">
            <p className="lead">Smart bird feeders bring a camera, motion detection, and app connectivity to a familiar backyard fixture. The HEAPETS model described here is aimed at people who want to see visiting birds remotely and save interesting moments without waiting beside the feeder.</p>
            <p>This guide is based on supplied product information and manufacturer claims. We have not represented it as a hands-on test, and we do not publish a star score, changing price, or customer review count.</p>

            <section id="overview">
              <span className="section-kicker">At a glance</span>
              <h2>Product overview</h2>
              <p>The feeder combines a seed container with a 2K camera and a companion app. Motion detection is designed to trigger phone notifications, while a solar panel supports the rechargeable power system. According to the listing, a wired USB Type-C connection is another option.</p>
              <div className="overview-card"><div><span>Best suited to</span><strong>Curious backyard bird watchers</strong></div><div><span>Standout idea</span><strong>Remote bird visits on your phone</strong></div><div><span>Important detail</span><strong>AI may need a paid plan after trial</strong></div></div>
              <AffiliateButton href={product.affiliateUrl} />
            </section>

            <section id="features">
              <span className="section-kicker">What it offers</span>
              <h2>Key features, explained</h2>
              <p>These are the main capabilities stated in the available product material. Real-world performance can vary with placement, weather, Wi-Fi conditions, app compatibility, and how frequently the camera is activated.</p>
              <FeatureGrid features={product.features} />
              <div className="feature-story"><Image src={product.gallery[0].src} alt={product.gallery[0].alt} width={1254} height={1254} sizes="(max-width: 768px) 100vw, 760px" /><div><h3>2K HD camera</h3><p>Higher-resolution video can make plumage, markings, and feeding behavior easier to see than basic-definition footage. The listing describes 2K live viewing through the companion app; final clarity will still depend on light, connection quality, and camera position.</p></div></div>
              <div className="split-story"><div><span className="section-kicker">Less cable management</span><h3>Solar-powered operation</h3><p>The integrated panel is designed to top up the rechargeable battery during daylight. It may reduce manual charging, but it does not make battery life unlimited. Shade, winter light, motion frequency, and live viewing all affect performance.</p><p>A USB Type-C connection is listed as a fallback. Any permanent outdoor electrical setup should use suitable, moisture-protected equipment.</p></div><Image src={product.gallery[1].src} alt={product.gallery[1].alt} width={1254} height={1254} sizes="(max-width: 768px) 100vw, 380px" /></div>
              <div className="split-story reverse"><div><span className="section-kicker">Know who arrived</span><h3>AI bird identification and instant alerts</h3><p>The manufacturer says the companion service can recognize more than 10,000 bird species. Motion alerts are designed to tell you when activity occurs, allowing you to open the app rather than monitor the feeder continuously.</p><p><strong>Subscription note:</strong> the supplied information describes a one-month AI trial. Monthly or yearly payment may be required afterward, so check the latest terms before purchasing.</p></div><Image src={product.gallery[2].src} alt={product.gallery[2].alt} width={1254} height={1254} sizes="(max-width: 768px) 100vw, 380px" /></div>
              <h3>Weather resistance and durable construction</h3>
              <p>The listing describes an outdoor-ready, weather-resistant body designed for rain, snow, and warm conditions, along with ABS construction. ““Weather-resistant”” should not be read as indestructible: secure mounting, routine cleaning, and protected power connections still matter.</p>
              <h3>Easy assembly and squirrel deterrence</h3>
              <p>Supplied imagery presents a guided assembly process and tree, pole, or wall placement options. The advertised app control can trigger a deterrent response when squirrels visit. Results will vary with local wildlife behavior, so combine it with thoughtful feeder placement rather than treating it as a guarantee.</p>
            </section>
            <section id="who-for">
              <span className="section-kicker">A good fit?</span><h2>Who is this smart feeder for?</h2>
              <p>It may suit backyard bird watchers who enjoy phone notifications, families sharing nature moments, people who want to observe without standing close to the feeder, and gift buyers looking for a technology-led birding product.</p>
              <p>A traditional feeder may be the simpler choice if you do not want another app, have unreliable outdoor connectivity, or would rather avoid a possible identification subscription.</p>
            </section>
            <section id="pros-cons"><span className="section-kicker">Balanced view</span><h2>Pros and things to consider</h2><ProsCons pros={product.pros} cons={product.cons} /></section>
            <section id="specifications"><span className="section-kicker">Manufacturer-stated details</span><h2>Product specifications</h2><p>Specifications and package contents can change. Confirm current details on the seller’s page before purchasing.</p><ProductSpecifications items={product.specifications} /></section>
            <section><span className="section-kicker">See the feature set</span><h2>Product image gallery</h2><ImageGallery images={product.gallery.slice(3)} /></section>
            <section id="setup">
              <span className="section-kicker">Getting started</span><h2>How it works and how to set it up</h2>
              <ol className="steps">
                <li><span>1</span><div><h3>Choose a useful location</h3><p>Look for a calm feeding spot with a clear camera view, enough daylight for the panel, and a stable mounting surface.</p></div></li>
                <li><span>2</span><div><h3>Assemble and mount securely</h3><p>Follow the current included instructions for tree, pole, or wall mounting. Recheck fasteners after severe weather.</p></div></li>
                <li><span>3</span><div><h3>Charge and connect</h3><p>Give the battery an initial charge, install the companion app, and follow its current pairing instructions.</p></div></li>
                <li><span>4</span><div><h3>Add suitable seed</h3><p>Use seed appropriate to the birds you hope to attract and clean the feeder regularly to support bird health.</p></div></li>
                <li><span>5</span><div><h3>Adjust notifications</h3><p>Tune motion settings to balance useful arrival alerts against battery use and unnecessary notifications.</p></div></li>
              </ol>
            </section>
            <section id="faq"><span className="section-kicker">Common questions</span><h2>Frequently asked questions</h2><FAQ items={product.faq} /></section>
            <section>
              <span className="section-kicker">Before you buy</span><h2>Things to consider</h2>
              <p>Check your outdoor Wi-Fi coverage, app compatibility, local mounting options, expected sunlight, and the latest AI subscription terms. Also plan for routine seed refills and hygienic cleaning—the camera does not replace normal feeder care.</p>
              <p>Prices, offers, features, and availability can change. Use the Amazon link below to confirm the current product details rather than relying on a price quoted elsewhere.</p>
            </section>
            <section id="verdict" className="final-card">
              <span className="section-kicker">Final summary</span><h2>A closer window into backyard bird life</h2>
              <p>For buyers who like the idea of app alerts and remote viewing, this feeder combines the most useful smart-feeder concepts in one product: 2K video, solar-assisted power, AI identification, and flexible mounting. The key tradeoffs are connectivity, variable solar performance, and a possible ongoing AI fee.</p>
              <AffiliateButton href={product.affiliateUrl}>View Product on Amazon</AffiliateButton>
              <small>Product details and availability are controlled by the retailer and may change.</small>
            </section>
            <AuthorBox />
          </div>
        </Container>
        <section className="section related-section"><Container><div className="section-heading"><span className="eyebrow">Continue exploring</span><h2>Related field notes</h2></div><RelatedArticles /><p className="published-note">First published and last reviewed {displayPublishedDate}.</p></Container></section>
      </article>
    </main>
  );
}
