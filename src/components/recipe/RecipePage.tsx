import { getAuth } from "~/server/session";

import Link from "next/link";
import Image from "next/image";

import { type Recipe, type Comment } from "@prisma/client";
import { cn } from "~/utils/tw";
import { fmtDate } from "~/utils";
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

  const tags = parseTags(recipe.tags);
  const ings = parseIngredients(recipe.ingredients);
  const dirs = parseDirections(recipe.directions);

  return (
    <div className="prose mx-auto w-full max-w-5xl space-y-8 rounded-lg bg-white p-8 pt-0 shadow-md lg:prose-lg">
      <div
        className={cn(
          "h-96 w-full animate-pulse rounded-lg bg-gray-100",
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
            className="h-96 w-full rounded-lg object-cover"
          />
        )}
      </div>

      <div>
        <h1 className="mb-2 text-3xl font-semibold first-letter:uppercase">
          {recipe.title}
        </h1>

        {recipe.description && <p className="text-lg">{recipe.description}</p>}
      </div>

      <div className="text-base">
        <p>Recipe Created: {createdAt}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Ingredients</h2>

        <ul className="list-inside list-disc">
          {ings.map((ingredient, index: number) => (
            <li
              key={ingredient.name + index.toString()}
              className="list-item text-lg"
            >
              <span>{ingredient.name} - </span>
              <span className="text-sm">
                {ingredient.quantity.toString()} {ingredient.unit}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Directions</h2>
        <ol className="list-inside list-decimal">
          {dirs?.map((direction: string, index: number) => (
            <li key={index} className="text-lg">
              {direction}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg">
          <span>By: </span>
          <Link
            href={`/profile/${recipe.authorId}`}
            className="link-hover link hover:text-blue-600"
          >
            {recipe.author.name ?? "Anonymous"}
          </Link>
        </div>

        <div className="flex flex-row items-center justify-center space-x-3">
          {tags?.map((tag: string, index: number) => (
            <div
              key={index}
              className="rounded-full bg-blue-100 px-[.75rem] py-1 text-base text-blue-600"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Likes */}
      <LikeButton recipe={recipe} numLikes={likes} />

      <RecipeToolbar recipe={recipe} session={session} />

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
