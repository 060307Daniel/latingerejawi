import { describe, it, expect } from "vitest";
import { transformProgress } from "./transform-progress";

describe("transformProgress", () => {
  it("should add valid completed lesson", () => {
    const data = [
      {
        moduleSlug: "elementa",
        lessonSlug: "pengenalan-huruf-mati",
        completed: true,
      },
    ];

    const result = transformProgress(data);

    expect(result).toEqual({
      elementa: ["pengenalan-huruf-mati"],
    });
  });

  it("should ignore incomplete lesson", () => {
    const data = [
      {
        moduleSlug: "elementa",
        lessonSlug: "pengenalan-huruf-mati",
        completed: false,
      },
    ];

    const result = transformProgress(data);

    expect(result).toEqual({
      elementa: [],
    });
  });

  it("should append lesson to existing module", () => {
    const data = [
      {
        moduleSlug: "elementa",
        lessonSlug: "pengenalan-huruf-mati",
        completed: true,
      },
      {
        moduleSlug: "elementa",
        lessonSlug: "latihan-1-huruf-mati",
        completed: true,
      },
    ];

    const result = transformProgress(data);

    expect(result.elementa).toHaveLength(2);
  });

  it("should ignore invalid lesson slug", () => {
    const data = [
      {
        moduleSlug: "elementa",
        lessonSlug: "lesson-tidak-valid",
        completed: true,
      },
    ];

    const result = transformProgress(data);

    expect(result.elementa).toEqual([]);
  });
});