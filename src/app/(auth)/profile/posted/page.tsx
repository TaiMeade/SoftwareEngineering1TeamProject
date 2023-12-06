import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";

import { getAuth } from "~/server/session";

import { prisma } from "~/server/db";

import Link from "next/link";
import Image from "next/image";

import { cn } from "~/utils/tw";
import RecipeCard from "~/components/recipe/RecipeCard";
import SelectTags from "./SelectTags";
import { parseTags } from "~/utils/schemas";

const AMT_RECIPES = 10;

const parseTagsParams = (tags: string): string[] => {
  return parseTags(tags);
};

const UserPostedRecipesPage: NextPage<PageProps> = async ({ searchParams }) => {
  const session = await getAuth();
  if (!session?.user?.id) return redirect("/login");

  const page = parseInt(searchParams?.page ?? "1");
  if (!page || page <= 0) return redirect("/profile/posted/?page=1");

  const tags = parseTagsParams(searchParams?.tags ?? "");
  console.log(tags);

  const recipes = await prisma.recipe.findMany({
    where: { authorId: session.user.id },
    take: AMT_RECIPES,
    skip: (page - 1) * AMT_RECIPES,
    include: {
      author: { select: { name: true } },
      _count: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const numRecipes = await prisma.recipe.count({
    where: { authorId: session.user.id },
  });

  const numPages = Math.ceil(numRecipes / AMT_RECIPES);

  return (
    <>
      <div className="flex flex-col items-start gap-12">
        <h1 className="text-4xl font-bold">Your Posted Recipes</h1>
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

        <p>{session.user.bio ?? " "}</p>

        <div className="h-[0.1rem] w-full rounded-full bg-gray-400" />
      </div>

      {/* Tags Selector */}
      <SelectTags page={page} tags={tags} />

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes?.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>

      <div className="join flex w-full justify-center">
        {Array.from({ length: numPages }, (_, i) => (
          <Link
            key={`/profile/posted/?page=${i + 1}`}
            href={`/profile/posted/?page=${i + 1}`}
            className={cn(
              "btn btn-neutral join-item",
              i + 1 === page && "btn-active",
            )}
          >
            {i + 1}
          </Link>
        ))}
      </div>

      <div className="w-full pb-8 sm:hidden" />
    </>
  );
};

export default UserPostedRecipesPage;

export const metadata: Metadata = {
  title: "iCook | Profile",
};
