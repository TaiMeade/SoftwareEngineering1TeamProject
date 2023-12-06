import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";

import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

import ReportedComment from "~/components/report/ReportedComment";

// const AMT_RECIPES = 10;

const ReportedCommentsPage: NextPage<PageProps> = async () => {
  const session = await getAuth();

  if (!session?.user?.id) return redirect("/login");
  if (session.user.role !== "ADMIN") return redirect("/");

  const reportedComments = await prisma.report.findMany({
    where: { reportedComment: { isNot: null } },
    include: {
      reporter: { select: { username: true, image: true } },
      reportedUser: { select: { username: true, image: true } },
      reportedComment: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col items-start justify-center gap-12">
      <h1 className="text-4xl font-bold">Reported Comments Page</h1>

      <div className="flex w-full flex-col gap-4">
        {/* Map over reported comments */}
        {reportedComments.map((report) => (
          <ReportedComment key={report.id} report={report} />
        ))}
      </div>
      <div className="w-full pb-8" />
    </div>
  );
};

export default ReportedCommentsPage;

export const metadata: Metadata = {
  title: "iCook | Reported Comments",
};
