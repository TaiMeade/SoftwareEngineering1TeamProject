import { prisma } from "~/server/db";

import Comment from "./Comment";
import NewComment from "./NewComment";

interface CommentsListProps {
  recipeId: string;
}

const CommentsList: React.FC<CommentsListProps> = async ({ recipeId }) => {
  // const comments = await fakeComments(10);

  const comments = await prisma.comment.findMany({
    where: {
      recipeId,
      AND: { parentComment: { none: {} } },
    },
    include: {
      author: { select: { id: true, name: true, username: true, image: true } },
      replies: {
        include: {
          author: {
            select: { id: true, name: true, username: true, image: true },
          },
        },
      },
    },
  });

  // console.log(comments);

  return (
    <div className="flex flex-col items-start justify-center space-y-4">
      <h3 className="text-2xl font-bold">Comments</h3>

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          recipeId={recipeId}
          comment={{
            ...comment,
            replies: comment.replies as PrismaComment[],
          }}
        />
      ))}

      <NewComment recipeId={recipeId} />
    </div>
  );
};

export default CommentsList;
