import "~/styles/globals.css";
import { type Metadata } from "next";

import { cn } from "~/utils/tw";
import { Poppins, Noto_Sans } from "next/font/google";

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
        <main className="page">{children}</main>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Recipe App Description",
  // image: "/assets/og-image.png",
};
