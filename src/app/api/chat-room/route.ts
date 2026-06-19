import { prisma } from "@/lib/prisma";
import { verify } from "jsonwebtoken";

export async function POST(req: Request) {
  const body = await req.json();
  const { pastorId } = body;

  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded: any = verify(token, process.env.JWT_SECRET!);

  const userId = decoded.id;

  let room = await prisma.chatRoom.findFirst({
    where: {
      userId,
      pastorId,
    },
  });

  if (!room) {
    room = await prisma.chatRoom.create({
      data: {
        userId,
        pastorId,
      },
    });
  }

  return Response.json(room);
}