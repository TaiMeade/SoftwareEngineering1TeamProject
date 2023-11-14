import { PrismaClient, type User, type Prisma, Tag } from "@prisma/client";
import { faker } from "@faker-js/faker";

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

const prisma = new PrismaClient();
const NUM_RECIPES_TO_CREATE = 50;

/**
 * Function to get the first admin user in the database to use as the author of the recipes.
 * @returns {Promise<User>} The id of the first admin user.
 * @throws {Error} If no admin user is found.
 */
const getFirstAdminUser = async (): Promise<User> => {
  const adminUser = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });
  if (!adminUser) {
    throw new Error("No admin user found");
  }
  return adminUser;
};

type ITag = keyof typeof Tag;

/**
 * Function to generate random tags for a recipe.
 * @returns {Tag[]} The tags.
 */
const generateRandomTags = (): string[] => {
  const tags: ITag[] = [];
  // * Random Number between 0 and 4 - number of tags
  const MAX_TAGS = 2;
  const randNumTags = Math.floor(Math.random() * MAX_TAGS + 1) + 1;
  const keys = Object.keys(Tag);

  for (let i = 0; i < randNumTags; i++) {
    // * Random Index between length of 0 and length of keys
    const randIdx = Math.floor(Math.random() * keys.length);
    const tag: ITag = keys[randIdx] as ITag;

    // * If tags does not include the tag, push it
    if (tag?.length > 0 && !tags.includes(tag)) {
      tags.push(keys[randIdx] as ITag);
    } else i--;
  }
  return tags;
};

/**
 * Function to create a random recipe using the "faker" package from npm.
 * @param {string} authorId The id of the author of the recipe.
 * @returns {Recipe} The recipe object.
 */
const createRandomRecipe = (authorId: string): Prisma.RecipeCreateInput => {
  return {
    author: { connect: { id: authorId } },
    // title: faker.lorem.words({ min: 1, max: 3 }),
    // Random Food Name
    title: faker.lorem.words({ min: 1, max: 3 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    image: faker.image.urlLoremFlickr({
      category: "food",
      width: 1920,
      height: 1080,
    }),
    description: faker.lorem.paragraph(),
    ingredients: {
      toJSON: () => {
        const ingredients: Ingredient[] = [];
        for (let i = 0; i < 5; i++) {
          ingredients.push({
            name: faker.lorem.words(2),
            quantity: faker.number
              .float({
                min: 0.5,
                max: 10,
                precision: 0.1,
              })
              .toString(),
            unit: faker.science.unit().name,
          });
        }
        return ingredients;
      },
    },
    tags: { toJSON: () => generateRandomTags() },
    directions: {
      toJSON: () => {
        const directions: string[] = [];
        for (let i = 0; i < 3; i++) {
          directions.push(faker.lorem.paragraph());
        }
        return directions;
      },
    },
  };
};

const main = async () => {
  // * Happy Emoji Start
  console.log("✨ Start");

  // * Delete all recipes
  await prisma.recipe.deleteMany();

  // * Get first admin user
  const admin = await getFirstAdminUser();

  // * Create recipes
  const transactions: Prisma.PrismaPromise<unknown>[] = [];

  for (let i = 0; i < NUM_RECIPES_TO_CREATE; i++) {
    const recipe = createRandomRecipe(admin.id);
    transactions.push(
      prisma.recipe.create({
        data: recipe,
      }),
    );
  }

  await prisma.$transaction(transactions);

  // * Happy Emoji Done
  console.log("✅ Done");

  await prisma.$disconnect();
};

main().catch((_e) => {
  console.error(_e);
  process.exit(1);
});
