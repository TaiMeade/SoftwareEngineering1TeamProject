import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

import { getAuth } from "~/server/session";
import { prisma } from "~/server/db";

const ChangePassword = dynamic(
  () => import("~/components/profile/ChangePassword"),
);

const ChangePasswordPage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  let pass = "Change Password";

  const dbPass = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true },
  });

  if (dbPass?.password) pass = dbPass.password;

  return (
    <>
      <h1 className="text-4xl font-bold">Change Password</h1>

      <ChangePassword password={pass} />
    </>
  );
};

export default ChangePasswordPage;

export const metadata: Metadata = {
  title: "iCook | Edit Profile",
};
