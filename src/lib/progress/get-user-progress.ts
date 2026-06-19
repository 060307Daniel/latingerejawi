import { prisma } from "@/lib/prisma";

export async function getUserProgress(userId: string) {
  const data = await prisma.userProgress.findMany({
    where: { userId },
  });

  return data;
}