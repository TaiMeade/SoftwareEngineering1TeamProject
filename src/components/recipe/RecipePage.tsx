import Link from "next/link";
import Image from "next/image";
import { getAuth } from "~/server/session";

import { cn } from "~/utils/tw";
import { fmtDate } from "~/utils";
import { type Recipe, type Comment } from "@prisma/client";
import { parseDirections, parseIngredients, parseTags } from "~/utils/schemas";
import LikeButton from "./LikeButton";
import RecipeToolbar from "./RecipeToolbar";

interface RecipePageProps {
  likes: number;
  recipe: Recipe & {
    author: { name: string | null };
    comments: (Comment & {
      author: {
        name: string | null;
        id: string;
        username: string | null;
      };
    })[];
  };
}

const RecipePage: React.FC<RecipePageProps> = async ({ recipe, likes }) => {
  const session = await getAuth();

  const createdAt = fmtDate(recipe.createdAt);
  const updatedAt = fmtDate(recipe.updatedAt);
  const tags = parseTags(recipe.tags);
  const directions = parseDirections(recipe.directions);
  const ingredients = parseIngredients(recipe.ingredients);

  return (
    <div className="prose mx-auto w-full space-y-8 rounded-lg bg-white p-8 shadow-md lg:prose-lg">
      <RecipeToolbar recipe={recipe} session={session} />

      <div
        className={cn(
          "h-72 w-full animate-pulse rounded-lg bg-gray-100",
          recipe.image && "animate-none bg-transparent",
        )}
      >
        {recipe.image && (
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={1000}
            height={288}
            sizes="100vw"
            className="h-72 w-full rounded-lg object-contain"
          />
        )}
      </div>

      <div>
        <h1 className="mb-2 text-3xl font-semibold first-letter:uppercase">
          {recipe.title}
        </h1>

        {recipe.description && (
          <p className="text-lg text-gray-600">{recipe.description}</p>
        )}
      </div>

      <div className="text-sm text-gray-600">
        <p>Created: {createdAt}</p>
        <p>Updated: {updatedAt}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Ingredients</h2>

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

      <div>
        <h2 className="text-2xl font-semibold">Directions</h2>
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
          className="group text-lg text-gray-600"
        >
          <span className="no-underline">By: </span>
          <span className="group-hover:text-blue-600 group-hover:underline">
            {recipe.author.name ?? "Anonymous"}
          </span>
        </Link>

        <div className="space-x-3">
          {tags?.map((tag: string, index: number) => (
            <span
              key={index}
              className="rounded-full bg-blue-100 px-2 py-1 text-base text-blue-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Likes */}
      <div className="">
        <LikeButton recipe={recipe} numLikes={likes} />
      </div>

      {/* Comments */}
      {/* <ListComments
        recipeId={recipe.id}
        comments={recipe.comments}
        session={session}
      /> */}
    </div>
  );
};

export default RecipePage;
