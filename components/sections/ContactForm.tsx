"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export type ContactFormService = { slug: string; name: string };

// Mirrors the server-side rules in app/api/contact/route.ts so we can give
// instant, field-specific feedback (name ≥ 2, valid email, message ≥ 10).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_MESSAGES: Record<string, string> = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  message: "Please include a message of at least 10 characters.",
};

function validate(values: Record<string, string>): Record<string, string> {
  const errs: Record<string, string> = {};
  if ((values.name ?? "").trim().length < 2) errs.name = FIELD_MESSAGES.name;
  if (!EMAIL_RE.test((values.email ?? "").trim())) errs.email = FIELD_MESSAGES.email;
  if ((values.message ?? "").trim().length < 10) errs.message = FIELD_MESSAGES.message;
  return errs;
}

const fieldBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-4";
const fieldOk = "border-ink-200 focus:border-brand-400 focus:ring-brand-100";
const fieldBad = "border-red-400 focus:border-red-400 focus:ring-red-100";

const labelBase = "mb-1.5 block text-sm font-medium text-ink-700";

export function ContactForm({ services = [] }: { services?: ContactFormService[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fieldClass = (name: string) =>
    cn(fieldBase, fieldErrors[name] ? fieldBad : fieldOk);

  // Accessibility helpers so screen readers announce the specific problem.
  const invalidProps = (name: string) =>
    fieldErrors[name]
      ? ({ "aria-invalid": true, "aria-describedby": `${name}-error` } as const)
      : {};

  function clearFieldError(name: string) {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function focusFirst(form: HTMLFormElement, errs: Record<string, string>) {
    const first = Object.keys(errs)[0];
    const el = form.elements.namedItem(first);
    if (el instanceof HTMLElement) el.focus();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setError(null);
    setFieldErrors({});

    const payload = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    // Catch problems client-side first — no round trip, styled highlight.
    const localErrors = validate(payload);
    if (Object.keys(localErrors).length) {
      setStatus("error");
      setError("Please fix the highlighted fields below.");
      setFieldErrors(localErrors);
      focusFirst(form, localErrors);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string; fields?: string[] }
          | null;

        // Server rejected specific fields — highlight them the same way.
        if (body?.fields?.length) {
          const errs: Record<string, string> = {};
          for (const f of body.fields) {
            errs[f] = FIELD_MESSAGES[f] ?? "Please check this field.";
          }
          setStatus("error");
          setError("Please fix the highlighted fields below.");
          setFieldErrors(errs);
          focusFirst(form, errs);
          return;
        }

        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't send your message. Please try again or email us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center rounded-3xl border border-accent-100 bg-accent-50/60 p-10 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">
          Message received — thank you!
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600">
          Thank you for reaching out to BOJ Technologies Limited. A member of our
          team will get back to you shortly to discuss your project.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8"
    >
      {/* Honeypot — hidden from humans; bots that fill it are silently dropped. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            Full Name <span className="text-brand-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={fieldClass("name")}
            onChange={() => clearFieldError("name")}
            {...invalidProps("name")}
          />
          {fieldErrors.name && (
            <p id="name-error" className="mt-1.5 text-xs font-medium text-red-600">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>
            Email Address <span className="text-brand-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass("email")}
            onChange={() => clearFieldError("email")}
            {...invalidProps("email")}
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1.5 text-xs font-medium text-red-600">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelBase}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+254 7XX XXX XXX"
            className={fieldClass("phone")}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelBase}>
            Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Your organization"
            className={fieldClass("company")}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="service" className={labelBase}>
            Service Required
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className={cn(fieldClass("service"), "appearance-none")}
          >
            <option value="" disabled>
              Select a service…
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Multiple / Other">Multiple services / Other</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelBase}>
            Message <span className="text-brand-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project, goals or requirements…"
            className={cn(fieldClass("message"), "resize-y")}
            onChange={() => clearFieldError("message")}
            aria-describedby={fieldErrors.message ? "message-error" : "message-hint"}
            aria-invalid={fieldErrors.message ? true : undefined}
          />
          {fieldErrors.message ? (
            <p id="message-error" className="mt-1.5 text-xs font-medium text-red-600">
              {fieldErrors.message}
            </p>
          ) : (
            <p id="message-hint" className="mt-1.5 text-xs text-ink-400">
              Minimum 10 characters.
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-700 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4" />
          </>
        )}
      </button>

      {status === "error" && error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-100"
        >
          {error}
        </p>
      )}

      <p className="mt-4 text-xs text-ink-400">
        By submitting this form you agree to our{" "}
        <a href="/privacy-policy" className="underline hover:text-ink-600">
          Privacy Policy
        </a>
        . We&apos;ll only use your details to respond to your enquiry.
      </p>
    </form>
  );
}
