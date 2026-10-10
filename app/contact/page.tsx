import type { Metadata } from "next";
import { SimplePage } from "@/components/content/ListingPage";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
export const metadata: Metadata = createMetadata({ title: "Contact", description: "Contact the ManatureAI editorial team with questions, corrections, or partnership enquiries.", path: "/contact" });
export default function Page() { return <SimplePage eyebrow="Get in touch" title="A line from the backyard." intro="Questions, corrections, and thoughtful partnership enquiries are welcome."><h2>Email the editorial team</h2><p>The simplest way to reach us is <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Please include the page URL when reporting a correction.</p><div className="notice-box"><strong>Before sending product offers</strong><p>Coverage is not guaranteed, and a supplied product does not guarantee positive treatment. Any material relationship will be disclosed.</p></div><h2>Response times</h2><p>ManatureAI is an editorial project, so replies may not be immediate. We prioritize corrections and reader questions that improve published guidance.</p></SimplePage>; }
