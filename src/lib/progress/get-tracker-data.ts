import { prisma } from "@/lib/prisma";
import { transformProgress } from "./transform-progress";

export async function getTrackerData(userId: string) {
  const data = await prisma.userProgress.findMany({
    where: { userId },
  });

  const formatted = transformProgress(data);

  return formatted;
}