import { type Metadata, type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProfileSideBar from "~/components/auth/ProfileSideBar";
import { getAuth } from "~/server/session";

const UserProfilePage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-row items-start gap-12">
      <ProfileSideBar />

      <div className="flex flex-col gap-12 pt-4">
        <h1 className="text-4xl font-bold">User Profile Page</h1>
        <div className="flex flex-row items-center gap-4">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="User Profile Picture"
              width={100}
              height={100}
              className="rounded-full border-4 border-icook-primary object-cover transition-all duration-300 ease-in-out hover:scale-110"
            />
          )}
          <h2 className="text-3xl font-medium">
            Welcome, {" " + (session.user.name ?? "")}.
          </h2>
        </div>
        <Link href="/">Go Home</Link>
        <Link href="/editProfile">Edit Profile</Link>
        {/* Link to creating a new recipe "/createRecipe" */}
        <h1 className="text-2xl font-bold">Create a New Recipe</h1>
        <Link href="/createRecipe">
          <button className="h-64 w-64 rounded bg-gray-400 text-3xl font-bold text-gray-300 text-opacity-60 hover:bg-gray-500">
            +
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfilePage;

export const metadata: Metadata = {
  title: "iCook | Profile",
};
