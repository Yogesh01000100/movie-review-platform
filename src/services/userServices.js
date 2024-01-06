import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function userExists(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return !!user;
  } catch (error) {
    throw error;
  }
}
