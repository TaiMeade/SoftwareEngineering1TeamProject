import { fmtDate } from "~/utils";

import NewComment from "./NewComment";
import UserImg from "./UserImg";

interface CommentProps {
  recipeId: string;
  comment: PrismaComment;
}

const Comment: React.FC<CommentProps> = ({ recipeId, comment }) => {
  return (
    <div
      key={comment.id}
      className="flex flex-col items-start justify-between gap-1"
    >
      <div className="flex flex-col">
        {/* Avatar / User Info */}
        <div className="flex flex-row items-center justify-center gap-3">
          <UserImg
            id={comment.author.username ?? comment.author.id}
            src={comment.author.image}
          />

          <div className="flex w-full flex-col items-start">
            <span className="font-bold">{comment.author.username}</span>
            <span className="text-sm text-gray-500">
              {fmtDate(comment.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <p className="!my-0 pt-1 text-gray-700">{comment.text}</p>

      {/* Replies */}
      <div className="ml-[15%] flex flex-col items-start justify-between gap-1">
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
