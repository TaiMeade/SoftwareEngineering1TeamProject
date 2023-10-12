import type { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import GoogleProvider from "next-auth/providers/google";

import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

// https://next-auth.js.org/configuration/nextjs
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user = { ...session.user, ...user };
      }
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT ?? "",
      clientSecret: env.GOOGLE_SECRET ?? "",
      authorization: {
        params: {
          // Image, profile, email
          scope:
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
  ],
  logger: {
    error: (code, metadata) => {
      console.log(`Error: ${code}`, metadata);
    },
    warn: (code) => {
      console.log(`Warn: ${code}`);
    },
  },
  pages: { error: "/" },
  theme: {
    // brandColor: "#ff6b6b",
    // buttonText: "#eaeaea",
    colorScheme: "dark",
    // logo: "/android-chrome-192x192.png",
  },
};
