import type { MetadataRoute } from "next";
import { getAllArticles, getAllDestinations, getAllItineraries } from "@/lib/content/mdx";
import { absoluteUrl } from "@/lib/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/destinations"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/blog"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/itineraries"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.4 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/affiliate-disclosure"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = getAllDestinations().map((item) => ({
    url: absoluteUrl(`/destinations/${item.slug}`),
    lastModified: item.frontmatter.updatedAt ?? item.frontmatter.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((item) => ({
    url: absoluteUrl(`/blog/${item.slug}`),
    lastModified: item.frontmatter.updatedAt ?? item.frontmatter.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const itineraryRoutes: MetadataRoute.Sitemap = getAllItineraries().map((item) => ({
    url: absoluteUrl(`/itineraries/${item.slug}`),
    lastModified: item.frontmatter.updatedAt ?? item.frontmatter.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...destinationRoutes, ...articleRoutes, ...itineraryRoutes];
}
