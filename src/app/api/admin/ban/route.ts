import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { banUserSchema } from "~/utils/schemas";

export async function POST(req: Request) {
  console.log("Banning User");
  const session = await getAuth();

  if (!session || !session?.user?.id) {
    console.error("Unauthorized request to Ban User");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    console.error("Unauthorized request to Ban User");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const parsed = banUserSchema.safeParse(await req.json());

  if (!parsed.success) {
    console.error("Error parsing: ", parsed.error);

    return NextResponse.json(parsed.error, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const data = parsed.data;

  try {
    const initialUser = await prisma.user.findUnique({
      where: { id: data.userId },
      select: { canPost: true },
    });

    const { canPost } = await prisma.user.update({
      where: { id: data.userId },
      data: { canPost: !initialUser?.canPost },
    });

    console.log("Ban User:", canPost);

    return NextResponse.json(!canPost, { status: 200, statusText: "OK" });
  } catch (error) {
    console.error("Error banning user", error);
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
