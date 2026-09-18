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
  listFromFormData,
  revalidatePublic,
} from "./helpers";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  shortName: z.string().trim().min(1, "Short name is required."),
  tagline: z.string().trim().min(1, "Tagline is required."),
  icon: z.string().refine(isIconName, "Pick a valid icon."),
  shortDescription: z.string().trim().min(1, "Short description is required."),
  overview: z.string().trim().min(1, "Overview is required."),
  imageAlt: z.string().trim().min(1, "Image alt text is required."),
  imagePlaceholder: z.string().trim().min(1, "Image placeholder is required."),
  imageCategory: z.string().trim().min(1, "Image category is required."),
  features: z.array(z.string()).min(1, "Add at least one feature."),
  outcomes: z.array(z.string()).min(1, "Add at least one outcome."),
});

export async function saveService(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();

  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const values = {
    name: String(formData.get("name") ?? ""),
    shortName: String(formData.get("shortName") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    icon: String(formData.get("icon") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    overview: String(formData.get("overview") ?? ""),
    imageAlt: String(formData.get("imageAlt") ?? ""),
    imagePlaceholder: String(formData.get("imagePlaceholder") ?? ""),
    imageCategory: String(formData.get("imageCategory") ?? ""),
    features: listFromFormData(formData, "features"),
    outcomes: listFromFormData(formData, "outcomes"),
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
      await prisma.service.update({ where: { id }, data });
    } else {
      await prisma.service.create({ data });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "A service with that slug already exists.", fieldErrors: { slug: "Slug already in use." } };
    }
    throw e;
  }

  revalidatePublic(["/services", `/services/${slug}`]);
  redirect("/admin/services");
}

export async function deleteService(formData: FormData): Promise<void> {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) {
    const svc = await prisma.service.delete({ where: { id } });
    revalidatePublic(["/services", `/services/${svc.slug}`]);
  }
  redirect("/admin/services");
}
