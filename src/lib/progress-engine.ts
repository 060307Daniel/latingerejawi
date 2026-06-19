import {
  COURSE_STRUCTURE,
  ModuleSlug,
} from "./course-structure";

export function getModuleLessons(
  moduleSlug: ModuleSlug
): readonly string[] {
  return COURSE_STRUCTURE[moduleSlug];
}

export function calculateModuleProgress(
  moduleSlug: ModuleSlug,
  completedLessons: string[]
) {
  const lessons = getModuleLessons(moduleSlug);

  if (lessons.length === 0) return 0;

  const completed = lessons.filter((lesson) =>
    completedLessons.includes(lesson)
  ).length;

  return Math.round(
    (completed / lessons.length) * 100
  );
}

export function isLessonCompleted(
  lessonSlug: string,
  completedLessons: string[]
) {
  return completedLessons.includes(lessonSlug);
}

export function getLessonIndex(
  moduleSlug: ModuleSlug,
  lessonSlug: string
) {
  const lessons = getModuleLessons(moduleSlug);

  return lessons.indexOf(lessonSlug) + 1;
}