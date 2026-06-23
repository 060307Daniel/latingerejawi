import { describe, it, expect, vi } from "vitest";
import { trackLesson } from "./track-lesson";

describe("trackLesson", () => {
  it("should return response data when request succeeds", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
      }),
    }) as any;

    const result = await trackLesson({
      userId: 1,
      moduleSlug: "elementa",
      lessonSlug: "pengenalan-huruf-mati",
    });

    expect(result).toEqual({
      success: true,
    });
  });

  it("should throw error when request fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    }) as any;

    await expect(
      trackLesson({
        userId: 1,
        moduleSlug: "elementa",
        lessonSlug: "pengenalan-huruf-mati",
      })
    ).rejects.toThrow("Failed to track progress");
  });
});