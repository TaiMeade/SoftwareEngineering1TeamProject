"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { type Recipe } from "@prisma/client";

import { FaStar } from "react-icons/fa";

interface FeatureButtonProps {
  recipe: Recipe;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({ recipe }) => {
  const router = useRouter();

  const featureRecipe = async () => {
    const res = await fetch("/api/recipe/feature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: recipe.id }),
    });

    if (res.ok) {
      // Featured or unfeatured
      const wasFeatured = (await res.json()) as boolean;

      if (wasFeatured) toast.success(`Featured recipe - ${recipe.title}`);
      else toast.info(`Unfeatured recipe - ${recipe.title}`);

      router.refresh();
    } else toast.error(`Failed to feature recipe - ${res.statusText}`);
  };

  return (
    <button
      className="btn btn-primary text-lg disabled:btn-disabled"
      onClick={() => void featureRecipe()}
    >
      <span>{recipe.featured ? "Unfeature" : "Feature"}</span>

      <FaStar />
    </button>
  );
};

export default FeatureButton;
