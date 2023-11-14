import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { updateLikedBySchema } from "~/utils/schemas";
import { toast } from "sonner";

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
        statusText: "Recipe Not Found",
      });
    }

    if (recipe.authorId === session.user.id) {
      console.error("Cannot like own recipe");
      toast.error("Cannot like own recipe");
      return NextResponse.json(null, {
        status: 401,
        statusText: "Cannot like own recipe",
      });
    }

    const likedBy = await prisma.recipe.findUnique({
      where: { id: data.id },
      select: { likedBy: true },
    });

    // creating an array of user ID's to compare to
    const userIDArray = likedBy?.likedBy.map((user) => user.id);

    // Liked or unlike recipe
    const liked = userIDArray?.includes(session.user.id);

    if (liked) {
      await prisma.recipe.update({
        where: { id: data.id },
        data: {
          likedBy: { disconnect: { id: session.user.id } },
        },
      });
      console.log("Unliked recipe", recipe);
    } else {
      await prisma.recipe.update({
        where: { id: data.id },
        data: {
          likedBy: { connect: { id: session.user.id } },
        },
      });
      console.log("Liked recipe", recipe);
    }

    // Return if liked or not
    return NextResponse.json(liked, { status: 200, statusText: "OK" });
  } catch (error) {
    console.error("Error liking recipe", error);
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
