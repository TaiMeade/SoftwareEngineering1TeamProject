import { type Recipe } from "@prisma/client";
import React from "react";
import Link from "next/link";

interface EditProps {
  recipe: Recipe;
}
const EditButton = ({ recipe }: EditProps) => {
  return (
    <div>
      <Link href="recipes/edit/" className="btn-grey btn">
        Edit
      </Link>
    </div>
  );
};

export default EditButton;
