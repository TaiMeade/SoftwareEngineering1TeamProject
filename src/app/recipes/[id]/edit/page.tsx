import { type Metadata, type NextPage } from "next";
import dynamic from "next/dynamic";

import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

import NotFound from "~/components/recipe/NotFound";

const EditRecipePage: NextPage<RecipesPageProps> = async ({ params }) => {
  const id = params.id;
  const session = await getAuth();

  if (!session?.user?.id || !id || id.length < 1) {
    return <NotFound />; // notFound();
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id },
  });

  const EditRecipeForm = dynamic(
    () => import("~/components/recipe/EditRecipeForm"),
  );

  if (!recipe || recipe.authorId !== session.user.id) {
    return <NotFound />; // notFound();
  }

  return (
    <>
      <h1 className="text-4xl font-bold"> Edit Recipe</h1>
     <EditRecipeForm />
    </>
  );
};

export default EditRecipePage;

export const metadata: Metadata = {
  title: "iCook | Edit Recipe",
};
