import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/content";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  // Honeypot — real users never fill this hidden field.
  company_website?: string;
};

type Submission = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clip = (value = "", max: number) => value.trim().slice(0, max);

export async function POST(req: Request) {
  let data: ContactPayload;
  try {
    data = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  // Bot caught by the honeypot — pretend success and drop the message.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = clip(data.name, 120);
  const email = clip(data.email, 160);
  const message = clip(data.message, 4000);

  const fields: string[] = [];
  if (name.length < 2) fields.push("name");
  if (!EMAIL_RE.test(email)) fields.push("email");
  if (message.length < 10) fields.push("message");

  if (fields.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields and try again.", fields },
      { status: 422 }
    );
  }

  const submission: Submission = {
    name,
    email,
    phone: clip(data.phone, 40),
    company: clip(data.company, 120),
    service: clip(data.service, 120),
    message,
  };

  const delivered = await deliver(submission);
  if (!delivered) {
    // Not configured (or the provider failed) — log so an enquiry is never
    // silently lost. Set RESEND_API_KEY + CONTACT_FROM_EMAIL to enable email
    // delivery (see .env.example).
    console.warn(
      "[contact] Email not delivered — provider not configured. Submission:",
      submission
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * Sends the enquiry via Resend's REST API (no SDK dependency required).
 * Returns false when email is not configured or delivery fails, so the caller
 * can fall back to logging. Swap this out for SMTP, a CRM or another provider
 * as needed — the route contract stays the same.
 */
async function deliver(s: Submission): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) return false;

  let to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    const site = await getSiteSettings();
    to = site.email;
  }

  const lines = [
    `Name:    ${s.name}`,
    `Email:   ${s.email}`,
    `Phone:   ${s.phone || "—"}`,
    `Company: ${s.company || "—"}`,
    `Service: ${s.service || "—"}`,
    "",
    s.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: s.email,
        subject: `New enquiry — ${s.service || "General"} (${s.name})`,
        text: lines,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[contact] delivery error:", err);
    return false;
  }
}
