import { Tag } from "@prisma/client";
import { type JsonValue } from "@prisma/client/runtime/library";
import { z } from "zod";

// type ITag = keyof typeof Tag;
// type ITags = (keyof typeof Tag)[];

const tagSchema = z.array(z.enum(["", ...Object.keys(Tag)]));

/**
 * Function to parse tags from a json string to an array of strings.
 */
export const parseTags = (_tags: JsonValue): string[] => {
  const parsed = tagSchema.safeParse(_tags);
  if (!parsed.success) {
    console.log(parsed.error);
    return [];
  }
  const { data } = parsed;
  if (Array.isArray(data)) {
    return data;
  }
  return [data];
};

export const directionSchema = z.string().min(1, "Direction Cannot Be Empty");

export const directionsSchema = z.array(directionSchema);

/**
 * Function to parse directions
 * @param _directions
 */
export const parseDirections = (_directions: JsonValue): string[] => {
  const parsed = directionsSchema.safeParse(_directions);
  if (!parsed.success) {
    console.log(parsed.error);
    return [];
  }
  const { data } = parsed;
  if (Array.isArray(data)) {
    return data;
  }
  return [data];
};

export const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name cannot be empty"),
  quantity: z.string(),
  unit: z.string(),
});

export const ingredientsSchema = z.array(ingredientSchema);

/**
 * Function to parse ingredients
 * @param _ingredients
 */
export const parseIngredients = (_ingredients: JsonValue) => {
  const parsed = ingredientsSchema.safeParse(_ingredients);
  if (!parsed.success) {
    console.log(parsed.error);
    return [];
  }
  const { data } = parsed;
  if (Array.isArray(data)) {
    return data;
  }
  return [];
};

export const updateUserSchema = z.object({
  bio: z
    .string()
    .max(200, {
      message: "Bio must be less than 200 characters",
    })
    .optional(),
  username: z.string().min(3).max(20).optional(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(20, {
      message: "Password must be less than 20 characters",
    })
    .optional(),
  image: z.string().optional(),
});

/**
 * Create recipe Schema
 */
export const createRecipeSchema = z.object({
  title: z.string().min(3, "Title Cannot Be Empty").max(50),
  description: z.string().min(3, "Description Cannot Be Empty").max(300),
  tags: tagSchema.optional().default([]),
  cost: z.enum(["$", "$$", "$$$"]).default("$"),
  ingredients: ingredientsSchema.default([]),
  directions: directionsSchema.default([]),
  image: z.string().optional().nullable().default("/placeholder.png"),
});

/**
 * Delete recipe Schema
 */
export const deleteRecipeSchema = z.object({
  id: z.string().min(1),
});

/**
 * Update LikedBy schema
 */
export const updateLikedBySchema = z.object({
  id: z.string().min(1),
});

/**
 * Create comment Schema
 */
export const createCommentSchema = z.object({
  text: z.string().min(3).max(200),
  recipeId: z.string().min(1),
});
