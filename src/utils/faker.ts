import { faker } from "@faker-js/faker";

export const fakeComments = async (count: number): Promise<PrismaComment[]> => {
  await new Promise((r) => setTimeout(r, 1000));

  const comments: PrismaComment[] = [];

  for (let i = 0; i < count; i++) {
    const authorId = faker.string.uuid();
    comments.push({
      recipeId: faker.string.uuid(),
      id: faker.string.uuid(),
      text: faker.lorem.paragraph({
        min: 1,
        max: 5,
      }),
      author: {
        id: authorId,
        name: null,
        username: faker.internet.userName(),
        image: faker.image.avatar(),
      },
      authorId: authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
      replies: [],
    } as PrismaComment);
  }

  return comments;
};
