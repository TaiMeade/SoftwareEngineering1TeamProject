import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "./session";
import { prisma } from "./db";

const f = createUploadthing();

const auth = async (_req: Request) => {
  const session = await getAuth();

  if (!session) return null;
  return session.user;
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
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async () => {
      await new Promise((r) => setTimeout(r, 1));
      // * Dont Need to Do This
      // await prisma.recipe.update({
      //   where: { id: metadata.recipeId, authorId: metadata.userId },
      //   data: { image: file.url },
      // });
    }),
} satisfies FileRouter;

export type UserImageRouter = typeof userImageRouter;
