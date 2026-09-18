import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";

export type ActionState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export { requireUser };

/** URL-safe slug from a string. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Flatten a ZodError into a { field: message } map for the form UI. */
export function fieldErrorsFromZod(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** Non-empty trimmed strings from repeated form fields (ListEditor). */
export function listFromFormData(formData: FormData, name: string): string[] {
  return formData
    .getAll(name)
    .map((v) => String(v).trim())
    .filter(Boolean);
}

/** Revalidate the public routes affected by a content change. */
export function revalidatePublic(paths: string[]) {
  for (const p of paths) revalidatePath(p);
  // Home and sitemap aggregate most content types.
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
}
