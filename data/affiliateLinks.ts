import { products, type ProductImage } from "@/data/products";
import { windowBirdFeeder } from "@/data/windowBirdFeeder";

export type AffiliateLink = {
  title: string;
  category: string;
  description: string;
  url: string;
  cta?: string;
  image?: ProductImage;
  /** Our own guide or landing page for this product, if there is one. */
  guideHref?: string;
};

/** Broad Amazon collections, shown as large banners at the top of /shop. */
export const featuredCollections: AffiliateLink[] = [
  {
    title: "Shop Bird Feeders on Amazon",
    category: "Bird feeders",
    description:
      "Browse window, smart camera, tube, platform, and suet feeders in one place, and compare current prices and availability on Amazon.",
    url: "https://www.amazon.com/s?k=bird+feeders+work&crid=338DQMHPLVF31&sprefix=bird+feeders+work%2Caps%2C293&linkCode=ll2&tag=manatureai-20&linkId=23a4ff08bcc173c2c324894de57f3f6f&language=en_US&ref_=as_li_ss_tl",
    cta: "Browse Bird Feeders",
  },
];

/**
 * Individual products shown as cards on /shop.
 * To add a product: append an entry with its Amazon affiliate link and, if you have one,
 * an image saved under public/ with a kebab-case file name (no spaces or commas).
 */
export const affiliateProducts: AffiliateLink[] = [
  ...products.map((product) => ({
    title: product.shortTitle,
    category: "Smart bird feeders",
    description: product.description,
    url: product.affiliateUrl,
    image: product.heroImage,
    guideHref: `/reviews/${product.slug}`,
  })),
  {
    title: windowBirdFeeder.shortTitle,
    category: "Window bird feeders",
    description: windowBirdFeeder.description,
    url: windowBirdFeeder.affiliateUrl,
    image: windowBirdFeeder.images.pets,
    guideHref: `/products/${windowBirdFeeder.slug}`,
  },
];
