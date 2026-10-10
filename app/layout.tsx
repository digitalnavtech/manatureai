import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/content/ArticleComponents";
import { Analytics } from "@/components/analytics/Analytics";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "ManatureAI | Birds, Wildlife & Smart Nature Tech", template: "%s | ManatureAI" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "ManatureAI Editorial" }],
  category: "Nature and wildlife",
  alternates: { canonical: siteConfig.url },
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: siteConfig.name, url: siteConfig.url, title: "ManatureAI | Nature, closer", description: siteConfig.description },
  twitter: { card: "summary_large_image", title: "ManatureAI | Nature, closer", description: siteConfig.description },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${lora.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
        <Analytics />
        <JsonLd data={[{ "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description }, { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url }]} />
      </body>
    </html>
  );
}
