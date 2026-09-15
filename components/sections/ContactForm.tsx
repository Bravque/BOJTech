"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100";

const labelBase = "mb-1.5 block text-sm font-medium text-ink-700";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError(null);

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
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
            className={fieldBase}
          />
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
            className={fieldBase}
          />
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
            className={fieldBase}
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
            className={fieldBase}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="service" className={labelBase}>
            Service Required
          </label>
          <select id="service" name="service" defaultValue="" className={cn(fieldBase, "appearance-none")}>
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
            className={cn(fieldBase, "resize-y")}
          />
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
