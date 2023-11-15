"use client";
import { type Recipe } from "@prisma/client";
import { useRouter } from "next/navigation";

interface EditProps {
  recipe: Recipe;
}
const EditButton: React.FC<EditProps> = ({ recipe }) => {
  const router = useRouter();

  return (
    <button
      className="btn btn-neutral text-lg"
      onClick={() => void router.push(`/recipes/${recipe.id}/edit/`)}
    >
      Edit
    </button>
  );
};

export default EditButton;
