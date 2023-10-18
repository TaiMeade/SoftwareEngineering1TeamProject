import { type Metadata, type NextPage } from "next";
import { type Recipe } from "@prisma/client";
import RecipeCard from "~/components/recipe/RecipeCard";
import { prisma } from "~/server/db";

type RecipeWithAuthor = Recipe & {
  author: { name: string | null };
};

const SearchPage: NextPage<PageProps> = async ({ searchParams }: PageProps) => {
  const query = searchParams.q || "";

  let searchResults: RecipeWithAuthor[] = [];

  if (query.length > 0) {
    searchResults = await prisma.recipe.findMany({
      where: {
        title: { contains: query },
        OR: [{ description: { contains: query } }],
      },
      include: { author: { select: { name: true } } },
    });
  }

  return (
    <div className="flex flex-col items-start gap-12 pt-12">
      <h1 className="text-4xl font-bold">Search Page</h1>

      <div className="flex">
        <h2 className="mr-1 text-xl font-semibold">
          {query.length > 0 ? "Searching for... " : "No search query entered. "}
        </h2>
        {query.length > 0 && (
          <code className="rounded-md bg-gray-300 px-2 py-1 font-mono text-sm text-gray-800">
            {query}
          </code>
        )}
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default SearchPage;

export const metadata: Metadata = {
  title: "iCook | Search",
};
