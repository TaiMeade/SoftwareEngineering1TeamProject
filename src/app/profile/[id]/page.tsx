import { type Metadata, type NextPage } from "next";
import NotFound from "~/components/recipe/NotFound";
import { prisma } from "~/server/db";

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
    // Need new not found
    return <NotFound />; // notFound();
  }

  const user = await prisma.user.findUnique({
    where: { id },
    include: { recipes: { take: 5 } },
  });

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">User {id} Page</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default RecipesPage;

export const metadata: Metadata = {
  title: "iCook | User Page",
};
