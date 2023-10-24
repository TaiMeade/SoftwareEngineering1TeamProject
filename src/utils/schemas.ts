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

const directionsSchema = z.array(z.string());

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

const ingredientsSchema = z.array(
  z.object({
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
  }),
);

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
  return [data];
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
});

/**
 * Create recipe Schema
 */
export const createRecipeSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(200),
  tags: tagSchema.optional().default([]),
  cost: z.enum(["$", "$$", "$$$"]).default("$"),
  // ingredients: ingredientsSchema,
  // directions: directionsSchema,
  ingredients: z.array(z.string()).optional().default([]),
  directions: z.array(z.string()).optional().default([]),
});


/**
 * Create comment Schema
 */
export const createCommentSchema = z.object({
  text: z.string().min(3).max(150),
});