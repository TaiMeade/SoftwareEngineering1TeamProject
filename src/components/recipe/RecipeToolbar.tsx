import { type Recipe } from "@prisma/client";
import { type Session } from "next-auth";

import ShareButton from "./ShareButton";
import DeleteButton from "./DeleteButton";

interface RecipeToolbarProps {
  session: Session | null;
  recipe: Recipe;
}

const RecipeToolbar: React.FC<RecipeToolbarProps> = ({ session, recipe }) => {
  const isAdmin = session?.user.role === "ADMIN";
  const isOwner = session?.user.id === recipe.authorId;
  const canDelete = isAdmin || isOwner;

  return (
    <div className="flex w-full flex-row items-center justify-between gap-4 pb-6 pt-0">
      <ShareButton recipe={recipe} />

      {canDelete && <DeleteButton recipe={recipe} />}
    </div>
  );
};

export default RecipeToolbar;
