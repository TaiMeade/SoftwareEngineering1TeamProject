import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

import Image from "next/image";

const NUM_USERS = 10;

const AdminPage: NextPage = async () => {
  const session = await getAuth();

  // * If user is not admin, redirect to login page.
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return redirect("/login");
  }

  const usersWithReports = await prisma.user.findMany({
    take: NUM_USERS,
    where: { reportsReceived: { some: { resolved: false } } },
    select: {
      id: true,
      username: true,
      name: true,
      image: true,
      bio: true,
      reportsReceived: {
        include: {
          reporter: { select: { username: true } },
          reportedUser: { select: { username: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold">Admin Page</h1>
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
        {usersWithReports.map((user) => (
          <div
            key={user.id}
            className="flex flex-row items-center gap-4 rounded-lg bg-gray-100 p-4"
          >
            {user.image && (
              <Image
                src={user.image}
                alt="User Profile Picture"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover transition-all duration-300 ease-in-out hover:scale-110"
              />
            )}
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-medium">{user.username}</h3>
              <p className="text-gray-500">{user.bio}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Reports</h3>
              {user.reportsReceived.map((report) => (
                <div
                  key={report.id}
                  className="flex flex-col gap-1 rounded-lg bg-gray-200 p-2"
                >
                  <p className="text-gray-500">
                    {report.reporter.username} reported{" "}
                    {report.reportedUser.username}
                  </p>
                  <p className="text-gray-500">{report.reason}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full pb-8" />
    </div>
  );
};

export default AdminPage;

export const metadata: Metadata = {
  title: "iCook | Profile",
};
