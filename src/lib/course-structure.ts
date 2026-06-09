export const COURSE_STRUCTURE = {
  "elementa-1": [
    "huruf-c",
    "huruf-g",
    "huruf-s",
    "huruf-ti",
    "latihan",
    "evaluasi",
  ],
} as const;

export type ModuleSlug = keyof typeof COURSE_STRUCTURE;