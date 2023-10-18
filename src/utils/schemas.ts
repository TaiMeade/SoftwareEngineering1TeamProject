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
