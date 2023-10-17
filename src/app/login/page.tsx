import { type Metadata, type NextPage } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignInButton from "~/components/auth/SignInButton";
import { getAuth } from "~/server/session";

const LoginPage: NextPage = async () => {
  const session = await getAuth();

  // * If the user is already logged in, redirect them to the home page.
  if (session?.user?.id) {
    return redirect("/profile");
  }

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">Login</h1>

      <SignInButton />

      <Link href="/">Go Home</Link>
    </div>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: "iCook",
};
