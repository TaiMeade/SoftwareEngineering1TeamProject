import "~/styles/globals.css";
import { type Metadata } from "next";

import { cn } from "~/utils/tw";
import { Poppins, Noto_Sans } from "next/font/google";
import { getAuth } from "~/server/session";

import Providers from "~/components/Providers";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          noto.variable,
          poppins.variable,
        )}
      >
        <Providers session={session}>
          <Navbar />
          <main className="page">
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "iCook",
  description: "iCook Description",
  robots: "follow, index",
  viewport: "width=device-width, initial-scale=1",
};
