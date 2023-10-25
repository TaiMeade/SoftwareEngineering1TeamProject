import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";

import AuthLayout from "~/components/auth/AuthLayout";
import UpdateUserForm from "~/components/profile/UpdateUserForm";
import NotFound from "~/components/recipe/NotFound";

const EditProfilePage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, username: true, bio: true, image: true },
  });

  if (!user) return <NotFound />;

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold">Edit Profile Page</h1>
      <UpdateUserForm
        bio={user.bio}
        userImage={user.image}
        username={user.username}
      />
    </AuthLayout>
  );
};

export default EditProfilePage;

export const metadata: Metadata = {
  title: "iCook | Edit Profile",
};
