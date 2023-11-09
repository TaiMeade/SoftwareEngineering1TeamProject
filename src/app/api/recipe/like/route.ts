import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { updateLikedBySchema } from "~/utils/schemas";

export async function POST(req: Request) {
  console.log("Liking recipe");
  const session = await getAuth();

  if (!session) {
    console.error("Unauthorized request to like recipe");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const parsed = updateLikedBySchema.safeParse(await req.json());

  if (!parsed.success) {
    console.error("Error parsing recipe", parsed.error);

    return NextResponse.json(parsed.error, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const data = parsed.data;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: data.id },
      select: { authorId: true },
    });

    if (!recipe) {
      console.error("Recipe not found");
      return NextResponse.json(null, {
        status: 404,
        statusText: "Not Found",
      });
    }

    if (recipe.authorId === session.user.id) {
      console.error("Cannot like own recipe");
      return NextResponse.json(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    await prisma.recipe.update({
      where: { id: data.id },
      data: {
        likedBy: { connect: { id: session.user.id } },
      },
    });


    console.log("Liked recipe", recipe);

    return NextResponse.json(recipe, { status: 200, statusText: "OK" });
  } catch (error) {
    console.error("Error liking recipe", error);
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
