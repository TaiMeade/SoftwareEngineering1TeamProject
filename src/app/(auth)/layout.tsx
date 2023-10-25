import "~/styles/globals.css";
import { type Metadata } from "next";
import { getAuth } from "~/server/session";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import("~/components/auth/AuthLayout"));

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getAuth();

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="-mt-8">
      <AuthLayout>{children}</AuthLayout>
    </div>
  );
}

export const metadata: Metadata = {
  title: "iCook",
};
