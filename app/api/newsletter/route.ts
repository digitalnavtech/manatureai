import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface NewsletterPayload {
  name?: string;
  email?: string;
}

/**
 * Placeholder newsletter signup endpoint. Wire this up to a real provider
 * (Brevo, Mailchimp, ConvertKit) using `NEWSLETTER_API_KEY` from the
 * environment — never hardcode provider keys in source.
 */
export async function POST(request: Request) {
  let payload: NewsletterPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();

  if (!name || !email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "A valid name and email are required." }, { status: 400 });
  }

  const apiKey = process.env.NEWSLETTER_API_KEY;

  if (!apiKey) {
    console.warn(
      "[newsletter] NEWSLETTER_API_KEY is not set — signup accepted but not forwarded to a provider.",
      { email }
    );
    return NextResponse.json({ ok: true, provider: "none" });
  }

  // TODO: forward the subscriber to your provider once NEWSLETTER_API_KEY is set, e.g.
  // await fetch("https://api.brevo.com/v3/contacts", {
  //   method: "POST",
  //   headers: { "api-key": apiKey, "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, attributes: { FIRSTNAME: name } }),
  // });

  return NextResponse.json({ ok: true });
}
