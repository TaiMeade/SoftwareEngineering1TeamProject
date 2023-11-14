import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { featureRecipeSchema } from "~/utils/schemas";

export async function POST(req: Request) {
  console.log("Featuring recipe");
  const session = await getAuth();

  if (!session) {
    console.error("Unauthorized request to feature recipe");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const parsed = featureRecipeSchema.safeParse(await req.json());

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
    });

    if (!recipe) {
      console.error("Recipe not found");
      return NextResponse.json(null, {
        status: 404,
        statusText: "Not Found",
      });
    }

    const featured = recipe?.featured === false;

    if (featured) {
      await prisma.recipe.update({
        where: { id: data.id },
        data: {
          featured: true,
        },
      });
      console.log("Featured recipe", recipe);
    } else {
      await prisma.recipe.update({
        where: { id: data.id },
        data: {
          featured: false,
        },
      });
      console.log("Unfeatured recipe", recipe);
    }

    return NextResponse.json(featured, { status: 200, statusText: "OK" });
  } catch (error) {
    console.error("Error featuring recipe", error);
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
