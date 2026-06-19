export function transformProgress(data: any[]) {
  const result: Record<string, string[]> = {};

  const validLessons = [
    // =====================
    // ELEMENTA
    // =====================
    "pengenalan-huruf-mati",
    "latihan-1-huruf-mati",
    "quiz-1-huruf-mati",

    "pengenalan-huruf-hidup",
    "latihan-2-huruf-hidup",
    "quiz-2-huruf-hidup",

    // =====================
    // DOA-DOA DASAR
    // =====================
    "doa-tanda-salib",
    "latihan-1-tanda-salib",
    "quiz-1-tanda-salib",

    "doa-bapa-kami",
    "latihan-2-bapa-kami",
    "quiz-2-bapa-kami",

    "doa-salam-maria",
    "latihan-3-salam-maria",
    "quiz-3-salam-maria",

    "doa-kemuliaan",
    "latihan-4-kemuliaan",
    "quiz-4-kemuliaan",

    // =====================
    // ORDINARIUM MISA
    // =====================
    /*"sanctus",
    "latihan-1-sanctus",
    "quiz-1-sanctus",*/

    "agnus-dei",
    "latihan-1-agnus-dei",
    "quiz-1-agnus-dei",

    // =====================
    // PUJI SYUKUR
    // =====================
    "haec-dies",
    "latihan-1-haec-dies",
    "quiz-1-haec-dies",

    /*"veni-creator-spiritus",
    "latihan-2-veni-creator-spiritus",
    "quiz-2-veni-creator-spiritus",

    "requiem",
    "latihan-3-requiem",
    "quiz-3-requiem",

    "tantum-ergo",
    "latihan-4-tantum-ergo",
    "quiz-4-tantum-ergo",*/

    // =====================
    // KATA UMUM
    // =====================
    /*"kata-umum",
    "latihan-1-kata-umum",
    "quiz-1-kata-umum",*/

    // =====================
    // FINAL ASSESSMENT
    // =====================
    "quiz-terakhir",
    "sertifikat",
    //"speech-test-full"
  ];

  data.forEach((item) => {
    if (!result[item.moduleSlug]) {
      result[item.moduleSlug] = [];
    }

    if (
      item.completed &&
      validLessons.includes(item.lessonSlug)
    ) {
      result[item.moduleSlug].push(item.lessonSlug);
    }
  });

  return result;
}