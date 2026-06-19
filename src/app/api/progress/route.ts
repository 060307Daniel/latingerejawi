import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🔥 MASUK API:", body);

    const { userId, moduleSlug, lessonSlug } = body;

    const result = await prisma.userProgress.upsert({
      where: {
        userId_moduleSlug_lessonSlug: {
          userId,
          moduleSlug,
          lessonSlug,
        },
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
      create: {
        userId,
        moduleSlug,
        lessonSlug,
        completed: true,
        completedAt: new Date(),
      },
    });

    console.log("✅ SAVE SUCCESS:", result);

    return Response.json(result);
  } catch (error) {
    console.log("❌ ERROR:", error);

    return Response.json(
      { message: "error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json([]);
  }

  const data = await prisma.userProgress.findMany({
    where: {
      userId,
    },
  });

  return Response.json(data);
}