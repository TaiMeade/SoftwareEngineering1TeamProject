"use client";
import { useState } from "react";

interface AddIngredientsProps {
  ingredients: string[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddIngredients: React.FC<AddIngredientsProps> = ({
  ingredients,
  setIngredients,
}) => {
  const [curIngredient, setCurIngredient] = useState<string>();

  const addTheIngredient = () => {
    if (!curIngredient) return;
    setIngredients([...ingredients, curIngredient]);
    setCurIngredient("");
  };

  return (
    <>
      <input
        type="text"
        value={curIngredient}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTheIngredient();
          }
        }}
        onChange={(e) => setCurIngredient(e.target.value)}
        className="form-input block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button type="button" onClick={addTheIngredient}>
        Add Ingredient
      </button>
    </>
  );
};

export default AddIngredients;
