import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

import Image from "next/image";

import RecipeCard from "~/components/recipe/RecipeCard";

const AMT_OF_RECIPES = 10;

const UserProfilePage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  const recipes = await prisma.recipe.findMany({
    where: { authorId: session.user.id },
    take: AMT_OF_RECIPES,
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <h1 className="text-4xl font-bold">User Profile Page</h1>
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
          Welcome,{" "}
          {" " + (session.user.username ?? session.user.name ?? "User")}.
        </h2>
      </div>
      <h2>{session.user.bio ?? " "}</h2>

      <h1 className="text-2xl font-bold">Previously Created Recipes </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RecipeCard
          recipe={{
            id: "create",
            author: { name: session?.user?.name ?? "User" },
            authorId: session?.user?.id ?? "",
            createdAt: new Date(),
            updatedAt: new Date(),
            title: "Create a new recipe!",
            description: "Create a new recipe!",
            directions: [],
            image: "/placeholder.png",
            ingredients: [],
            tags: [],
          }}
        />

        {recipes?.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
      <div className="w-full pb-8" />
    </>
  );
};

export default UserProfilePage;

export const metadata: Metadata = {
  title: "iCook | Profile",
};
