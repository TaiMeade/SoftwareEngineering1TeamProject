/* eslint-disable @next/next/no-img-element */
import { type Comment, type Recipe } from "@prisma/client";
import Link from "next/link";
import { parseDirections, parseIngredients, parseTags } from "~/utils/schemas";

interface RecipePageProps {
  recipe: Recipe & {
    author: { name: string | null };
    comments: Comment[];
  };
}

const RecipePage: React.FC<RecipePageProps> = ({ recipe }) => {
  const tags = parseTags(recipe.tags);
  const directions = parseDirections(recipe.directions);
  const ingredients = parseIngredients(recipe.ingredients);

  return (
    <div className="prose lg:prose-xl mx-auto rounded-lg bg-white p-8 shadow-md">
      {recipe.image && (
        <div className="mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-64 w-full rounded-lg object-cover"
          />
        </div>
      )}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold">{recipe.title}</h1>
        {recipe.description && (
          <p className="text-lg text-gray-600">{recipe.description}</p>
        )}
      </div>
      <div className="mb-4 text-sm text-gray-600">
        <p>Created: {new Date(recipe.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(recipe.updatedAt).toLocaleDateString()}</p>
      </div>
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Ingredients</h2>
        <ul className="list-inside list-disc">
          {ingredients?.map((ingredient, index: number) => (
            <li
              key={ingredient.name + index.toString()}
              className="flex flex-row items-center justify-start gap-1 text-lg"
            >
              {ingredient.name} -{" "}
              <p className="text-sm text-gray-600">
                {ingredient.quantity.toString()} {ingredient.unit}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Directions</h2>
        <ol className="list-inside list-decimal">
          {directions?.map((direction: string, index: number) => (
            <li key={index} className="text-lg">
              {direction}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex items-center justify-between">
        <Link
          href={`/profile/${recipe.authorId}`}
          className="link text-lg text-gray-600 hover:text-blue-600"
        >
          Author: {recipe.author.name}
        </Link>
        <div className="space-x-2">
          {tags?.map((tag: string, index: number) => (
            <span
              key={index}
              className="rounded-full bg-blue-100 px-2 py-1 text-lg text-blue-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold">Comments</h2>
        <div className="flex flex-col gap-4">
          {recipe.comments.length > 0 ? (
            recipe.comments.map((comment: Comment) => (
              <div
                key={comment.id}
                className="flex flex-col gap-2 rounded-lg bg-gray-100 p-4"
              >
                <div className="flex flex-row items-center justify-between">
                  <p className="text-lg font-semibold">{comment.authorId}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-lg">{comment.text}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
