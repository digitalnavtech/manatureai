import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { publishedDate, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/products", "/reviews", "/birds", "/guides", "/best", "/about", "/contact", "/affiliate-disclosure", "/privacy-policy", "/terms"];
  const staticRoutes: MetadataRoute.Sitemap = paths.map((path, index) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: publishedDate,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : path === "/products" || path === "/reviews" ? 0.9 : 0.7,
  }));
  return [...staticRoutes, ...products.map((product) => ({
    url: `${siteConfig.url}/reviews/${product.slug}`,
    lastModified: publishedDate,
    changeFrequency: "monthly" as const,
    priority: 0.9,
    images: product.gallery.map((image) => `${siteConfig.url}${image.src}`),
  }))];
}
