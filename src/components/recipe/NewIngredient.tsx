"use client";

import { useState } from "react";

interface NewIngredientProps {
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const NewIngredient: React.FC<NewIngredientProps> = ({ setIngredients }) => {
  const [newIng, setNewIng] = useState<Ingredient>({
    name: "",
    quantity: "",
    unit: "",
  });

  const addIngredient = () => {
    if (newIng.name === "" || newIng.quantity === "" || newIng.unit === "")
      return;
    setIngredients((prev) => [...prev, newIng]);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <h1>New Ingredient</h1>
      <div className="flex flex-row items-center justify-start gap-2">
        <input
          id="name"
          onChange={(e) => {
            setNewIng({ ...newIng, name: e.target.value });
          }}
          type="text"
          placeholder="Name"
          className="icook-form-input"
        />
        <input
          id="quantity"
          onChange={(e) => {
            setNewIng({ ...newIng, quantity: e.target.value });
          }}
          type="text"
          placeholder="Quantity"
          className="icook-form-input"
        />

        <input
          id="unit"
          onChange={(e) => {
            setNewIng({ ...newIng, unit: e.target.value });
          }}
          type="text"
          placeholder="Unit"
          className="icook-form-input"
        />
      </div>

      <button type="button" onClick={addIngredient} className="icook-button">
        Add Ingredient
      </button>
    </div>
  );
};

export default NewIngredient;
