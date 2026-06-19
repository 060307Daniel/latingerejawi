import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("🚀 SEED START");

  await prisma.userProgress.createMany({
    data: [
            // ======================
      // PUJI SYUKUR
      // ======================
      {
        userId: "cmqfwxnq0000074u6xyhl7tv2",
        moduleSlug: "puji-syukur",
        lessonSlug: "haec-dies",
        completed: true,
        completedAt: new Date("2026-06-18T01:45:06.991Z"),
      },
      {
        userId: "cmqfwxnq0000074u6xyhl7tv2",
        moduleSlug: "puji-syukur",
        lessonSlug: "latihan-1-haec-dies",
        completed: true,
        completedAt: new Date("2026-06-18T09:32:20.075Z"),
      },
      {
        userId: "cmqfwxnq0000074u6xyhl7tv2",
        moduleSlug: "puji-syukur",
        lessonSlug: "quiz-1-haec-dies",
        completed: true,
        completedAt: new Date("2026-06-18T08:25:32.858Z"),
      },

      // ======================
      // FINAL ASSESSMENT
      // ======================
      {
        userId: "cmqfwxnq0000074u6xyhl7tv2",
        moduleSlug: "final-assessment",
        lessonSlug: "quiz-terakhir",
        completed: true,
        completedAt: new Date("2026-06-18T23:41:07.259Z"),
      },
      {
        userId: "cmqfwxnq0000074u6xyhl7tv2",
        moduleSlug: "final-assessment",
        lessonSlug: "sertifikat",
        completed: true,
        completedAt: new Date("2026-06-19T03:04:21.532Z"),
      },
    ],
    skipDuplicates: true,
  });

  console.log("🎉 SEED FINISHED SUCCESSFULLY");
}

main()
  .catch((e) => {
    console.error("❌ SEED ERROR:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });