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
    <div>
      <h1>Comment</h1>
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;
