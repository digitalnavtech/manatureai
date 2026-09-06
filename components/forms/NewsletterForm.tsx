"use client";

import { useId, useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const nameId = useId();
  const emailId = useId();
  const consentId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const consent = formData.get("consent");

    if (!name) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!consent) {
      setStatus("error");
      setErrorMessage("Please confirm you'd like to receive our newsletter.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="rounded-xl border border-forest/30 bg-forest/5 px-5 py-4 text-sm font-medium text-forest">
        You&apos;re subscribed! Check your inbox for a confirmation email.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={compact ? "space-y-3" : "space-y-4"}>
      <div className={compact ? "flex flex-col gap-3 sm:flex-row" : "grid gap-3 sm:grid-cols-2"}>
        <div className="flex-1">
          <label htmlFor={nameId} className="sr-only">
            Name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
            className="w-full rounded-full border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus-visible:border-forest"
          />
        </div>
        <div className="flex-1">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="w-full rounded-full border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus-visible:border-forest"
          />
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id={consentId}
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 rounded border-border text-forest focus-visible:outline-2"
        />
        <label htmlFor={consentId} className="text-xs leading-relaxed text-ink-muted">
          I&apos;d like to receive Finland travel guides and tips by email. Unsubscribe anytime.
        </label>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-forest-light disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
    </form>
  );
}
