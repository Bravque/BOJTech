"use server";

import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { PROJECT_CATEGORIES } from "@/types/content";
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
  category: z.enum(PROJECT_CATEGORIES),
  client: z.string().trim().min(1, "Client is required."),
  year: z.string().trim().min(1, "Year is required."),
  description: z.string().trim().min(1, "Description is required."),
  imageAlt: z.string().trim().min(1, "Image alt text is required."),
  imagePlaceholder: z.string().trim().min(1, "Image placeholder is required."),
  imageCategory: z.string().trim().min(1, "Image category is required."),
  tags: z.array(z.string()).min(1, "Add at least one tag."),
});

export async function saveProject(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();

  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const values = {
    name: String(formData.get("name") ?? ""),
    category: String(formData.get("category") ?? ""),
    client: String(formData.get("client") ?? ""),
    year: String(formData.get("year") ?? ""),
    description: String(formData.get("description") ?? ""),
    imageAlt: String(formData.get("imageAlt") ?? ""),
    imagePlaceholder: String(formData.get("imagePlaceholder") ?? ""),
    imageCategory: String(formData.get("imageCategory") ?? ""),
    tags: listFromFormData(formData, "tags"),
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
      await prisma.project.update({ where: { id }, data });
    } else {
      await prisma.project.create({ data });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "A project with that slug already exists.", fieldErrors: { slug: "Slug already in use." } };
    }
    throw e;
  }

  revalidatePublic(["/portfolio", `/portfolio/${slug}`]);
  redirect("/admin/portfolio");
}

export async function deleteProject(formData: FormData): Promise<void> {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) {
    const project = await prisma.project.delete({ where: { id } });
    revalidatePublic(["/portfolio", `/portfolio/${project.slug}`]);
  }
  redirect("/admin/portfolio");
}
