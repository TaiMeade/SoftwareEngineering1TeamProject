/* eslint-disable @next/next/no-img-element */
import { type Recipe } from "@prisma/client";

interface RecipePageProps {
  recipe: Recipe;
}

const RecipePage: React.FC<RecipePageProps> = ({ recipe }) => {
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
          {/* {recipe.ingredients.map((ingredient: string, index: number) => (
            <li key={index} className="text-lg">
              {ingredient}
            </li>
          ))} */}
          {JSON.stringify(recipe.ingredients ?? {}, null, 2)}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Directions</h2>
        <ol className="list-inside list-decimal">
          {/* {recipe.directions.map((direction: string, index: number) => (
            <li key={index} className="text-lg">
              {direction}
            </li>
          ))} */}
          {JSON.stringify(recipe.directions ?? {}, null, 2)}
        </ol>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-lg text-gray-600">
          <p>Author: {recipe.authorId}</p>
        </div>
        <div className="space-x-2">
          {/* {recipe.tags &&
            recipe.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 rounded-full text-blue-600 text-lg"
              >
                {tag}
              </span>
            ))} */}
          {JSON.stringify(recipe.tags ?? {}, null, 2)}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
