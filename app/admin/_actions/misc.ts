"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { isIconName } from "@/lib/icons";
import {
  type ActionState,
  requireUser,
  fieldErrorsFromZod,
  revalidatePublic,
} from "./helpers";

// ---------------------------------------------------------------- Core values

const iconItemSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  description: z.string().trim().min(1, "Description is required."),
  icon: z.string().refine(isIconName, "Pick a valid icon."),
});

function readIconItem(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    icon: String(formData.get("icon") ?? ""),
  };
}

export async function saveCoreValue(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireUser();
  const parsed = iconItemSchema.safeParse(readIconItem(formData));
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsFromZod(parsed.error) };
  }
  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const order = Number(formData.get("order") ?? 0) || 0;
  const data = { ...parsed.data, order };
  if (id) await prisma.coreValue.update({ where: { id }, data });
  else await prisma.coreValue.create({ data });
  revalidatePublic(["/about"]);
  redirect("/admin/values");
}

export async function deleteCoreValue(formData: FormData): Promise<void> {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await prisma.coreValue.delete({ where: { id } });
  revalidatePublic(["/about"]);
  redirect("/admin/values");
}

// ---------------------------------------------------------------- Why choose

export async function saveWhyChoose(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireUser();
  const parsed = iconItemSchema.safeParse(readIconItem(formData));
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsFromZod(parsed.error) };
  }
  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const order = Number(formData.get("order") ?? 0) || 0;
  const data = { ...parsed.data, order };
  if (id) await prisma.whyChoose.update({ where: { id }, data });
  else await prisma.whyChoose.create({ data });
  revalidatePublic(["/", "/industries"]);
  redirect("/admin/why-choose");
}

export async function deleteWhyChoose(formData: FormData): Promise<void> {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await prisma.whyChoose.delete({ where: { id } });
  revalidatePublic(["/", "/industries"]);
  redirect("/admin/why-choose");
}

// ---------------------------------------------------------------- Stats

const statSchema = z.object({
  value: z.string().trim().min(1, "Value is required."),
  suffix: z.string().trim(),
  label: z.string().trim().min(1, "Label is required."),
  shortLabel: z.string().trim().min(1, "Short label is required."),
});

export async function saveStat(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireUser();
  const parsed = statSchema.safeParse({
    value: String(formData.get("value") ?? ""),
    suffix: String(formData.get("suffix") ?? ""),
    label: String(formData.get("label") ?? ""),
    shortLabel: String(formData.get("shortLabel") ?? ""),
  });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsFromZod(parsed.error) };
  }
  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const order = Number(formData.get("order") ?? 0) || 0;
  const data = { ...parsed.data, order };
  if (id) await prisma.stat.update({ where: { id }, data });
  else await prisma.stat.create({ data });
  revalidatePublic(["/about"]);
  redirect("/admin/stats");
}

export async function deleteStat(formData: FormData): Promise<void> {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await prisma.stat.delete({ where: { id } });
  revalidatePublic(["/about"]);
  redirect("/admin/stats");
}
