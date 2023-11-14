import { type Metadata, type NextPage } from "next";
import { prisma } from "~/server/db";

import NotFound from "~/components/recipe/NotFound";
import RecipePage from "~/components/recipe/RecipePage";

// * Browse Random / Trending Recipes Page
const RecipesPage: NextPage<RecipesPageProps> = async ({ params }) => {
  const id = params.id;

  if (!id || id.length < 1) {
    return <NotFound />; // notFound();
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      likedBy: { select: { _count: true } },
      author: { select: { name: true } },
      comments: {
        include: {
          author: {
            select: { name: true, id: true, username: true },
          },
        },
      },
    },
  });

  if (!recipe) {
    return <NotFound />; // notFound();
  }

  return (
    <div className="flex flex-col gap-12">
      <RecipePage recipe={recipe} likes={recipe.likedBy.length} />
    </div>
  );
};

export default RecipesPage;

export const metadata: Metadata = {
  title: "iCook | Recipe",
};
