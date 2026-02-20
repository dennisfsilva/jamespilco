"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollDirection() {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [isAtTop, setIsAtTop] = useState(true);
  const prevScroll = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;
      setIsAtTop(currentScroll < 10);
      setDirection(currentScroll > prevScroll.current ? "down" : "up");
      prevScroll.current = currentScroll;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { direction, isAtTop };
}
