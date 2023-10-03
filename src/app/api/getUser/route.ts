import { NextResponse } from "next/server";
import { prisma } from "~/server/db";

export async function GET(_req: Request) {
  const firstUser = await prisma.user.findFirst();
  return NextResponse.json(firstUser, { status: 200 });
}
