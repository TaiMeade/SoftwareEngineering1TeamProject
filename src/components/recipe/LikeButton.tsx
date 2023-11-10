"use client";

import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { type Recipe } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  recipe: Recipe;
  numLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ numLikes, recipe }) => {
  const router = useRouter();

  // Handles increasing and decreasing number of likes...lines 10-15
  const [like, setLike] = useState(numLikes);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const likeRecipe = async () => {
    const res = await fetch("/api/recipe/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: recipe.id }),
    });

    if (res.ok) {
      router.refresh();
    } else toast.error("Failed to like recipe!");
  };

  return (
    <div>
      <button
        className="rounded px-4 py-2 font-bold text-blue-400 hover:text-blue-500"
        onClick={function () {
          likeHandler();
          void likeRecipe();
        }}
      >
        <i>
          <FaThumbsUp />
        </i>
      </button>
      <span className=" text-sm">{numLikes} likes</span>
    </div>
  );
};

export default LikeButton;
