import { getAllArticles } from "@/lib/content/mdx";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo/config";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = getAllArticles();

  const items = articles
    .map((article) => {
      const url = absoluteUrl(`/blog/${article.slug}`);
      return `
    <item>
      <title>${escapeXml(article.frontmatter.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(article.frontmatter.description)}</description>
      <pubDate>${new Date(article.frontmatter.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Finland Travel Guides</title>
    <link>${absoluteUrl("/")}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
