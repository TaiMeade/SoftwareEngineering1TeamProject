import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import ProfileSideBar from "~/components/auth/ProfileSideBar";
import UpdateUserForm from "~/components/profile/UpdateUserForm";
import { getAuth } from "~/server/session";

const UserSettingsPage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-row items-start gap-12">
      <ProfileSideBar />

      <UpdateUserForm
        bio={session.user.bio}
        userImage={session.user.image}
        username={""}
        password={"********"}
      />
    </div>
  );
};

export default UserSettingsPage;

export const metadata: Metadata = {
  title: "iCook | Profile",
};
