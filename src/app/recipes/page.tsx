import { type Metadata, type NextPage } from "next";
import RecipeCard from "~/components/recipe/RecipeCard";
import { prisma } from "~/server/db";

// * Browse Random / Trending Recipes Page
const RecipesPage: NextPage = async () => {
  const recipes = await prisma.recipe.findMany({
    take: 10,
  });

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">Browse Recipes Page</h1>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
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
