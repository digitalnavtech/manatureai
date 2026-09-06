import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string; // honeypot — real users never fill this in
}

/**
 * Placeholder contact endpoint. Wire this up to an email/CRM provider using
 * server-only environment variables (e.g. an email API key + CONTACT_EMAIL
 * as the destination) — never hardcode secrets in source.
 */
export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (payload.company) {
    // Honeypot tripped — silently pretend success so bots don't learn to adapt.
    return NextResponse.json({ ok: true });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const subject = payload.subject?.trim();
  const message = payload.message?.trim();

  if (!name || !EMAIL_PATTERN.test(email ?? "") || !subject || !message || message.length < 10) {
    return NextResponse.json({ error: "Please fill in all fields with a valid email." }, { status: 400 });
  }

  const destination = process.env.CONTACT_EMAIL;

  if (!destination) {
    console.warn("[contact] CONTACT_EMAIL is not set — message logged but not delivered.", {
      name,
      email,
      subject,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  // TODO: send the message via your transactional email provider, e.g.
  // await sendEmail({ to: destination, replyTo: email, subject, text: message });

  return NextResponse.json({ ok: true, delivered: false });
}
