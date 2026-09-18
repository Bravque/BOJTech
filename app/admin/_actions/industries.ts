"use server";

import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { isIconName } from "@/lib/icons";
import {
  type ActionState,
  requireUser,
  slugify,
  fieldErrorsFromZod,
  revalidatePublic,
} from "./helpers";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  icon: z.string().refine(isIconName, "Pick a valid icon."),
  description: z.string().trim().min(1, "Description is required."),
  imageAlt: z.string().trim().min(1, "Image alt text is required."),
  imagePlaceholder: z.string().trim().min(1, "Image placeholder is required."),
  imageCategory: z.string().trim().min(1, "Image category is required."),
});

export async function saveIndustry(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();

  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const values = {
    name: String(formData.get("name") ?? ""),
    icon: String(formData.get("icon") ?? ""),
    description: String(formData.get("description") ?? ""),
    imageAlt: String(formData.get("imageAlt") ?? ""),
    imagePlaceholder: String(formData.get("imagePlaceholder") ?? ""),
    imageCategory: String(formData.get("imageCategory") ?? ""),
  };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsFromZod(parsed.error) };
  }

  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || parsed.data.name);
  const image = String(formData.get("image") ?? "").trim() || null;
  const order = Number(formData.get("order") ?? 0) || 0;

  const data = { ...parsed.data, slug, image, order };

  try {
    if (id) {
      await prisma.industry.update({ where: { id }, data });
    } else {
      await prisma.industry.create({ data });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "An industry with that slug already exists.", fieldErrors: { slug: "Slug already in use." } };
    }
    throw e;
  }

  revalidatePublic(["/industries"]);
  redirect("/admin/industries");
}

export async function deleteIndustry(formData: FormData): Promise<void> {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) {
    await prisma.industry.delete({ where: { id } });
    revalidatePublic(["/industries"]);
  }
  redirect("/admin/industries");
}
