import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";

import Link from "next/link";

import { getAuth } from "~/server/session";
import { getProviders } from "next-auth/react";

import SignInButton from "~/components/auth/SignInButton";

const LoginPage: NextPage = async () => {
  const session = await getAuth();
  const providers = await getProviders();

  if (!providers) throw new Error("No providers found");

  // * If the user is already logged in, redirect them to the home page.
  if (session?.user?.id) {
    return redirect("/profile");
  }

  return (
    <div className="flex flex-col items-start gap-12">
      <h1 className="text-4xl font-bold">Login</h1>

      <Link href="/" className="link">
        Go Home
      </Link>

      <div className="flex flex-col gap-4">
        {Object.values(providers).map((provider) => (
          <SignInButton key={provider.name} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: "iCook | Login",
};
