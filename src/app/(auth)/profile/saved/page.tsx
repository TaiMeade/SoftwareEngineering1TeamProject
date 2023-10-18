import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import AuthLayout from "~/components/auth/AuthLayout";
import { getAuth } from "~/server/session";

const UserSavedRecipesPage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold">User Saved Recipes Page</h1>
    </AuthLayout>
  );
};

export default UserSavedRecipesPage;

export const metadata: Metadata = {
  title: "iCook | Saved Recipes",
};
