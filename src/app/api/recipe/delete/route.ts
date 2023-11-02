import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { deleteRecipeSchema } from "~/utils/schemas";

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

  const parsed = deleteRecipeSchema.safeParse(await req.json());

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

    if (recipe.authorId !== session.user.id && session.user.role !== "ADMIN") {
      console.error("Unauthorized request to delete recipe");
      return NextResponse.json(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    await prisma.recipe.delete({
      where: { id: data.id },
    });

    console.log("Deleted recipe", recipe);

    return NextResponse.json(recipe, { status: 200, statusText: "OK" });
  } catch (error) {
    console.error("Error deleting recipe", error);
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
