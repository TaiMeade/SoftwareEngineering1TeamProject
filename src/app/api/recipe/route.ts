import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { createRecipeSchema } from "~/utils/schemas";
import Filter from "bad-words";

export async function POST(req: Request) {
  console.log("Creating recipe");
  const session = await getAuth();

  if (!session || !session?.user?.id) {
    console.error("Unauthorized request to create recipe");
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

  const parsed = createRecipeSchema.safeParse(await req.json());

  if (!parsed.success) {
    console.error("Error parsing recipe", parsed.error);

    return NextResponse.json(parsed.error, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const data = parsed.data;
  const filter = new Filter();

  const recipeTitle = filter.clean(data.title);
  const newDescription = filter.clean(data.description);

  try {
    // console.log("data.ingredients ", data.ingredients);
    const recipe = await prisma.recipe.create({
      data: {
        title: recipeTitle,
        description: newDescription,
        authorId: session.user.id,
        image: data.image,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: data.tags,
        ingredients: data.ingredients || [],
        directions: data.directions || [],
      },
    });

    console.log("Created recipe", recipe);

    return NextResponse.json(recipe, { status: 200, statusText: "OK" });
  } catch (error) {
    console.error("Error creating recipe", error);
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
