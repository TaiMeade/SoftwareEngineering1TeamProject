import { type Recipe } from "@prisma/client";

import Link from "next/link";
import Image from "next/image";

import { fmtDate } from "~/utils";
import { parseTags } from "~/utils/schemas";
import { cn } from "~/utils/tw";

import Tag from "./Tag";

interface RecipeCardProps {
  recipe: Recipe & {
    author: { name: string | null };
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const tags = parseTags(recipe.tags);
  const createdAt = fmtDate(recipe.createdAt);

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="card scale-100 rounded-lg shadow-lg transition-all duration-200 ease-in-out hover:scale-[1.01]"
    >
      <div
        className={cn(
          // animate-pulse
          "w-full border-b border-b-gray-200/80 bg-gray-300",
          // recipe.image && "animate-none",
        )}
      >
        <Image
          src={recipe.image ?? "/placeholder.png"}
          width={512}
          height={224}
          alt={recipe.title}
          style={{
            width: "100%",
            height: "auto",
          }}
          className="aspect-video h-72 w-auto object-cover sm:h-80 md:h-56"
        />
      </div>

      <div className="card-body rounded-b-lg bg-slate-50 p-4">
        <div className="flex flex-col">
          <h2 className="card-title text-xl font-semibold first-letter:!uppercase">
            {recipe.title}
          </h2>

          <p className="line-clamp-1 text-xs text-gray-600">
            {recipe.author.name}
          </p>
        </div>

        <p className="line-clamp-3 min-h-[4rem] text-sm text-gray-600">
          {recipe.description || "No description provided."}
        </p>
        <div className="flex flex-col items-start justify-start">
          <p className="line-clamp-1 text-sm text-gray-600">{createdAt}</p>
        </div>

        <div className="card-actions min-h-[1.3rem]">
          <div className="flex flex-row items-end justify-end space-x-1">
            {tags?.slice(0, 4).map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
