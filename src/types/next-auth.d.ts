import type { DefaultSession, DefaultUser } from "next-auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string | null;
      username: string | null;
      role: "USER" | "ADMIN";
      bio: string | null;
      role: "USER" | "ADMIN";
      // favoriteFood: string | null;
      // favoriteTag: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    name: string | null;
    username: string | null;
    role: "USER" | "ADMIN";
    bio: string | null;
    favoriteFood: string | null;
    favoriteTag: string | null;
  }
}
