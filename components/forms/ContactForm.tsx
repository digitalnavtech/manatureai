"use client";

import { useId, useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  function validate(formData: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name) next.name = "Please enter your name.";
    if (!EMAIL_PATTERN.test(email)) next.email = "Please enter a valid email address.";
    if (!subject) next.subject = "Please add a subject.";
    if (message.length < 10) next.message = "Please write at least 10 characters.";

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot spam-prevention field: real users never fill this in.
    if (String(formData.get("company") ?? "").length > 0) {
      setStatus("success");
      form.reset();
      return;
    }

    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus("error");
      setServerError("");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setErrors({});
      form.reset();
    } catch {
      setStatus("error");
      setServerError("Something went wrong sending your message. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="rounded-xl border border-forest/30 bg-forest/5 px-5 py-4 text-sm font-medium text-forest">
        Thanks for reaching out — we&apos;ll reply within a few days.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot field, hidden from sighted and keyboard users */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor={nameId} className="mb-1.5 block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink focus-visible:border-forest"
        />
        {errors.name ? (
          <p id={`${nameId}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-700">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={emailId} className="mb-1.5 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink focus-visible:border-forest"
        />
        {errors.email ? (
          <p id={`${emailId}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-700">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={subjectId} className="mb-1.5 block text-sm font-medium text-ink">
          Subject
        </label>
        <input
          id={subjectId}
          name="subject"
          type="text"
          required
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? `${subjectId}-error` : undefined}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink focus-visible:border-forest"
        />
        {errors.subject ? (
          <p id={`${subjectId}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-700">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={messageId} className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink focus-visible:border-forest"
        />
        {errors.message ? (
          <p id={`${messageId}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-700">
            {errors.message}
          </p>
        ) : null}
      </div>

      {serverError ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-forest-light disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
