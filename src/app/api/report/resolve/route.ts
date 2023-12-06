import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
import { resolveReportSchema } from "~/utils/schemas";

export async function POST(req: Request) {
  console.log("Resolving Report");
  const session = await getAuth();

  if (!session || !session?.user?.id) {
    console.error("Unauthorized request to Resolve Report");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    console.error("Unauthorized request to Resolve Report");
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const parsed = resolveReportSchema.safeParse(await req.json());

  if (!parsed.success) {
    console.error("Error parsing resolve", parsed.error);

    return NextResponse.json(parsed.error, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const data = parsed.data;

  try {
    const isResolved = await prisma.report.findUnique({
      where: { id: data.reportId },
      select: { resolved: true },
    });

    const report = await prisma.report.update({
      where: { id: data.reportId },
      data: {
        resolved: !isResolved?.resolved,
        resolvedAt: new Date(),
      },
    });

    console.log("Resolved report", report);

    return NextResponse.json(!isResolved, { status: 200, statusText: "OK" });
  } catch (error) {
    console.error("Error resolving report", error);
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
