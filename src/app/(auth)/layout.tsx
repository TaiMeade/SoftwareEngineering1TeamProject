import "~/styles/globals.css";
import { type Metadata } from "next";
import { getAuth } from "~/server/session";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getAuth();

  if (!session) {
    return redirect("/login");
  }

  return <div className="-mt-8">{children}</div>;
}

export const metadata: Metadata = {
  title: "iCook",
};
