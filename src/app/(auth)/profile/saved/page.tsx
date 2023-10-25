import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";

const UserSavedRecipesPage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is not logged in, redirect them to the login page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  const savedRecipes = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { savedRecipes: true },
  });

  return (
    <>
      <h1 className="text-4xl font-bold">User Saved Recipes Page</h1>
      <pre>{JSON.stringify(savedRecipes, null, 2)}</pre>
    </>
  );
};

export default UserSavedRecipesPage;

export const metadata: Metadata = {
  title: "iCook | Saved Recipes",
};
