import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
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
    // silently lost. Set SMTP_HOST + SMTP_USER + SMTP_PASSWORD to enable email
    // delivery (see .env.example).
    console.warn(
      "[contact] Email not delivered — SMTP not configured. Submission:",
      submission
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * Sends the enquiry over SMTP via Nodemailer (e.g. a Hostinger mailbox).
 * Returns false when email is not configured or delivery fails, so the caller
 * can fall back to logging. Swap this out for an HTTP API, a CRM or another
 * provider as needed — the route contract stays the same.
 */
async function deliver(s: Submission): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return false;

  // Port 465 uses implicit TLS; 587 (and others) upgrade via STARTTLS.
  const port = Number(process.env.SMTP_PORT) || 465;
  // Most mailboxes require the From address to match the authenticated user.
  const from = process.env.CONTACT_FROM_EMAIL || user;

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
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from,
      to,
      replyTo: s.email,
      subject: `New enquiry — ${s.service || "General"} (${s.name})`,
      text: lines,
    });
    // Log the SMTP server's actual response so a successful send is visible in
    // the logs (accepted/rejected recipients + the server's reply line).
    console.log("[contact] Email sent:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });
    return true;
  } catch (err) {
    // Log nodemailer's structured error fields (code/response) — far more
    // useful than the raw object for diagnosing SMTP failures.
    const e = err as {
      message?: string;
      code?: string;
      command?: string;
      response?: string;
      responseCode?: number;
    };
    console.error("[contact] delivery error:", {
      message: e?.message,
      code: e?.code,
      command: e?.command,
      responseCode: e?.responseCode,
      response: e?.response,
    });
    return false;
  }
}
