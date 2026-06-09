export async function trackLesson({
  userId,
  moduleSlug,
  lessonSlug,
}: {
  userId: number;
  moduleSlug: string;
  lessonSlug: string;
}) {
  const res = await fetch("/api/progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      moduleSlug,
      lessonSlug,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to track progress");
  }

  return res.json();
}