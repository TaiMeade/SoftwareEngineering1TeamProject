import { type Recipe } from "@prisma/client";
import { type Session } from "next-auth";

import ShareButton from "./ShareButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import FeatureButton from "./FeatureButton";

interface RecipeToolbarProps {
  session: Session | null;
  recipe: Recipe;
}

const RecipeToolbar: React.FC<RecipeToolbarProps> = ({ session, recipe }) => {
  const isAdmin = session?.user.role === "ADMIN";
  const isOwner = session?.user.id === recipe.authorId;
  const canDelete = isAdmin || isOwner;
  const canEdit = isOwner;
  const canFeature = isAdmin;

  return (
    <div className="flex w-full flex-row items-center justify-between gap-4 pb-6 pt-0">
      <ShareButton recipe={recipe} />

      <div className="flex flex-1 flex-row items-center justify-end gap-2">
        {canEdit && <EditButton recipe={recipe} />}
        {canFeature && <FeatureButton recipe={recipe} />}
        {canDelete && <DeleteButton recipe={recipe} />}
      </div>
    </div>
  );
};

export default RecipeToolbar;
