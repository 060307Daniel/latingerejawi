export const COURSE_STRUCTURE = {
  // =====================
  // ELEMENTA
  // =====================
  "elementa-1": [
    "pengenalan-huruf-mati",
    "latihan-1-huruf-mati",
    "quiz-1-huruf-mati",

    "pengenalan-huruf-hidup",
    "latihan-2-huruf-hidup",
    "quiz-2-huruf-hidup",
  ],

  // =====================
  // DOA-DOA DASAR
  // =====================
  "doa-doa-dasar": [
    "doa-tanda-salib",
    "latihan-1-tanda-salib",
    "quiz-1-tanda-salib",

    "doa-bapa-kami",
    "latihan-2-bapa-kami",
    "quiz-2-bapa-kami",

    /*"doa-salam-maria",
    "latihan-3-salam-maria",
    "quiz-3-salam-maria",

    "doa-kemuliaan",
    "latihan-4-kemuliaan",
    "quiz-4-kemuliaan",         DANIEL */
  ],

  // =====================
  // ORDINARIUM
  // =====================
  "ordinarium-misa": [
    /*"sanctus",
    "latihan-1-sanctus",
    "quiz-1-sanctus", DANIEL */ 

    "agnus-dei",
    "latihan-1-agnus-dei",
    "quiz-1-agnus-dei",
  ],

  // =====================
  // PUJI SYUKUR
  // =====================
  "puji-syukur": [
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
  ],

  // =====================
  // KATA UMUM
  // =====================
  /*"kata-umum": [
    "kata-umum",
    "latihan-1-kata-umum",
    "quiz-1-kata-umum",
  ],*/

  // =====================
  // FINAL
  // =====================
  "final-assessment": [
    "quiz-terakhir",
    "sertifikat",
    //"speech-test-full"
  ],
} as const;

export type ModuleSlug =
  keyof typeof COURSE_STRUCTURE;