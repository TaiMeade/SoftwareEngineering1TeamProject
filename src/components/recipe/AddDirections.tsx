"use client";
import { useState } from "react";

interface AddDirectionsProps {
  directions: string[];
  setDirections: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddDirections: React.FC<AddDirectionsProps> = ({
  directions,
  setDirections,
}) => {
  const [curDirection, setCurDirection] = useState<string>();

  return (
    <>
      <input
        type="text"
        value={curDirection}
        onChange={(e) => setCurDirection(e.target.value)}
        className="form-input block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button
        type="button"
        onClick={() => {
          if (!curDirection) return;
          setDirections([...directions, curDirection]);
          setCurDirection("");
        }}
      >
        Add Direction
      </button>
    </>
  );
};

export default AddDirections;
