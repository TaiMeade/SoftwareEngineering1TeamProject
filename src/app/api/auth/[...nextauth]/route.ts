import { type NextResponse } from "next/server";

import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

type Handler = <T>(req: Request) => Promise<NextResponse<T>>;
const handler: Handler = NextAuth(authOptions) as Handler;

export { handler as GET, handler as POST };
