import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { createCommentSchema } from "~/utils/schemas";
import Filter from "bad-words";

export async function POST(req: Request) {
  console.log("Creating comment");
  const session = await getAuth();

  if (!session || !session?.user?.id) {
    console.error("Unauthorized request to comment on recipe");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.canPost) {
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const parsed = createCommentSchema.safeParse(await req.json());

  if (!parsed.success) {
    console.error("Error parsing create recipe", parsed.error);

    return NextResponse.json(parsed.error, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const data = parsed.data;
  const filter = new Filter();
  const cleanText = filter.clean(data.text);

  try {
    const comment = await prisma.comment.create({
      data: {
        text: cleanText,
        author: { connect: { id: session.user.id } },
        recipe: { connect: { id: data.recipeId } },
        // If the comment is a reply, we need to connect it to the parent comment
        ...(data.commentId && {
          parentComment: { connect: { id: data.commentId } },
        }),
      },
    });

    return NextResponse.json(comment, {
      status: 201,
      statusText: "Created",
    });
  } catch (error) {
    console.error("Error creating comment", error);

    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
