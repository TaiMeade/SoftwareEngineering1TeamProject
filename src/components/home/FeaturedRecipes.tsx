import { prisma } from "~/server/db";
import RecipeCard from "../recipe/RecipeCard";

const AMT_RECIPES = 6;

const FeaturedRecipes: React.FC = async () => {
  const recipes = await prisma.recipe.findMany({
    take: AMT_RECIPES,
    where: { image: { not: null } },
    include: {
      comments: true,
      author: { select: { name: true } },
    },
    orderBy: [{ weight: "desc" }, { likedBy: { _count: "desc" } }],
  });

  return (
    <div className="container mx-auto my-8">
      <h2 className="mb-4 text-3xl font-semibold">Featured Recipes</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedRecipes;
