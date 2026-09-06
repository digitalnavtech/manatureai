import type { Metadata } from "next";
import { absoluteUrl, DEFAULT_AUTHOR, SITE_NAME } from "./config";

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  ogTag?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

function ogImageUrl(title: string, tag?: string): string {
  const params = new URLSearchParams({ title });
  if (tag) params.set("tag", tag);
  return absoluteUrl(`/api/og?${params.toString()}`);
}

export function buildMetadata({
  title,
  description,
  path,
  ogTag,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const image = ogImageUrl(title, ogTag);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    authors: authors?.map((name) => ({ name })) ?? [{ name: DEFAULT_AUTHOR }],
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
