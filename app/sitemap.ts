import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { windowBirdFeeder } from "@/data/windowBirdFeeder";
import { publishedDate, siteConfig } from "@/lib/site";

const staticPages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "weekly", priority: 0.9 },
  { path: "/reviews", changeFrequency: "weekly", priority: 0.9 },
  { path: "/birds", changeFrequency: "monthly", priority: 0.8 },
  { path: "/guides", changeFrequency: "monthly", priority: 0.8 },
  { path: "/best", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/affiliate-disclosure", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
] as const;

function absoluteUrl(path: string) {
  return new URL(path || "/", siteConfig.url).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: publishedDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const reviewRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/reviews/${product.slug}`),
    lastModified: publishedDate,
    changeFrequency: "monthly",
    priority: 0.9,
    images: [product.heroImage, ...product.gallery].map((image) => absoluteUrl(image.src)),
  }));

  const landingRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(`/products/${windowBirdFeeder.slug}`),
      lastModified: publishedDate,
      changeFrequency: "monthly",
      priority: 0.9,
      images: Object.values(windowBirdFeeder.images).map((image) => absoluteUrl(image.src)),
    },
  ];

  return [...staticRoutes, ...reviewRoutes, ...landingRoutes];
}
