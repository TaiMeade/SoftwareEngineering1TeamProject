import { type Recipe } from "@prisma/client";
import React from "react";

interface EditProps {
  recipe: Recipe;
}
const EditButton = ({ recipe }: EditProps) => {
  return (
    <div>
      <button className="btn-red btn flex flex-row items-center justify-center gap-2 text-lg disabled:btn-disabled ">
        {" "}
        Edit{" "}
      </button>
    </div>
  );
};

export default EditButton;
