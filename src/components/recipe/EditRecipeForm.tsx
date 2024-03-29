"use client";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { useRouter } from "next/navigation";
import { type Recipe, Tag } from "@prisma/client";
import { type z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRecipeSchema,
  parseDirections,
  parseIngredients,
  parseTags,
} from "~/utils/schemas";

import { toast } from "sonner";
import { prettifyTag } from "~/utils";

import NewIngredient from "./NewIngredient";
import NewDirection from "./NewDirection";

import { FaSpinner } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useUploadThing } from "~/utils/ut";
import { type UploadFileResponse } from "uploadthing/client";

type FormData = z.infer<typeof createRecipeSchema>;

interface EditRecipeProps {
  recipe: Recipe;
}

const EditRecipeForm: React.FC<EditRecipeProps> = ({ recipe }) => {
  const router = useRouter();

  const defTags = parseTags(recipe.tags);
  const defIngs = parseIngredients(recipe.ingredients);
  const defDirections = parseDirections(recipe.directions);

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: recipe.title,
      description: recipe.description ?? "",
      tags: defTags,
      ingredients: defIngs,
      cost: "$$",
      directions: defDirections,
      image: recipe.image ?? null,
    },
  });

  const { startUpload } = useUploadThing("uploadRecipeImg", {
    onUploadBegin: () => {
      console.log("upload begin");
    },
    onClientUploadComplete: (res) => {
      console.log(res?.map((r) => r.url));
    },
  });

  const [file, setFile] = useState<File | null>(null);

  const [dirs, setDirs] = useState<string[]>(defDirections);

  const [ingdnts, setIngdnts] = useState<Ingredient[]>(defIngs);

  const RemoveDirection = (removeDir: string) => {
    const newDirections = dirs.filter((dir) => dir !== removeDir);

    setDirs(newDirections);
  };

  const RemoveIngredient = (removeIng: Ingredient) => {
    const newIngdnts = ingdnts.filter((ingdnt) => ingdnt !== removeIng);
    setIngdnts(newIngdnts);
  };

  async function onSubmit(data: FormData) {
    console.log("Submitting", data);

    let fileUrls: UploadFileResponse[] | undefined;

    if (file) {
      fileUrls = await startUpload([file]);
      console.log("fileUrls", fileUrls);
    }

    const res = await fetch("/api/recipe/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        id: recipe.id,
        directions: dirs ?? [],
        ingredients: ingdnts ?? [],
        image: fileUrls?.[0]?.url ?? null,
      }),
    });

    if (!res.ok) {
      console.log("Error editing recipe");
      toast.error("Error editing recipe: " + res.statusText);
      return;
    }
    const res_data = (await res.json()) as Recipe;

    toast.success(`Successfully edited recipe ${res_data.title}!`);

    await new Promise((r) => setTimeout(r, 340));
    router.push(`/recipes/${res_data.id}`);
  }

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-3xl flex-col items-start gap-2 pb-24 [&>div]:flex [&>div]:w-full [&>div]:flex-col [&>div]:gap-2 "
    >
      <div className="form-control">
        <label htmlFor="title" className="label mb-2 text-2xl">
          <span className="label-text text-lg font-bold">Title</span>
        </label>
        <input
          id="title"
          {...register("title")}
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
        />
        {formState.errors?.title && (
          <p className="text-sm text-red-500">
            {formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="form-control">
        <label htmlFor="description" className="label mb-2 mt-4">
          <span className="label-text text-lg font-bold">Description</span>
        </label>
        <textarea
          id="description"
          placeholder="Description"
          {...register("description")}
          className="textarea textarea-bordered textarea-lg"
        />
        {formState?.errors.description && (
          <p className="text-sm text-red-500">
            {formState.errors.description.message}
          </p>
        )}
      </div>

      <div className="form-control">
        <label htmlFor="ingredients" className="label mb-2 mt-4">
          <span className="label-text text-lg font-bold">Ingredients</span>
        </label>

        <Reorder.Group
          axis="y"
          values={ingdnts}
          onReorder={setIngdnts}
          as="ol"
          className="mb-2 list-decimal"
        >
          {ingdnts.map((ing) => (
            <Reorder.Item
              key={ing.name + ing.quantity + ing.unit}
              value={ing}
              className="list-item list-inside"
            >
              <div className="inline-flex flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={() => RemoveIngredient(ing)}
                  className="text-lg"
                >
                  <FaTrash />
                </button>
                <span>
                  {ing.name} {ing.quantity} {ing.unit}
                </span>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <NewIngredient setIngredients={setIngdnts} />
      </div>

      <div className="form-control">
        <label htmlFor="directions" className="label mb-2 mt-4">
          <span className="label-text text-lg font-bold">Directions</span>
        </label>

        <Reorder.Group
          axis="y"
          values={dirs}
          onReorder={setDirs}
          as="ol"
          className="mb-2 list-decimal"
        >
          {dirs.map((dir) => (
            <Reorder.Item
              key={dir}
              value={dir}
              as="li"
              className="list-item list-inside p-2"
            >
              <div className="inline-flex flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={() => RemoveDirection(dir)}
                  className="text-lg"
                >
                  <FaTrash />
                </button>
                <span>{dir}</span>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <NewDirection setDirections={setDirs} />
      </div>

      {/* This section is for selecting tags...ugly at the moment */}
      <div className="form-control">
        <label htmlFor="tags" className="label mb-1 mt-4 font-bold">
          <span className="label-text text-lg font-bold">Tags</span>
        </label>

        <select
          id="tags"
          multiple={true}
          {...register("tags")}
          className="ring-outset form-multiselect mx-0 flex h-64 w-52 flex-row flex-wrap items-start justify-start gap-1 overflow-y-scroll p-0 ring-1 ring-black"
        >
          {...Object.keys(Tag)?.map((tag) => (
            <option key={tag} value={tag} className="rounded-none px-2 py-1">
              {prettifyTag(tag)}
            </option>
          ))}
        </select>

        <label htmlFor="tags" className="label-text-alt text-xs">
          <span className="label-text-alt text-xs">
            Please hold down CTRL to select more than one.
          </span>
        </label>

        {formState?.errors.tags && (
          <p className="text-sm text-red-500">
            {formState.errors.tags.message}
          </p>
        )}
      </div>

      {/* This section is for selecting the rough cost estimate */}
      <div className="form-control">
        <label htmlFor="image" className="label mb-1 mt-4 ">
          <span className="label-text text-lg font-bold">Upload an Image</span>
          <span className="label-text-alt">(Optional)</span>
        </label>

        <input
          id="image"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
          className="file-input file-input-bordered w-full"
        />
      </div>

      {/* This section is for selecting the rough cost estimate */}
      <div className="form-control">
        <label htmlFor="cost" className="label mb-1 mt-4 ">
          <span className="label-text text-lg font-bold">Cost</span>
          <span className="label-text-alt">How expensive is this recipe?</span>
        </label>
        <select
          id="cost"
          {...register("cost")}
          className="select select-bordered rounded bg-transparent ring-1 ring-black"
        >
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>
      </div>

      <div className="form-control mt-2 flex flex-col gap-4">
        <button
          type="submit"
          disabled={formState.isSubmitting || formState.isSubmitted}
          className="btn btn-primary transition-all disabled:cursor-not-allowed disabled:hover:bg-zinc-900"
        >
          {!formState.isSubmitting ? (
            "Saved Edited Recipe"
          ) : (
            <FaSpinner className="m-1 animate-spin text-lg text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default EditRecipeForm;
