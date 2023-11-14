import { type Metadata, type NextPage } from "next";
import { prisma } from "~/server/db";

import { generateAuthorSEO } from "~/utils/seo";
import { omitProfile } from "~/utils";

import UserNotFound from "~/components/profile/UserNotFound";

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

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">
        User {safeUser.username ?? safeUser.name ?? safeUser.id} Page
      </h1>

      <pre className="max-w-full overflow-hidden">
        {JSON.stringify(safeUser, null, 2)}
      </pre>
    </div>
  );
};

export default PublicProfilePage;

// export const metadata: Metadata = {
//   title: "iCook | User Page",
// };

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
