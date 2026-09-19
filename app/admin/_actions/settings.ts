"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  type ActionState,
  requireUser,
  fieldErrorsFromZod,
  listFromFormData,
  revalidatePublic,
} from "./helpers";

const schema = z.object({
  name: z.string().trim().min(1, "Company name is required."),
  shortName: z.string().trim().min(1, "Short name is required."),
  legalName: z.string().trim().min(1, "Legal name is required."),
  tagline: z.string().trim().min(1, "Tagline is required."),
  description: z.string().trim().min(1, "Description is required."),
  longDescription: z.string().trim().min(1, "Long description is required."),
  url: z.string().trim().url("Enter a valid URL (including https://)."),
  email: z.string().trim().email("Enter a valid email."),
  salesEmail: z.string().trim(),
  phonePrimary: z.string().trim().min(1, "Primary phone is required."),
  phoneSecondary: z.string().trim(),
  location: z.string().trim().min(1, "Location is required."),
  heroImage: z.string().trim(),
  introImage: z.string().trim(),
});

export async function saveSettings(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();

  const parsed = schema.safeParse({
    name: String(formData.get("name") ?? ""),
    shortName: String(formData.get("shortName") ?? ""),
    legalName: String(formData.get("legalName") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    description: String(formData.get("description") ?? ""),
    longDescription: String(formData.get("longDescription") ?? ""),
    url: String(formData.get("url") ?? ""),
    email: String(formData.get("email") ?? ""),
    salesEmail: String(formData.get("salesEmail") ?? ""),
    phonePrimary: String(formData.get("phonePrimary") ?? ""),
    phoneSecondary: String(formData.get("phoneSecondary") ?? ""),
    location: String(formData.get("location") ?? ""),
    heroImage: String(formData.get("heroImage") ?? ""),
    introImage: String(formData.get("introImage") ?? ""),
  });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsFromZod(parsed.error) };
  }

  const addressLines = listFromFormData(formData, "addressLines");

  const hoursDays = formData.getAll("hoursDays").map(String);
  const hoursTime = formData.getAll("hoursTime").map(String);
  const hours = hoursDays
    .map((d, i) => ({ days: d.trim(), time: (hoursTime[i] ?? "").trim() }))
    .filter((h) => h.days || h.time);

  const socialLabel = formData.getAll("socialLabel").map(String);
  const socialHref = formData.getAll("socialHref").map(String);
  const socialIcon = formData.getAll("socialIcon").map(String);
  const socials = socialLabel
    .map((label, i) => ({
      label: label.trim(),
      href: (socialHref[i] ?? "").trim(),
      icon: (socialIcon[i] ?? "").trim(),
    }))
    .filter((s) => s.label && s.href);

  const data = { ...parsed.data, addressLines, hours, socials };

  await prisma.siteSetting.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });

  revalidatePublic(["/", "/contact", "/about"]);
  redirect("/admin/settings?saved=1");
}
