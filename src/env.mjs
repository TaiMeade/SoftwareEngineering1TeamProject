import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    // DATABASE_URL: z.string().min(1),
    DATABASE_URL: z.string().optional().default("file:./db.sqlite"),
    NEXTAUTH_URL: z.string().optional().default("http://localhost:3000"),
    NEXTAUTH_SECRET: z.string().optional(),
    GOOGLE_CLIENT: z.string().optional(),
    GOOGLE_SECRET: z.string().optional(),
  },
  client: {
    // NEXT_PUBLIC_GA_ID: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT: process.env.GOOGLE_CLIENT,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    // NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
});
