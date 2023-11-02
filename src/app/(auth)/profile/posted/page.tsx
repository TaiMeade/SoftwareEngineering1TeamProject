import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

import Image from "next/image";

import RecipeCard from "~/components/recipe/RecipeCard";
import Link from "next/link";
import { cn } from "~/utils/tw";

const AMT_OF_RECIPES = 10;

const UserPostedRecipesPage: NextPage<PageProps> = async ({ searchParams }) => {
  let p = parseInt(searchParams?.p ?? "0");

  if (!p || p < 0) p = 0;

  const session = await getAuth();
  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  const recipes = await prisma.recipe.findMany({
    where: { authorId: session.user.id },
    take: AMT_OF_RECIPES,
    skip: p * AMT_OF_RECIPES,
    include: { author: { select: { name: true } }, _count: true },
    orderBy: { createdAt: "desc" },
  });

  const numRecipes = await prisma.recipe.count({
    where: { authorId: session.user.id },
  });

  const numPages = Math.ceil(numRecipes / AMT_OF_RECIPES);

  return (
    <>
      <h1 className="text-4xl font-bold">Your Posted Recipes Page</h1>
      <div className="flex flex-row items-center gap-4">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="User Profile Picture"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border border-slate-800 object-cover transition-all duration-300 ease-in-out hover:scale-110"
          />
        )}
        <h2 className="text-3xl font-medium">
          {session.user.username ?? session.user.name ?? "Your Profile"}
          {"'s"} Recipes
        </h2>
      </div>
      <h2>{session.user.bio ?? " "}</h2>

      <h1 className="text-2xl font-bold">Previously Created Recipes </h1>
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes?.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>

      <div className="join flex w-full justify-center">
        {Array.from({ length: numPages }, (_, i) => (
          <Link
            href={`/profile/posted/?p=${i}`}
            key={`/profile/posted/?p=${i}`}
            className={cn(
              "btn btn-neutral join-item",
              i === p && "brightness-50",
            )}
          >
            {i + 1}
          </Link>
        ))}
      </div>

      <div className="w-full pb-8" />
    </>
  );
};

export default UserPostedRecipesPage;

export const metadata: Metadata = {
  title: "iCook | Profile",
};
