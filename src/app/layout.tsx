import "~/styles/globals.css";
import { type Metadata } from "next";

import { cn } from "~/utils/tw";
import { Poppins, Noto_Sans } from "next/font/google";
import { getAuth } from "~/server/session";

import Providers from "~/components/Providers";
import Navbar from "~/components/Navbar";
import { Toaster } from "sonner";

const poppins = Poppins({
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const noto = Noto_Sans({
  display: "swap",
  variable: "--font-noto",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getAuth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          noto.variable,
          poppins.variable,
        )}
      >
        <Navbar />
        <main className="page">
          <Providers session={session}>{children}</Providers>
          <Toaster />
        </main>
        {/* Footer */}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "iCook",
  description: "iCook Description",
  // image: "/assets/og-image.png",
};
