import { type Metadata, type NextPage } from "next";
import dynamic from "next/dynamic";

const CreateRecipeForm = dynamic(
  () => import("~/components/recipe/CreateRecipeForm"),
);

const CreateRecipePage: NextPage = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Create your recipe!</h1>
      <CreateRecipeForm />
    </>
  );
};

export default CreateRecipePage;

export const metadata: Metadata = {
  title: "iCook | Create Recipe",
};
