import { type Metadata, type NextPage } from "next";
import AuthLayout from "~/components/auth/AuthLayout";
import CreateRecipeForm from "~/components/recipe/CreateRecipeForm";

const CreateRecipePage: NextPage = () => {
  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold">Create your recipe!</h1>
      <CreateRecipeForm />
    </AuthLayout>
  );
};

export default CreateRecipePage;

export const metadata: Metadata = {
  title: "iCook | Create Recipe",
};
