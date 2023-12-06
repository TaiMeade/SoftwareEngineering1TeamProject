import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";

import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

import ReportedRecipe from "~/components/report/ReportedRecipe";

// const AMT_RECIPES = 10;

const ReportedRecipesPage: NextPage<PageProps> = async () => {
  const session = await getAuth();

  if (!session?.user?.id) return redirect("/login");
  if (session.user.role !== "ADMIN") return redirect("/");

  const reportedRecipes = await prisma.report.findMany({
    where: { reportedRecipe: { isNot: null } },
    include: {
      reporter: { select: { name: true, username: true, image: true } },
      reportedUser: { select: { name: true, username: true, image: true } },
      reportedRecipe: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col items-start justify-center gap-12">
      <h1 className="text-4xl font-bold">Reported Recipes Page</h1>

      <div className="flex w-full flex-col gap-4">
        {/* Map over reported recipes */}
        {reportedRecipes.map((report) => (
          <ReportedRecipe key={report.id} report={report} />
        ))}
      </div>
      <div className="w-full pb-8" />
    </div>
  );
};

export default ReportedRecipesPage;

export const metadata: Metadata = {
  title: "iCook | Reported Recipes",
};
