import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { editRecipeSchema } from "~/utils/schemas";

export async function POST(req: Request) {
  console.log("Editing recipe");
  const session = await getAuth();

  if (!session || !session?.user?.id) {
    console.error("Unauthorized request to edit recipe");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const parsed = editRecipeSchema.safeParse(await req.json());

  if (!parsed.success) {
    console.error("Error parsing recipe", parsed.error);

    return NextResponse.json(parsed.error, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { canPost: true },
  });

  if (!user?.canPost) {
    console.error("Unauthorized request to edit recipe");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const data = parsed.data;

  const recipeExists = await prisma.recipe.findUnique({
    where: { id: data.id },
  });

  if (!recipeExists) {
    console.error("Recipe does not exist");
    return NextResponse.json(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  if (recipeExists.authorId !== session.user.id) {
    console.error("Unauthorized request to edit recipe");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  try {
    // console.log("data.ingredients ", data.ingredients);
    const recipe = await prisma.recipe.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        authorId: session.user.id,
        image: data.image,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: data.tags,
        ingredients: data.ingredients || [],
        directions: data.directions || [],
      },
    });

    console.log("Edited recipe", recipe);

    return NextResponse.json(recipe, { status: 200, statusText: "OK" });
  } catch (error) {
    console.error("Error editing recipe", error);
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
