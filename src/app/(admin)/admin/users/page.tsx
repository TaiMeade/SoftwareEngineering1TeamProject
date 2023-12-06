import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";

import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

import ReportedUser from "~/components/report/ReportedUser";

// const AMT_RECIPES = 10;

const ReportedUsersPage: NextPage<PageProps> = async () => {
  const session = await getAuth();

  if (!session?.user?.id) return redirect("/login");
  if (session.user.role !== "ADMIN") return redirect("/");

  const reportedUsers = await prisma.report.findMany({
    where: {
      reportedComment: { is: null },
      reportedRecipe: { is: null },
      resolved: false,
    },
    include: {
      reporter: { select: { name: true, username: true, image: true } },
      reportedUser: { select: { name: true, username: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex w-full flex-col items-start justify-center gap-12">
      <h1 className="text-4xl font-bold">Reported Users Page</h1>

      <div className="flex w-full flex-col gap-4">
        {/* Map over reported users */}
        {reportedUsers.map((report) => (
          <ReportedUser key={report.id} report={report} />
        ))}
      </div>
      <div className="w-full pb-8" />
    </div>
  );
};

export default ReportedUsersPage;

export const metadata: Metadata = {
  title: "iCook | Reported Users",
};
