import { type Metadata, type NextPage } from "next";
import { prisma } from "~/server/db";

import NotFound from "~/components/recipe/NotFound";
import RecipePage from "~/components/recipe/RecipePage";

interface RecipesPageProps {
  params: { id: string };
  searchParams: {
    [key: string]: string | string[];
  };
}

// * Browse Random / Trending Recipes Page
const RecipesPage: NextPage<RecipesPageProps> = async ({ params }) => {
  const id = params.id;

  if (!id || id.length < 1) {
    return <NotFound />; // notFound();
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id },
  });

  if (!recipe) {
    return <NotFound />; // notFound();
  }

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">Recipe Page</h1>

      <RecipePage recipe={recipe} />
    </div>
  );
};

export default RecipesPage;

export const metadata: Metadata = {
  title: "iCook | Recipe",
};
