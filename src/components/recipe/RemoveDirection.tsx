"use client";
import { useState } from "react";
import { directionSchema } from "~/utils/schemas";

import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

interface RemoveDirectionProps {
  setDirections: React.Dispatch<React.SetStateAction<string[]>>;
  currDirection: string;
}

const RemoveDirection: React.FC<RemoveDirectionProps> = ({
  setDirections,
  currDirection,
}) => {
  const [newDir, setNewDir] = useState<string>();
  const [err, setErr] = useState<string>();

  const removeDirection = () => {
    const parsed = directionSchema.safeParse(newDir);
    if (!parsed.success) {
      setErr("Direction Cannot Be Empty");
      return;
    }
    setDirections((prev) => [...prev, parsed.data]);
  };

  return (
    <div>
      <button type="button" onClick={removeDirection}>
        <FaTrash />
      </button>
      <button type="button" onClick={removeDirection}>
        <FaRegEdit />
      </button>
    </div>
  );
};

export default RemoveDirection;
