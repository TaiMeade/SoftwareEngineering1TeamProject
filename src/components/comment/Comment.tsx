import { fmtDate } from "~/utils";

import NewComment from "./NewComment";
import UserImg from "./UserImg";
import ReportButton from "../report/ReportButton";
import { getAuth } from "~/server/session";

interface CommentProps {
  recipeId: string;
  comment: PrismaComment;
}

const Comment: React.FC<CommentProps> = async ({ recipeId, comment }) => {
  const session = await getAuth();

  if (!session?.user?.id) return null;

  return (
    <div
      key={comment.id}
      className="flex w-full flex-col items-start justify-between gap-1"
    >
      <div className="flex w-full flex-col">
        {/* Avatar / User Info / Report */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center justify-center gap-3">
            <UserImg
              id={comment.author.username ?? comment.author.id}
              src={comment.author.image}
            />

            <div className="flex flex-col items-start">
              <span className="font-bold">{comment.author.username}</span>
              <span className="text-sm text-gray-500">
                {fmtDate(comment.createdAt)}
              </span>
            </div>
          </div>

          {/* Include ReportButton component for each comment */}
          {session.user.id !== comment.author.id && (
            <ReportButton
              reportedId={comment.author.id}
              reporterId={session.user.id}
              reportedCommentId={comment.id}
            />
          )}
        </div>
      </div>
      <p className="!my-0 pt-1 text-gray-700">{comment.text}</p>

      {/* Replies */}
      <div className="flex w-full flex-col items-start justify-between gap-1 pl-[15%]">
        {comment.replies?.map((reply) => (
          <Comment
            key={reply.id}
            recipeId={recipeId}
            // ! Comments only go depth 1
            comment={{
              ...reply,
              replies: reply?.replies ?? [],
            }}
          />
        ))}
      </div>

      <NewComment recipeId={recipeId} commentId={comment.id} />
    </div>
  );
};

export default Comment;
