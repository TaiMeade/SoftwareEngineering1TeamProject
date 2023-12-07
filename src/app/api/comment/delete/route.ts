import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { deleteCommentSchema } from "~/utils/schemas";

export async function POST(req: Request) {
  console.log("Deleting recipe");
  const session = await getAuth();

  if (!session || !session?.user?.id) {
    console.error("Unauthorized request to delete recipe");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const parsed = deleteCommentSchema.safeParse(await req.json());

  if (!parsed.success) {
    console.error("Error parsing recipe", parsed.error);

    return NextResponse.json(parsed.error, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const data = parsed.data;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: data.id },
      select: { authorId: true },
    });

    if (!comment) {
      console.error("Recipe not found");
      return NextResponse.json(null, {
        status: 404,
        statusText: "Not Found",
      });
    }

    if (comment.authorId !== session.user.id && session.user.role !== "ADMIN") {
      console.error("Unauthorized request to delete recipe");
      return NextResponse.json(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    await prisma.comment.delete({
      where: { id: data.id },
    });

    console.log("Deleted comment", comment);

    return NextResponse.json(comment, { status: 200, statusText: "OK" });
  } catch (error) {
    console.error("Error deleting comment", error);
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
