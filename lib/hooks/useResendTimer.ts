"use client";

import { useState, useEffect, useCallback } from "react";

interface UseResendTimerOptions {
  initialSeconds?: number;
  storageKey?: string;
}

export function useResendTimer({
  initialSeconds = 63,
  storageKey = "elfulk_resend_otp_expires_at",
}: UseResendTimerOptions = {}) {
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    if (typeof window === "undefined") return initialSeconds;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const expiresAt = parseInt(stored, 10);
      const remaining = Math.ceil((expiresAt - Date.now()) / 1000);
      if (remaining > 0) return remaining;
    }
    const expiresAt = Date.now() + initialSeconds * 1000;
    localStorage.setItem(storageKey, expiresAt.toString());
    return initialSeconds;
  });

  const startTimer = useCallback(
    (seconds = initialSeconds) => {
      const expiresAt = Date.now() + seconds * 1000;
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, expiresAt.toString());
      }
      setSecondsLeft(seconds);
    },
    [initialSeconds, storageKey]
  );

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const expiresAt = parseInt(stored, 10);
          const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
          setSecondsLeft(remaining);
          if (remaining <= 0) {
            localStorage.removeItem(storageKey);
            clearInterval(interval);
          }
          return;
        }
      }
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, storageKey]);

  const formattedTime = `${Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0")}:${(secondsLeft % 60).toString().padStart(2, "0")}`;

  return {
    secondsLeft,
    formattedTime,
    canResend: secondsLeft <= 0,
    startTimer,
  };
}
