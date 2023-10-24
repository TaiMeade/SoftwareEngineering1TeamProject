import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { createRecipeSchema } from "~/utils/schemas";

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

  const parsed = createRecipeSchema.safeParse(await req.json());

  if (!parsed.success) {
    console.error("Error parsing recipe", parsed.error);

    return NextResponse.json(parsed.error, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const data = parsed.data;

  try {
    const recipe = await prisma.recipe.create({
      data: {
        title: data.title,
        description: data.description,
        authorId: session.user.id,
        // image: data.image,
        image: "/placeholder.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: data.tags,
        ingredients: data.ingredients.map((ing) => ({
          name: ing,
          quantity: "",
          unit: "",
        })),
        directions: data.directions,
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
