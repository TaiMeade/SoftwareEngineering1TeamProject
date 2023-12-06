import type { Report } from "@prisma/client";

import Link from "next/link";
import Image from "next/image";

import ResolveReport from "~/components/report/ResolveReport";

interface ReportedUserProps {
  report: Report & {
    reporter: { image: string | null; username: string | null };
    reportedUser: { image: string | null; username: string | null };
  };
}

const ReportedUser: React.FC<ReportedUserProps> = ({ report }) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border border-gray-400 p-4">
      <div className="flex flex-row flex-wrap items-center justify-between gap-4">
        <div className="flex flex-row gap-2">
          {report.reporter.image && (
            <Image
              src={report.reporter.image}
              alt="User Profile Picture"
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover transition-all duration-300 ease-in-out hover:scale-110"
            />
          )}
          <h2 className="text-xl font-medium">{report.reporter.username}</h2>
        </div>

        <h2 className="text-xl font-medium">reported</h2>

        <div className="flex flex-row gap-2">
          {report.reportedUser.image && (
            <Image
              src={report.reportedUser.image}
              alt="User Profile Picture"
              width={24}
              height={24}
              className="w-616 h-6 rounded-full object-cover transition-all duration-300 ease-in-out hover:scale-110"
            />
          )}
          <h2 className="text-xl font-medium">
            {report.reportedUser.username}
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-start gap-4">
          <Link
            href={`/profile/${report.reportedUserId}`}
            className="link-hover link text-xl font-medium"
          >
            Reported User:
          </Link>

          <ResolveReport reportId={report.id} isResolved={report.resolved} />
        </div>
        <p className="text-base font-normal">
          {report.reason ?? "No reason provided."}
        </p>
      </div>
    </div>
  );
};

export default ReportedUser;
