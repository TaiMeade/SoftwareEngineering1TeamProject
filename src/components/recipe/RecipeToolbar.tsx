import { type Recipe } from "@prisma/client";
import { type Session } from "next-auth";

import ShareButton from "./ShareButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import FeatureButton from "./FeatureButton";
import ReportButton from "../report/ReportButton";

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
  const canReport = session?.user?.id && session?.user.id !== recipe.authorId;

  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
      <div className="flex w-full flex-wrap justify-end gap-2 sm:justify-start">
        <ShareButton recipe={recipe} />
        {canReport && (
          <ReportButton
            reportedId={recipe.authorId}
            reporterId={session.user.id}
            reportedRecipeId={recipe.id}
          />
        )}
      </div>

      <div className="flex w-full flex-1 flex-row items-center justify-end space-x-3">
        {canEdit && <EditButton recipe={recipe} />}
        {canFeature && <FeatureButton recipe={recipe} />}
        {canDelete && <DeleteButton recipe={recipe} />}
      </div>
    </div>
  );
};

export default RecipeToolbar;
