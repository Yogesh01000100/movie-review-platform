import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser(name, email) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}
