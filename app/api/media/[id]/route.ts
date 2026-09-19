import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Streams an admin-uploaded image stored in the Media table (see the upload
// route). Content records reference these as `/api/media/<id>`.
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const media = await prisma.media
    .findUnique({
      where: { id: params.id },
      select: { data: true, mimeType: true },
    })
    .catch(() => null);

  if (!media) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(new Uint8Array(media.data), {
    headers: {
      "Content-Type": media.mimeType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
