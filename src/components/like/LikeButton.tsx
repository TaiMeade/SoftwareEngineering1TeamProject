"use client";

import React, { useState } from "react";

interface LikeButtonProps {
  numLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ numLikes }) => {
  // Handles increasing and decreasing number of likes...lines 10-15
  const [like, setLike] = useState(numLikes);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <button
        className="rounded bg-zinc-400 px-4 py-2 font-bold text-black hover:bg-zinc-500"
        onClick={likeHandler}
      >
        <i className="../../../public/favicon.ico" />
      </button>
      <span className="text-sm">{like} likes</span>
    </div>
  );
};

export default LikeButton;
