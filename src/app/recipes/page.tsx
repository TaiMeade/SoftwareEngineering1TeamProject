import { type Metadata, type NextPage } from "next";
import RecipeCard from "~/components/recipe/RecipeCard";
import { prisma } from "~/server/db";

const AMT_OF_RECIPES = 30;

// * Browse Random / Trending Recipes Page
const RecipesPage: NextPage = async () => {
  const recipes = await prisma.recipe.findMany({
    take: AMT_OF_RECIPES,
    include: { author: { select: { name: true } } },
    orderBy: { comments: { _count: "desc" } },
  });

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">Browse Recipes Page</h1>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipesPage;

export const metadata: Metadata = {
  title: "iCook | Browse",
};
