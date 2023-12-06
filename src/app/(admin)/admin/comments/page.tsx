import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";

import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

import Image from "next/image";

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
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold">Reported Comments Page</h1>
      <div className="flex flex-row items-center gap-4">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="User Profile Picture"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover transition-all duration-300 ease-in-out hover:scale-110"
          />
        )}
        <h2 className="text-3xl font-medium">
          Welcome,{" "}
          {" " + (session.user.username ?? session.user.name ?? "User")}.
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        {/* Map over reported comments */}
      </div>
      <div className="w-full pb-8" />
    </div>
  );
};

export default ReportedCommentsPage;

export const metadata: Metadata = {
  title: "iCook | Profile",
};
