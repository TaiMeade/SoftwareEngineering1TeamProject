import { type Metadata, type NextPage } from "next";

import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

import NotFound from "~/components/recipe/NotFound";

const EditRecipePage: NextPage<RecipesPageProps> = async ({ params }) => {
  const session = await getAuth();
  const id = params.id;

  if (!session?.user?.id) {
    return <NotFound />; // notFound();
  }

  if (!id || id.length < 1) {
    return <NotFound />; // notFound();
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id },
  });

  if (!recipe) {
    return <NotFound />; // notFound();
  }

  if (recipe.authorId !== session.user.id) {
    return <NotFound />; // notFound();
  }

  return <div>Just some place holder words</div>;
};

export default EditRecipePage;

export const metadata: Metadata = {
  title: "iCook | Edit Recipe",
};
