import { type Metadata } from "next";
import { type Recipe, type Tag } from "@prisma/client";

import { parseTags } from "./schemas";

export const BASE_URL = "https://example-icook-url.com";
export const SITE_NAME = "iCook";

type RecipeWithAuthor = Recipe & {
  author: {
    id: string;
    username: string | null;
    name: string | null;
  };
};

export const generateRecipeSEO = (recipe: RecipeWithAuthor): Metadata => {
  const tags = parseTags(recipe.tags);
  const name = recipe.author.username || recipe.author.name || "Anonymous";
  const authorURL = `${BASE_URL}/profile/${recipe.author.id}`;

  return {
    title: `iCook | ${recipe.title}`,
    authors: [{ name, url: authorURL }],
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description || recipe.title,
      url: `${BASE_URL}/${recipe.id}`,
      type: "article",
      tags: tags,
      images: [
        {
          url: recipe.image || `${BASE_URL}/placeholder.png`,
          alt: recipe.title,
          width: 800,
          height: 600,
        },
      ],
    },
  };
};

type SafeProfile = {
  id: string;
  name: string | null;
  image: string | null;
  username: string | null;
  bio: string | null;
  favoriteFood: string | null;
  favoriteTag: Tag | null;
  recipes: Recipe[];
};

export const generateAuthorSEO = (author: SafeProfile): Metadata => {
  const name = author.username || author.name || "Anonymous";
  const authorURL = `${BASE_URL}/profile/${author.id}`;
  const profileImage = author.image || `${BASE_URL}/placeholder.png`;

  return {
    title: `iCook | ${name}`,
    authors: [{ name, url: authorURL }],
    description: author.bio,
    openGraph: {
      title: name,
      description: author.bio || name,
      url: authorURL,
      type: "profile",
      images: [
        {
          url: profileImage,
          alt: name,
          width: 256,
          height: 256,
        },
      ],
    },
  };
};
