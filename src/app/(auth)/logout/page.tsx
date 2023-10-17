import { type Metadata, type NextPage } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "~/components/auth/SignOutButton";
import { getAuth } from "~/server/session";

const LogoutPage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is already logged in, redirect them to the home page.
  if (!session?.user?.id) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">Logout</h1>
      <h2 className="text-2xl font-medium">Are you sure you want to logout?</h2>

      <div className="flex flex-row items-center gap-4">
        <Link href="/">Go Home</Link>
        <SignOutButton />
      </div>
    </div>
  );
};

export default LogoutPage;

export const metadata: Metadata = {
  title: "iCook | Logout",
};
