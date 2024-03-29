import "~/styles/globals.css";
import { type Metadata } from "next";
import { getAuth } from "~/server/session";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const AdminLayout = dynamic(() => import("~/components/admin/Layout"));

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getAuth();

  if (!session || session.user.role !== "ADMIN") {
    return redirect("/login");
  }

  return (
    <div className="-mt-8">
      <AdminLayout>
        <div className="pt-4">{children}</div>
      </AdminLayout>
    </div>
  );
}

export const metadata: Metadata = {
  title: "iCook",
};
