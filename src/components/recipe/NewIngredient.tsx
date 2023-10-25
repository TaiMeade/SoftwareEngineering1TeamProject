"use client";

import { useState } from "react";
import { ingredientSchema } from "~/utils/schemas";

interface NewIngredientProps {
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const NewIngredient: React.FC<NewIngredientProps> = ({ setIngredients }) => {
  const [newIng, setNewIng] = useState<Ingredient>({
    name: "",
    quantity: "",
    unit: "",
  });

  const [err, setErr] = useState<string | null>(null);

  const addIngredient = () => {
    const parsed = ingredientSchema.safeParse(newIng);
    if (!parsed.success) {
      setErr(parsed.error.issues.map((i) => i.message).join(", "));
      return;
    }
    setIngredients((prev) => [...prev, parsed.data]);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <div className="flex flex-col items-center justify-start gap-2 md:flex-row">
        <input
          id="name"
          onChange={(e) => {
            setNewIng({ ...newIng, name: e.target.value });
          }}
          type="text"
          placeholder="Name"
          // className="icook-form-input"
          className="input input-bordered w-full"
        />
        <input
          id="quantity"
          onChange={(e) => {
            setNewIng({ ...newIng, quantity: e.target.value });
          }}
          type="text"
          placeholder="Quantity"
          // className="icook-form-input"
          className="input input-bordered w-full"
        />

        <input
          id="unit"
          onChange={(e) => {
            setNewIng({ ...newIng, unit: e.target.value });
          }}
          type="text"
          placeholder="Unit"
          // className="icook-form-input"
          className="input input-bordered w-full"
        />
      </div>

      {err && <p className="text-red-500">{err}</p>}

      <button type="button" onClick={addIngredient} className="icook-button">
        Add Ingredient
      </button>
    </div>
  );
};

export default NewIngredient;
