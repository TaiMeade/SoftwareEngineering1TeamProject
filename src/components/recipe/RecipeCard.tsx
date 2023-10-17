/* eslint-disable @next/next/no-img-element */
import { type Recipe } from "@prisma/client";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      {recipe.image && (
        <div className="mb-4">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-40 w-full rounded-lg object-cover"
          />
        </div>
      )}
      <div className="mb-2">
        <h2 className="text-xl font-semibold">{recipe.title}</h2>
      </div>
      {recipe.description && (
        <p className="mb-4 text-sm text-gray-600">{recipe.description}</p>
      )}
      <div className="mb-2 text-sm text-gray-600">
        <p>Created: {new Date(recipe.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(recipe.updatedAt).toLocaleDateString()}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-600">
          <p>Author: {recipe.authorId}</p>
        </div>
        <div className="space-x-2">
          {/* {recipe.tags &&
            recipe.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600"
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

// const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
//   return (
//     <div className="overflow-hidden rounded-lg bg-white shadow-lg">
//       {recipe.image && (
//         <img
//           src={recipe.image}
//           alt={recipe.title}
//           className="h-40 w-full object-cover"
//         />
//       )}
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{recipe.title}</h3>
//         {recipe.description && (
//           <p className="mt-2 text-gray-600">{recipe.description}</p>
//         )}
//         <div className="mt-4">
//           <h4 className="text-lg font-semibold">Ingredients</h4>
//           <ul className="list-disc pl-4">
//             {/* {recipe.ingredients.map((ingredient: string, index: number) => (
//               <li key={index}>{ingredient}</li>
//             ))} */}
//             {JSON.stringify(recipe.ingredients ?? {}, null, 2)}
//           </ul>
//         </div>
//         <div className="mt-4">
//           <h4 className="text-lg font-semibold">Directions</h4>
//           <ol className="list-decimal pl-4">
//             {/* {recipe.directions.map((direction: string, index: number) => (
//               <li key={index}>{direction}</li>
//             ))} */}
//             {JSON.stringify(recipe.directions ?? {}, null, 2)}
//           </ol>
//         </div>
//         <div className="mt-4">
//           <h4 className="text-lg font-semibold">Tags</h4>
//           <div className="flex flex-wrap">
//             {JSON.stringify(recipe.tags ?? {}, null, 2)}
//           </div>
//         </div>
//         <div className="mt-4 text-sm text-gray-600">
//           <p>Created: {new Date(recipe.createdAt).toLocaleDateString()}</p>
//           <p>Updated: {new Date(recipe.updatedAt).toLocaleDateString()}</p>
//           <p>Author: {recipe.authorId}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

export default RecipeCard;
