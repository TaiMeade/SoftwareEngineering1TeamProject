import { type Comment } from "@prisma/client";

interface CommentProps {
  comment: Comment;
}

const Comment: React.FC<CommentProps> = () => {
  // FAKE COMMENT:
  const comment: Comment = {
    authorId: "123",
    createdAt: new Date(),
    id: "123",
    recipeId: "123",
    text: "hello",
    updatedAt: new Date(),
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-gray-100 p-4">
      <div className="flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">{comment.authorId}</p>
        <p className="text-sm text-gray-600">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </div>
      <p className="text-lg">{comment.text}</p>
    </div>
  );
};

export default Comment;
