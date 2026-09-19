"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  type ActionState,
  requireUser,
  fieldErrorsFromZod,
  revalidatePublic,
} from "./helpers";

const schema = z.object({
  name: z.string().trim().min(1, "Client name is required."),
});

export async function saveClient(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();

  const parsed = schema.safeParse({ name: String(formData.get("name") ?? "") });
  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: fieldErrorsFromZod(parsed.error),
    };
  }

  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const logo = String(formData.get("logo") ?? "").trim() || null;
  const url = String(formData.get("url") ?? "").trim() || null;
  const order = Number(formData.get("order") ?? 0) || 0;
  const data = { ...parsed.data, logo, url, order };

  if (id) await prisma.client.update({ where: { id }, data });
  else await prisma.client.create({ data });

  revalidatePublic(["/"]);
  redirect("/admin/clients");
}

export async function deleteClient(formData: FormData): Promise<void> {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await prisma.client.delete({ where: { id } });
  revalidatePublic(["/"]);
  redirect("/admin/clients");
}
