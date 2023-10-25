import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";

const NotFound = dynamic(() => import("~/components/recipe/NotFound"));

const UpdateUserForm = dynamic(
  () => import("~/components/profile/UpdateUserForm"),
);

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
    <>
      <h1 className="text-4xl font-bold">Edit Profile Page</h1>
      <UpdateUserForm
        bio={user.bio}
        userImage={user.image}
        username={user.username}
      />
    </>
  );
};

export default EditProfilePage;

export const metadata: Metadata = {
  title: "iCook | Edit Profile",
};
