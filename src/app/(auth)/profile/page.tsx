import { type Metadata, type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthLayout from "~/components/auth/AuthLayout";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";

const UserProfilePage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  const recipes = await prisma.recipe.findMany({
    where: { authorId: session.user.id },
    take: 25,
  });

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold">User Profile Page</h1>
      <div className="flex flex-row items-center gap-4">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="User Profile Picture"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border border-slate-800 object-cover transition-all duration-300 ease-in-out hover:scale-110"
          />
        )}
        <h2 className="text-3xl font-medium">
          Welcome,{" "}
          {" " + (session.user.username ?? session.user.name ?? "User")}.
        </h2>
      </div>
      <h2>{session.user.bio ?? " "}</h2>
      <Link href="/">Go Home</Link>
      <Link href="/profile/edit">Edit Profile</Link>
      {/* Link to creating a new recipe "/createRecipe" */}

      {/* {recipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )} */}

      <h1 className="text-2xl font-bold">Create a New Recipe</h1>
      <Link href="/profile/create">
        <button className="h-64 w-64 rounded bg-gray-400 text-3xl font-bold text-gray-300 text-opacity-60 hover:bg-gray-500">
          +
        </button>
      </Link>
    </AuthLayout>
  );
};

export default UserProfilePage;

export const metadata: Metadata = {
  title: "iCook | Profile",
};
