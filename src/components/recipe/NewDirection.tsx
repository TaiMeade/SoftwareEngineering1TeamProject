"use client";
import { useState } from "react";
import { directionSchema } from "~/utils/schemas";

interface NewDirectionProps {
  setDirections: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewDirection: React.FC<NewDirectionProps> = ({ setDirections }) => {
  const [newDir, setNewDir] = useState<string>();
  const [err, setErr] = useState<string>();

  const addDirection = () => {
    const parsed = directionSchema.safeParse(newDir);
    if (!parsed.success) {
      setErr("Direction Cannot Be Empty");
      return;
    }
    setDirections((prev) => [...prev, parsed.data]);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="flex flex-row items-center justify-start gap-2">
          <input
            id="newDir"
            onChange={(e) => {
              setNewDir(e.target.value);
            }}
            type="text"
            placeholder="Direction"
            className="input input-bordered w-full"
          />
        </div>

        {err && <p className="text-red-500">{err}</p>}

        <button type="button" onClick={addDirection} className="icook-button">
          Add Direction
        </button>
      </div>
    </div>
  );
};

export default NewDirection;
