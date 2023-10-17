import "~/styles/globals.css";
import { type Metadata } from "next";

import { cn } from "~/utils/tw";
import { Poppins, Noto_Sans } from "next/font/google";
import Navbar from "~/components/Navbar";

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

export default function RootLayout({ children }: RootLayoutProps) {
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
        <main className="page">{children}</main>
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
