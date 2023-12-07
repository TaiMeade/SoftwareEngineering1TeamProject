import { getAuth } from "~/server/session";
import { fmtDate } from "~/utils";

import UserImg from "./UserImg";

import NewComment from "./NewComment";
import ReportButton from "../report/ReportButton";
import DeleteComment from "./DeleteComment";

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
          <div className="flex w-full flex-1 flex-row items-center justify-end space-x-3">
            {/* Include ReportButton and DeleteButton component for each comment */}
            {(session.user.role === "ADMIN" ||
              session.user.id === comment.author.id) && (
              <DeleteComment comment={comment} />
            )}
            {session.user.id !== comment.author.id && (
              <ReportButton
                reportedId={comment.authorId}
                reporterId={session.user.id}
                reportedRecipeId={comment.id}
              />
            )}
          </div>
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
