import { type NextPage, type Metadata, type ResolvingMetadata } from "next";

import { prisma } from "~/server/db";
import { generateRecipeSEO } from "~/utils/seo";

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

export const generateMetadata = async (
  { params }: RecipesPageProps,
  _parent: ResolvingMetadata,
): Promise<Metadata> => {
  const id = params.id;

  if (!id || id.length < 1) {
    return { title: "iCook | Recipe" };
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          username: true,
          name: true,
          id: true,
        },
      },
    },
  });

  if (!recipe) {
    return { title: "iCook | Recipe" };
  }

  return generateRecipeSEO(recipe);
};
