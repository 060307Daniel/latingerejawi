import { useEffect, useState } from "react";

const COOLDOWN_TIME = 30 * 60 * 1000;
const MAX_ATTEMPT = 3;

const getData = (key: string) =>
  JSON.parse(localStorage.getItem(key) || "{}");

const setData = (key: string, data: any) =>
  localStorage.setItem(key, JSON.stringify(data));

export function useQuizCooldown(quizKey: string) {
  const storageKey = `quiz_attempt_${quizKey}`;

  const [blocked, setBlocked] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [refresh, setRefresh] = useState(0);

  // CHECK STATUS
  useEffect(() => {
    const data = getData(storageKey);
    const now = Date.now();

    if (data.cooldownUntil && now < data.cooldownUntil) {
      setBlocked(true);
      setCooldownLeft(data.cooldownUntil - now);
      return;
    }

    setBlocked(false);
    setCooldownLeft(0);
  }, [storageKey, refresh]);

  // TIMER
  useEffect(() => {
    if (!blocked) return;

    const interval = setInterval(() => {
      const data = getData(storageKey);
      const remaining = data.cooldownUntil - Date.now();

      if (remaining <= 0) {
        setBlocked(false);
        setCooldownLeft(0);

        // reset session setelah cooldown selesai
        setData(storageKey, {
          count: 0,
          cooldownUntil: 0,
        });

        clearInterval(interval);
      } else {
        setCooldownLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [blocked, storageKey]);

  // REGISTER ATTEMPT (INI INTI LOGIC)
  const registerAttempt = (passed: boolean) => {
    const data = getData(storageKey);

    let count = data.count ?? 0;
    let cooldownUntil = data.cooldownUntil ?? 0;

    // kalau sudah lewat cooldown → reset
    if (cooldownUntil && Date.now() > cooldownUntil) {
      count = 0;
      cooldownUntil = 0;
    }

    // ❗ hanya hitung kalau gagal
    if (!passed) {
      count += 1;
    }

    // ❗ LOCK HANYA SAAT GAGAL KE-3
    if (!passed && count >= MAX_ATTEMPT) {
      cooldownUntil = Date.now() + COOLDOWN_TIME;
      setBlocked(true);
    }

    setData(storageKey, {
      count,
      cooldownUntil,
    });

    setRefresh((p) => p + 1);

    return { count, cooldownUntil };
  };

  return {
    blocked,
    cooldownLeft,
    registerAttempt,
  };
}