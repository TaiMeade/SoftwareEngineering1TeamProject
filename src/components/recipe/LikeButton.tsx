"use client";
import { useRouter } from "next/navigation";
import { type Recipe } from "@prisma/client";

import { toast } from "sonner";

import { FaThumbsUp } from "react-icons/fa";

interface LikeButtonProps {
  recipe: Recipe;
  numLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ numLikes, recipe }) => {
  const router = useRouter();

  const likeRecipe = async () => {
    const res = await fetch("/api/recipe/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: recipe.id }),
    });

    if (res.ok) {
      // Like or unliked
      const wasLiked = (await res.json()) as boolean;

      if (wasLiked) toast.success(`Unliked recipe - ${recipe.title}`);
      else toast.info(`Liked recipe - ${recipe.title}`);

      router.refresh();
    } else toast.error(`Failed to like recipe - ${res.statusText}`);
  };

  return (
    <div className="flex w-auto flex-row items-center justify-start gap-1">
      <button
        onClick={() => void likeRecipe()}
        className="btn btn-info btn-ghost text-xl text-blue-400 hover:text-blue-500"
      >
        <FaThumbsUp />
      </button>
      <span>
        {numLikes} {numLikes == 1 ? "like" : "likes"}
      </span>
    </div>
  );
};

export default LikeButton;
