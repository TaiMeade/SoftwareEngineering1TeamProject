"use client";
import { toast } from "sonner";
import { sleep } from "~/utils";

import { type Recipe } from "@prisma/client";

interface FeatureButtonProps {
  recipe: Recipe;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({ recipe }) => {
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
      await sleep(1000);
    } else toast.error(`Failed to feature recipe - ${res.statusText}`);
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <button
        onClick={() => void featureRecipe()}
        className="btn btn-primary flex flex-row items-center justify-center gap-2 text-lg disabled:btn-disabled "
      >
        <span>Feature</span>
      </button>
    </div>
  );
};

export default FeatureButton;
