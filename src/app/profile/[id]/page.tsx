import { type Metadata, type NextPage } from "next";
import { prisma } from "~/server/db";

import { generateAuthorSEO } from "~/utils/seo";
import { omitProfile } from "~/utils";

import Image from "next/image";
import { getAuth } from "~/server/session";

import UserNotFound from "~/components/profile/UserNotFound";
import RecipeCard from "~/components/recipe/RecipeCard";
import ReportButton from "~/components/report/ReportButton";
import BanButton from "~/components/admin/BanButton";

interface RecipesPageProps {
  params: { id: string };
  searchParams: {
    [key: string]: string | string[];
  };
}

const RECIPES_AMT = 25;

// * Browse Random / Trending Recipes Page
const PublicProfilePage: NextPage<RecipesPageProps> = async ({ params }) => {
  const id = params.id;
  const session = await getAuth();

  if (!id || id.length < 1) {
    console.log("No ID");
    return <UserNotFound />; // notFound();
  }

  const user = await prisma.user.findFirst({
    where: { OR: [{ username: id }, { id }] },
    include: { recipes: { take: RECIPES_AMT } },
  });

  if (!user) return <UserNotFound />; // notFound();

  const safeUser = omitProfile(user);

  const recipes = await prisma.recipe.findMany({
    where: { authorId: safeUser.id },
    include: { author: { select: { name: true } }, _count: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col items-center gap-12">
      {safeUser.image && (
        <Image
          src={safeUser.image}
          alt="User Profile Picture"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full border border-slate-800 object-cover transition-all duration-300 ease-in-out"
        />
      )}
      <div className="flex flex-row items-center gap-4">
        {session?.user?.id && (
          <ReportButton
            reportedId={safeUser.id}
            reporterId={session?.user.id}
          />
        )}
        {session?.user?.role === "ADMIN" && (
          <BanButton userId={safeUser.id} canPost={safeUser.canPost} />
        )}
      </div>
      <h1 className="text-4xl font-bold">
        {safeUser.username ?? safeUser.name ?? safeUser.id}
      </h1>
      <h2>{safeUser.bio ?? " "}</h2>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes?.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
};

export default PublicProfilePage;

export const generateMetadata = async ({
  params,
}: RecipesPageProps): Promise<Metadata> => {
  const id = params.id;

  if (!id || id.length < 1) return { title: "iCook | User Page" };

  const profile = await prisma.user.findFirst({
    where: { OR: [{ username: id }, { id }] },
    include: { recipes: { take: RECIPES_AMT } },
  });

  if (!profile) return { title: "iCook | User Page" };

  const safeProfile = omitProfile(profile);

  return generateAuthorSEO(safeProfile);
};
