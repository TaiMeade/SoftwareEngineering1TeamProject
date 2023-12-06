import dynamic from "next/dynamic";

import Modal from "../Modal";
import { MdReportProblem } from "react-icons/md";

const ReportUserForm = dynamic(() => import("./ReportUserForm"));

interface ReportButtonProps {
  reportedId: string;
  reporterId: string;
  reportedRecipeId?: string;
  reportedCommentId?: string;
}

const ReportButton: React.FC<ReportButtonProps> = ({
  reportedId,
  reporterId,
  reportedRecipeId,
  reportedCommentId,
}) => {
  return (
    <Modal
      title="Report"
      button={
        <>
          <span>Report</span>
          <MdReportProblem className="-scale-x-100 text-2xl" />
        </>
      }
      btnClass="btn btn-accent flex flex-row items-center justify-center gap-2 text-lg"
      className="flex flex-col items-start justify-center gap-2"
    >
      <h2 className="text-lg text-gray-600">
        Are you sure you want to report this user?
      </h2>

      <ReportUserForm
        reportedId={reportedId}
        reporterId={reporterId}
        reportedRecipeId={reportedRecipeId}
        reportedCommentId={reportedCommentId}
      />
    </Modal>
  );
};

export default ReportButton;
