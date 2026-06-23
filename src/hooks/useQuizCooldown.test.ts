// @vitest-environment jsdom

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQuizCooldown } from "./useQuizCooldown";

describe("useQuizCooldown", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not increment count when quiz is passed", () => {
    const { result } = renderHook(() =>
      useQuizCooldown("test-quiz")
    );

    let response;

    act(() => {
      response = result.current.registerAttempt(true);
    });

    expect(response).toEqual({
      count: 0,
      cooldownUntil: 0,
    });
  });

  it("should increment count when quiz is failed", () => {
    const { result } = renderHook(() =>
      useQuizCooldown("test-quiz")
    );

    let response;

    act(() => {
      response = result.current.registerAttempt(false);
    });

    expect(response).toEqual({
      count: 1,
      cooldownUntil: 0,
    });
  });

  it("should activate cooldown after three failed attempts", () => {
    const { result } = renderHook(() =>
      useQuizCooldown("test-quiz")
    );

    let response;

    act(() => {
      result.current.registerAttempt(false);
      result.current.registerAttempt(false);
      response = result.current.registerAttempt(false);
    });

    expect(response!.count).toBe(3);
    expect(response!.cooldownUntil).toBeGreaterThan(Date.now());
  });

  it("should reset count after cooldown expired", () => {
    const expired = Date.now() - 1000;

    localStorage.setItem(
      "quiz_attempt_test-quiz",
      JSON.stringify({
        count: 3,
        cooldownUntil: expired,
      })
    );

    const { result } = renderHook(() =>
      useQuizCooldown("test-quiz")
    );

    let response;

    act(() => {
      response = result.current.registerAttempt(true);
    });

    expect(response).toEqual({
      count: 0,
      cooldownUntil: 0,
    });
  });

  it("should update cooldownLeft while active cooldown", () => {
    vi.useFakeTimers();

    localStorage.setItem(
      "quiz_attempt_test-quiz",
      JSON.stringify({
        count: 3,
        cooldownUntil: Date.now() + 5000,
      })
    );

    const { result } = renderHook(() =>
      useQuizCooldown("test-quiz")
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.cooldownLeft).toBeGreaterThan(0);
  });

  it("should reset automatically when cooldown ends", () => {
    vi.useFakeTimers();

    localStorage.setItem(
      "quiz_attempt_test-quiz",
      JSON.stringify({
        count: 3,
        cooldownUntil: Date.now() + 1000,
      })
    );

    const { result } = renderHook(() =>
      useQuizCooldown("test-quiz")
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.blocked).toBe(false);
    expect(result.current.cooldownLeft).toBe(0);

    const data = JSON.parse(
      localStorage.getItem("quiz_attempt_test-quiz")!
    );

    expect(data.count).toBe(0);
    expect(data.cooldownUntil).toBe(0);
  });
});