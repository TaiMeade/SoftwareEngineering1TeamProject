import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "./session";
import { prisma } from "./db";
import { z } from "zod";

const f = createUploadthing();

const auth = async (_req: Request) => {
  const session = await getAuth();

  if (!session) return null;
  return session.user;
};

const reqSchema = z.object({
  recipeId: z.string().min(1),
});

const authWithRecipe = async (req: Request) => {
  const session = await getAuth();
  if (!session || !session?.user?.id) return null;

  const data = (await req.json()) as unknown;
  if (!data) return null;

  const parsed = reqSchema.safeParse(data);

  if (!parsed.success) return null;

  return {
    user: session.user,
    recipeId: parsed.data.recipeId,
  };
};

// FileRouter for your app, can contain multiple FileRoutes
export const userImageRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  userUpdateImg: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    // * Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.user.update({
        where: { id: metadata.userId },
        data: { image: file.url },
      });
    }),
  uploadRecipeImg: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const meta = await authWithRecipe(req);
      if (!meta) throw new Error("Unauthorized");

      return { userId: meta.user.id, recipeId: meta.recipeId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // // Return Image URL
      // return file.url;
      await prisma.recipe.update({
        where: { id: metadata.recipeId, authorId: metadata.userId },
        data: { image: file.url },
      });
    }),
} satisfies FileRouter;

export type UserImageRouter = typeof userImageRouter;
