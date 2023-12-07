import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { createReportSchema } from "~/utils/schemas";

export async function POST(req: Request) {
  console.log("Reporting User");
  const session = await getAuth();

  if (!session || !session?.user?.id) {
    console.error("Unauthorized request to Report User");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const parsed = createReportSchema.safeParse(await req.json());

  if (!parsed.success) {
    console.error("Error parsing report", parsed.error);

    return NextResponse.json(parsed.error, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const data = parsed.data;

  // Check if user is reporting themselves
  if (data.reportedId === session.user.id) {
    console.error("User is reporting themselves");

    return NextResponse.json(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  try {
    const report = await prisma.report.create({
      data: {
        reason: data.reason,
        reportedUser: { connect: { id: data.reportedId } },
        reporter: { connect: { id: session.user.id } },
        // Optional Reported CommentId or RecipeId
        ...(data.reportedCommentId && {
          reportedComment: { connect: { id: data.reportedCommentId } },
        }),
        ...(data.reportedRecipeId && {
          reportedRecipe: { connect: { id: data.reportedRecipeId } },
        }),
      },
    });

    console.log("Created report", report);

    return NextResponse.json(report, { status: 200, statusText: "OK" });
  } catch (error) {
    console.error("Error creating report", error);
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
