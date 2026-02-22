"use client";

import { useEffect, useRef } from "react";

/**
 * Warm golden glow that follows the cursor — like holding a candle in a dark gallery.
 * Fixed positioning + document-level listeners = works across the entire site.
 * Throttled to rAF. Skips touch devices.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;
    let hasPending = false;

    const updatePosition = () => {
      rafId = 0;
      if (!hasPending) return;
      el.style.setProperty("--glow-x", `${pendingX}px`);
      el.style.setProperty("--glow-y", `${pendingY}px`);
      hasPending = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      hasPending = true;
      el.style.opacity = "1";
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      el.style.opacity = "0";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[2] opacity-0 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(350px circle at var(--glow-x, 50%) var(--glow-y, 50%), oklch(0.55 0.13 80 / 0.2), oklch(0.35 0.08 75 / 0.08) 50%, transparent 100%)",
      }}
    />
  );
}
