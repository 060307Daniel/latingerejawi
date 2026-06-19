import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const pastorId = searchParams.get("pastorId");

  const rooms = await prisma.chatRoom.findMany({
    where: pastorId
      ? {
          pastorId: pastorId,
        }
      : undefined,
    include: {
      user: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return Response.json(rooms);
}