import { type Metadata, type NextPage } from "next";

import { getAuth } from "~/server/session";
import { redirect } from "next/navigation";

const CreateRecipePage: NextPage = async () => {
  const session = await getAuth();

  if (!session || !session.user) {
    return redirect("/login");
  }

  return redirect("/profile/create");
};

export default CreateRecipePage;

export const metadata: Metadata = {
  title: "iCook | Create Recipe",
};
