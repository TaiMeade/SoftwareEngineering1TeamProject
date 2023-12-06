import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";

import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

import Report from "~/components/report/Report";

const ReportsPage: NextPage<PageProps> = async () => {
  const session = await getAuth();

  if (!session?.user?.id) return redirect("/login");
  if (session.user.role !== "ADMIN") return redirect("/");

  const reports = await prisma.report.findMany({
    where: {
      resolved: false,
    },
    include: {
      reporter: { select: { name: true, username: true, image: true } },
      reportedUser: { select: { name: true, username: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col items-start justify-center gap-12">
      <h1 className="text-4xl font-bold">Reports Page</h1>

      <div className="flex w-full flex-col gap-4">
        {/* Map over reports */}
        {reports.map((report) => (
          <Report key={report.id} report={report} />
        ))}
      </div>
      <div className="w-full pb-8" />
    </div>
  );
};

export default ReportsPage;

export const metadata: Metadata = {
  title: "iCook | Reports",
};
