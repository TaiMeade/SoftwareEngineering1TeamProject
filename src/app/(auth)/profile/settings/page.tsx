import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import AuthLayout from "~/components/auth/AuthLayout";
import { getAuth } from "~/server/session";

const UserSettingsPage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold">User Settings Page</h1>

      {/* Dark Mode?, Email Notifications?, and Privacy. */}
    </AuthLayout>
  );
};

export default UserSettingsPage;

export const metadata: Metadata = {
  title: "iCook | Profile Settings",
};
