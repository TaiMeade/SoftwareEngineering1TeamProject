import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import AuthLayout from "~/components/auth/AuthLayout";
import UpdateUserForm from "~/components/profile/UpdateUserForm";
import { getAuth } from "~/server/session";

const EditProfilePage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold">Edit Profile Page</h1>
      <UpdateUserForm
        bio={session.user.bio}
        userImage={session.user.image}
        username={session.user.username}
      />
    </AuthLayout>
  );
};

export default EditProfilePage;

export const metadata: Metadata = {
  title: "iCook | Edit Profile",
};
