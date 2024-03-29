import type { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

import GoogleProvider from "next-auth/providers/google";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, user }) => {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: dbUser?.role ?? "USER",
          username: dbUser?.username ?? null,
          name: dbUser?.name ?? null,
          bio: dbUser?.bio ?? null,
        },
      };
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT ?? "",
      clientSecret: env.GOOGLE_SECRET ?? "",
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
          display: "popup",
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
  /**
   * @see https://next-auth.js.org/configuration/pages
   */
  pages: { error: "/", newUser: "/profile/edit", signIn: "/login" },
  theme: {
    brandColor: "var(--icook-primary)",
    buttonText: "var(--icook-text)",
    colorScheme: "dark",
    // logo: "/android-chrome-192x192.png",
  },
};
