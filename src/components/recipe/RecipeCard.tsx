import { type Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { fmtDate } from "~/utils";
import { parseTags } from "~/utils/schemas";
import { cn } from "~/utils/tw";

interface RecipeCardProps {
  recipe: Recipe & {
    author: { name: string | null };
  };
  idx?: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, idx = 0 }) => {
  const tags = parseTags(recipe.tags);
  const createdAt = fmtDate(recipe.createdAt);

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="scale-100 transition-all duration-200 ease-in-out hover:scale-[1.01]"
    >
      <div className="flex h-full flex-col items-start justify-start gap-2 rounded-lg bg-white p-4 shadow-md">
        <div
          className={cn(
            "mb-2 h-56 w-full animate-pulse rounded-lg bg-gray-300",
            recipe.image && "animate-none",
          )}
        >
          {recipe.image && (
            <Image
              src={recipe.image}
              width={512}
              height={224}
              loading={idx < 3 ? "eager" : "lazy"}
              alt={recipe.title}
              className="h-56 w-full rounded-lg object-cover"
            />
          )}
        </div>

        <h2 className="text-xl font-semibold first-letter:uppercase">
          {recipe.title}
        </h2>

        <p className="line-clamp-3 min-h-[4rem] text-sm text-gray-600">
          {recipe.description || "No description provided."}
        </p>

        <div className="flex w-full flex-1 items-end justify-between">
          <div className="flex flex-col items-start justify-start">
            <p className="line-clamp-1 text-sm text-gray-600">{createdAt}</p>

            <p className="line-clamp-1 text-xs text-gray-600">
              {recipe.author.name}
            </p>
          </div>

          <div className="space-x-1">
            {tags?.slice(0, 2)?.map((tag: string, index: number) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600"
              >
                {tag}
              </span>
            ))}

            {tags?.length > 2 && (
              <span
                data-filler=""
                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600"
              >
                ...
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
