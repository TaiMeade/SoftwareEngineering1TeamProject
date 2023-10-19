"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tag } from "@prisma/client";
import { type z } from "zod";

import { toast } from "sonner";
import { prettifyTag } from "~/utils";
import { createRecipeSchema } from "~/utils/schemas";

import AddDirections from "./AddDirections";
import AddIngredients from "./AddIngredients";

const CreateRecipeForm: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error>();

  const [dirs, setDirs] = useState<string[]>([]);
  const [ingdnts, setIngdnts] = useState<string[]>([]);

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof createRecipeSchema>
  >({
    resolver: zodResolver(createRecipeSchema),
  });

  const onFormSubmit = async (data: z.infer<typeof createRecipeSchema>) => {
    const res = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        directions: dirs,
        ingredients: ingdnts,
      }),
    });

    if (!res.ok) {
      console.log("Error creating recipe");
      setError(new Error("Error creating recipe"));
      return;
    } else {
      setSuccess(true);
    }

    console.log(data);
  };

  useEffect(() => {
    if (success) toast.success("Successfully creating recipe!");

    if (error) toast.error(error.message);
  }, [success, error]);

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex w-full max-w-3xl flex-col items-start gap-2 pb-24 [&>div]:flex [&>div]:w-full [&>div]:flex-col [&>div]:gap-2 "
    >
      {/* This section is for inserting the title */}
      <div>
        <label htmlFor="title" className="mb-2 text-2xl font-bold">
          Title of Recipe
        </label>
        <input
          id="title"
          {...register("title")}
          type="text"
          placeholder="Title"
          className="form-textarea block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {formState.errors?.title && (
          <p className="text-sm text-red-500">
            {formState.errors.title.message}
          </p>
        )}
      </div>

      {/* This section is for describing the food to be made */}
      <div>
        <label htmlFor="description" className="mb-2 mt-4 font-bold">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          {...register("description")}
          className="form-textarea block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {formState?.errors.description && (
          <p className="text-sm text-red-500">
            {formState.errors.description.message}
          </p>
        )}
      </div>

      {/* This section is for insering ingredients...find a way to make it a bulleted list? */}
      <div>
        <label htmlFor="ingredients" className="mb-2 mt-4 font-bold">
          Ingredients
        </label>
        {/* <textarea
          id="ingredients"
          placeholder="Ingredients"
          // {...register("ingredients")}
          className="form-textarea block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        /> */}
        {/* <ol>
              <li>1st</li>
              <li>2nd</li>
              <li>3rd</li>
            </ol> */}
        {/* {formState?.errors.ingredients && (
          <p className="text-sm text-red-500">
            {formState.errors.ingredients.message}
          </p>
        )} */}
        <ol className="list-decimal">
          {ingdnts.map((ing) => (
            <li key={ing} className="list-item list-inside">
              {ing}
            </li>
          ))}
        </ol>

        <AddIngredients ingredients={ingdnts} setIngredients={setIngdnts} />
      </div>

      <div>
        <label htmlFor="directions" className="mb-2 mt-4 font-bold">
          Directions
        </label>
        {/* 
        <textarea
          id="directions"
          // {...register("directions")}
          placeholder="Directions"
          className="form-textarea block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        /> */}
        {/* {formState?.errors.directions && (
          <p className="text-sm text-red-500">
            {formState.errors.directions.message}
          </p>
        )} */}
        <ol className="list-decimal">
          {dirs.map((dir) => (
            <li key={dir} className="list-item list-inside">
              {dir}
            </li>
          ))}
        </ol>

        <AddDirections directions={dirs} setDirections={setDirs} />
      </div>

      {/* This section is for selecting tags...ugly at the moment */}
      <div>
        <label htmlFor="tags" className="mb-1 mt-4 font-bold">
          Tags
        </label>
        <div className="mb-2 text-xs">
          Please hold down CTRL to select more than one.
        </div>

        <select
          id="tags"
          multiple
          {...register("tags")}
          className="ring-outset form-multiselect mx-0 flex h-64 w-52 flex-row flex-wrap items-start justify-start gap-1 overflow-y-scroll p-0 ring-1 ring-black"
        >
          {...Object.keys(Tag)?.map((tag) => (
            <option key={tag} value={tag} className="rounded-none px-2 py-1">
              {prettifyTag(tag)}
            </option>
          ))}
        </select>
        {formState?.errors.tags && (
          <p className="text-sm text-red-500">
            {formState.errors.tags.message}
          </p>
        )}
      </div>

      {/* This section is for selecting the rough cost estimate */}
      <div>
        <label htmlFor="cost" className="mb-1 mt-4 font-bold">
          Cost
        </label>
        <select
          id="cost"
          {...register("cost")}
          className="ring-outset rounded ring-1 ring-black"
        >
          <option value="low">$</option>
          <option value="medium">$$</option>
          <option value="high">$$$</option>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        <button type="submit" className="icook-button">
          Create Recipe
        </button>
      </div>
    </form>
  );
};

export default CreateRecipeForm;
