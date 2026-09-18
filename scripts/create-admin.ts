/**
 * Creates (or updates) an admin/editor user.
 *
 * Usage:
 *   npm run create-admin -- "Full Name" email@example.com "password" [ADMIN|EDITOR]
 * or run with no args to be prompted interactively.
 *
 * Re-running with an existing email updates that user's name/password/role.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const prisma = new PrismaClient();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(question);
  rl.close();
  return answer.trim();
}

async function main() {
  const [, , argName, argEmail, argPassword, argRole] = process.argv;

  const name = argName ?? (await prompt("Full name: "));
  const email = (argEmail ?? (await prompt("Email: "))).toLowerCase().trim();
  const password = argPassword ?? (await prompt("Password (min 8 chars): "));
  const role = (argRole ?? "ADMIN").toUpperCase() === "EDITOR" ? "EDITOR" : "ADMIN";

  if (!name || name.length < 2) throw new Error("Name is required.");
  if (!EMAIL_RE.test(email)) throw new Error("A valid email is required.");
  if (!password || password.length < 8)
    throw new Error("Password must be at least 8 characters.");

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    create: { name, email, passwordHash, role },
    update: { name, passwordHash, role },
  });

  console.log(`\n✔ User ready: ${user.email} (${user.role})`);
}

main()
  .catch((e) => {
    console.error("\n✖", e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
