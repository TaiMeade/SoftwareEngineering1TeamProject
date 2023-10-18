/* eslint-disable @next/next/no-img-element */
import { type Recipe } from "@prisma/client";
import Link from "next/link";
import { parseTags } from "~/utils/schemas";

interface RecipeCardProps {
  recipe: Recipe & {
    author: { name: string | null };
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const tags = parseTags(recipe.tags);

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="scale-100 transition-all duration-200 ease-in-out hover:scale-[1.01]"
    >
      <div className="flex h-full flex-col items-start justify-start rounded-lg bg-white p-4 shadow-md ">
        <div className="mb-4">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-56 w-full rounded-lg object-cover"
            />
          ) : (
            <div className="h-56 w-full animate-pulse rounded-lg bg-gray-300" />
          )}
        </div>

        <div className="mb-2">
          <h2 className="text-xl font-semibold">{recipe.title}</h2>
        </div>
        {recipe.description && (
          <p className="mb-4 text-sm text-gray-600">{recipe.description}</p>
        )}
        <div className="mb-2 text-sm text-gray-600">
          <p>Created: {new Date(recipe.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex w-full flex-1 items-end justify-between">
          <div className="text-xs text-gray-600">
            <p>Author: {recipe.author.name}</p>
          </div>
          <div className="space-x-2">
            {tags?.map((tag: string, index: number) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
