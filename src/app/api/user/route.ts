import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { updateUserSchema } from "~/utils/schemas";
import Filter from "bad-words";

export async function PUT(req: Request) {
  const session = await getAuth();

  if (!session || !session?.user?.id) {
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const parsed = updateUserSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json(parsed.error, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const data = parsed.data;
  const filter = new Filter();

  const filteredData = {
    bio: data.bio ? filter.clean(data.bio) : data.bio,
    username: data.username ? filter.clean(data.username) : data.username,
  };

  // TODO Only fields that are not undefined will be updated
  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...data,
        ...filteredData,
      },
    });

    return NextResponse.json(user, { status: 200, statusText: "OK" });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
