"use server";

import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { USER_ROLES } from "@/types/content";
import { type ActionState, requireUser, fieldErrorsFromZod } from "./helpers";

const baseSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("Enter a valid email."),
  role: z.enum(USER_ROLES),
});

export async function saveUser(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();

  const id = String(formData.get("id") ?? "");
  const password = String(formData.get("password") ?? "");

  const parsed = baseSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? "").toLowerCase(),
    role: String(formData.get("role") ?? ""),
  });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsFromZod(parsed.error) };
  }

  // Password required when creating; optional when editing.
  if (!id && password.length < 8) {
    return { error: "Password is required.", fieldErrors: { password: "At least 8 characters." } };
  }
  if (password && password.length < 8) {
    return { error: "Password too short.", fieldErrors: { password: "At least 8 characters." } };
  }

  try {
    if (id) {
      await prisma.user.update({
        where: { id },
        data: {
          ...parsed.data,
          ...(password ? { passwordHash: await bcrypt.hash(password, 12) } : {}),
        },
      });
    } else {
      await prisma.user.create({
        data: { ...parsed.data, passwordHash: await bcrypt.hash(password, 12) },
      });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "That email is already registered.", fieldErrors: { email: "Email already in use." } };
    }
    throw e;
  }

  redirect("/admin/users");
}

export async function deleteUser(formData: FormData): Promise<void> {
  const current = await requireUser();
  const id = String(formData.get("id") ?? "");

  // Never let an admin delete themselves (avoids accidental lockout).
  if (id && id !== current.id) {
    const remaining = await prisma.user.count();
    if (remaining > 1) {
      await prisma.user.delete({ where: { id } });
    }
  }
  redirect("/admin/users");
}
