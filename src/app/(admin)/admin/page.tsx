import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

import Image from "next/image";

const AdminPage: NextPage = async () => {
  const session = await getAuth();

  // * If user is not admin, redirect to login page.
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return redirect("/login");
  }

  const NUM_USERS = await prisma.user.count();
  const NUM_RECIPES = await prisma.recipe.count();
  const NUM_COMMENTS = await prisma.comment.count();
  const NUM_REPORTS = await prisma.report.count();

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

      <div className="flex flex-col gap-6 py-12">
        <h2 className="text-2xl font-medium">Total Users: {NUM_USERS}</h2>
        <h2 className="text-2xl font-medium">Total Recipes: {NUM_RECIPES}</h2>
        <h2 className="text-2xl font-medium">Total Comments: {NUM_COMMENTS}</h2>
        <h2 className="text-2xl font-medium">Total Reports: {NUM_REPORTS}</h2>
      </div>
      <div className="w-full pb-8" />
    </div>
  );
};

export default AdminPage;

export const metadata: Metadata = {
  title: "iCook | Admin",
};
