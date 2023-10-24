import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import AuthLayout from "~/components/auth/AuthLayout";
import ChangePassword from "~/components/profile/ChangePassword";
import { getAuth } from "~/server/session";

const ChangePasswordPage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold">Change Password</h1>
      <ChangePassword password={"changeME"} />
    </AuthLayout>
  );
};

export default ChangePasswordPage;

export const metadata: Metadata = {
  title: "iCook | Edit Profile",
};
