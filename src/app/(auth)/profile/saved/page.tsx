import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import ProfileSideBar from "~/components/auth/ProfileSideBar";
import { getAuth } from "~/server/session";

const UserSavedRecipesPage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-row items-start gap-12">
      <ProfileSideBar />

      <div className="flex flex-col gap-12 pt-4">
        <h1 className="text-4xl font-bold">User Saved Recipes Page</h1>
      </div>
    </div>
  );
};

export default UserSavedRecipesPage;

export const metadata: Metadata = {
  title: "iCook | Profile",
};
