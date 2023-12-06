import { type Metadata, type NextPage } from "next";
import Link from "next/link";

import { prisma } from "~/server/db";
import { redirect } from "next/navigation";

import { cn } from "~/utils/tw";
import RecipeCard from "~/components/recipe/RecipeCard";

const AMT_RECIPES = 12;

// * Browse Random / Trending Recipes Page
const RecipesPage: NextPage<PageProps> = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page ?? "1");

  if (!page || page <= 0) redirect("/recipes/?page=1");

  const numRecipes = await prisma.recipe.count();
  const numPages = Math.ceil(numRecipes / AMT_RECIPES);

  if (page > numPages) redirect("/recipes/?page=1");

  const recipes = await prisma.recipe.findMany({
    take: AMT_RECIPES,
    skip: (page - 1) * AMT_RECIPES,
    include: { author: { select: { name: true } } },
    orderBy: [
      { likedBy: { _count: "desc" } },
      { comments: { _count: "desc" } },
    ],
  });

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">Browse Recipes</h1>

      <div className="grid min-h-[40dvh] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>

      <Pagination numPages={numPages} page={page} />
    </div>
  );
};

export default RecipesPage;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "iCook | Browse",
};

const Pagination: React.FC<{ numPages: number; page: number }> = ({
  numPages,
  page,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="join">
        {Array.from({ length: numPages }, (_, i) => (
          <Link
            key={`page-${i + 1}`}
            href={`/recipes/?page=${i + 1}`}
            className={cn(
              "link-hover btn btn-neutral join-item link",
              page === i + 1 && "btn-active",
            )}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};
