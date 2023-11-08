import { prisma } from "~/server/db";
import RecipeCard from "../recipe/RecipeCard";

const AMT_RECIPES = 6;

const FeaturedRecipes: React.FC = async () => {
//   const recipes = await prisma.recipe.groupBy({
//     take: AMT_RECIPES,
//     by: ['id'],
//     _count: {
//       likedBy: true,
//     }
//     where: { image: { not: null } },
//     include: {
//       comments: true,
//       author: { select: { name: true } },
//     },
//     orderBy: { _count },
  // });
// };

  return (
    <div>Test</div>
    // <div className="container mx-auto my-8">
    //   <h2 className="mb-4 text-3xl font-semibold">Featured Recipes</h2>
    //   <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
    //     {recipes.map((recipe) => (
    //       <RecipeCard key={recipe.id} recipe={recipe} />
    //     ))}
    //   </div>
    // </div>
  );
};

export default FeaturedRecipes;
