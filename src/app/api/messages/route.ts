import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const { roomId, senderId, text } = body;

  const message = await prisma.message.create({
    data: {
      roomId,
      senderId,
      text,
    },
  });

  return Response.json(message);
}