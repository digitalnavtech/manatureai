import type { Metadata } from "next";
import { ListingPage } from "@/components/content/ListingPage";
import { products } from "@/data/products";
import { createMetadata } from "@/lib/metadata";
export const metadata: Metadata = createMetadata({ title: "Nature Technology Reviews", description: "Independent explainers for smart bird feeders, wildlife cameras, and backyard nature technology.", path: "/reviews" });
export default function ReviewsPage() { const product = products[0]; return <ListingPage eyebrow="Independent explainers" title="Reviews with the useful details left in." intro="We examine features, tradeoffs, subscriptions, and manufacturer claims—without invented ratings or pretend hands-on experience." cards={[{ eyebrow: "Smart bird feeders", title: product.shortTitle, description: product.description, href: `/reviews/${product.slug}`, image: product.heroImage.src }]} />; }
