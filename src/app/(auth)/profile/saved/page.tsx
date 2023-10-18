import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import ProfileLayout from "~/components/auth/ProfileLayout";
import { getAuth } from "~/server/session";

const UserSavedRecipesPage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  return (
    <ProfileLayout>
      <div className="flex flex-col gap-12 pt-4">
        <h1 className="text-4xl font-bold">User Saved Recipes Page</h1>
      </div>
    </ProfileLayout>
  );
};

export default UserSavedRecipesPage;

export const metadata: Metadata = {
  title: "iCook | Saved Recipes",
};
