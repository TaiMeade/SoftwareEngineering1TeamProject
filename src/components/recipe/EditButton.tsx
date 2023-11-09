"use client";
import { type Recipe } from "@prisma/client";
import React, { useState } from "react";
import { redirect } from "next/navigation";

interface EditProps {
  recipe: Recipe;
}
const EditButton = ({ recipe }: EditProps) => {
  const [redirecter, setRedirecter] = useState(false);
  if (redirecter) {
    return redirect("/recipes/edit/");
  }

  return (
    <div>
      <button
        className="btn-red btn flex flex-row items-center justify-center gap-2 text-lg disabled:btn-disabled "
        onClick={() => setRedirecter(true)}
      >
        {"  "}
        Edit{"  "}
      </button>
      {/* if(redirecter)
      {redirect("/recipe/edit")} */}
    </div>
  );
};

export default EditButton;
