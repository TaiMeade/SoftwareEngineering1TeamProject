"use client";

import { useState } from "react";

interface NewDirectionProps {
  setDirections: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewDirection: React.FC<NewDirectionProps> = ({ setDirections }) => {
  const [newDir, setNewDir] = useState<string>();

  const addDirection = () => {
    if (!newDir || newDir === "") return;
    setDirections((prev) => [...prev, newDir]);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <h1>New Ingredient</h1>
      <div className="flex flex-row items-center justify-start gap-2">
        <input
          id="newDir"
          onChange={(e) => {
            setNewDir(e.target.value);
          }}
          type="text"
          placeholder="Direction"
          className="icook-form-input"
        />
      </div>

      <button type="button" onClick={addDirection} className="icook-button">
        Add Direction
      </button>
    </div>
  );
};

export default NewDirection;
