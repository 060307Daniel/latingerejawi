import { COURSE_STRUCTURE } from "./course-structure";

/**
 * Ambil semua lesson dalam module
 */
export function getModuleLessons(moduleSlug: string) {
  return COURSE_STRUCTURE[moduleSlug] || [];
}

/**
 * Hitung progress module (%)
 */
export function calculateModuleProgress(
  moduleSlug: string,
  completedLessons: string[]
) {
  const lessons = getModuleLessons(moduleSlug);

  if (lessons.length === 0) return 0;

  const completed = lessons.filter((lesson) =>
    completedLessons.includes(lesson)
  ).length;

  return Math.round((completed / lessons.length) * 100);
}

/**
 * Cek apakah lesson sudah selesai
 */
export function isLessonCompleted(
  lessonSlug: string,
  completedLessons: string[]
) {
  return completedLessons.includes(lessonSlug);
}

/**
 * Ambil index progress (untuk "Langkah x dari y")
 */
export function getLessonIndex(
  moduleSlug: string,
  lessonSlug: string
) {
  const lessons = getModuleLessons(moduleSlug);
  return lessons.indexOf(lessonSlug) + 1;
}