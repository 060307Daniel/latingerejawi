export function transformProgress(data: any[]) {
  const result: Record<string, string[]> = {};

  data.forEach((item) => {
    if (!result[item.moduleSlug]) {
      result[item.moduleSlug] = [];
    }

    // cukup tandai 1x saja (tidak perlu semua lesson dihitung)
    if (item.completed && result[item.moduleSlug].length === 0) {
      result[item.moduleSlug].push("completed");
    }
  });

  return result;
}