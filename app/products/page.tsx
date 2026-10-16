import type { Metadata } from "next";
import { ListingPage } from "@/components/content/ListingPage";
import { products } from "@/data/products";
import { windowBirdFeeder } from "@/data/windowBirdFeeder";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Birding & Nature Products",
  description:
    "Explore smart bird feeders, wildlife cameras, and nature-friendly technology featured by ManatureAI.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <ListingPage
      eyebrow="Product guides"
      title="Products for a closer look at nature."
      intro="Explore birding and backyard nature technology, with practical details to help you choose thoughtfully."
      cards={[
        ...products.map((product) => ({
          eyebrow: "Smart bird feeders",
          title: product.shortTitle,
          description: product.description,
          href: `/reviews/${product.slug}`,
          image: product.heroImage.src,
          affiliateUrl: product.affiliateUrl,
        })),
        {
          eyebrow: "Window bird feeders",
          title: windowBirdFeeder.shortTitle,
          description: windowBirdFeeder.description,
          href: `/products/${windowBirdFeeder.slug}`,
          image: windowBirdFeeder.images.pets.src,
          affiliateUrl: windowBirdFeeder.affiliateUrl,
        },
      ]}
    />
  );
}
