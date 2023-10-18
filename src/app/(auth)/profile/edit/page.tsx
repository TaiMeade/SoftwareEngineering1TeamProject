import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import ProfileLayout from "~/components/auth/ProfileLayout";
import ProfileSideBar from "~/components/auth/ProfileSideBar";
import UpdateUserForm from "~/components/profile/UpdateUserForm";
import { getAuth } from "~/server/session";

const EditProfilePage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  return (
    <ProfileLayout>
      <UpdateUserForm
        bio={session.user.bio}
        userImage={session.user.image}
        username={session.user.username}
        password={"password"}
      />
    </ProfileLayout>
  );
};

export default EditProfilePage;

export const metadata: Metadata = {
  title: "iCook | Edit Profile",
};
