"use client";

import { cn } from "@/lib/utils";

export function Spotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-visible", className)}>
      <div
        className="absolute z-0 rounded-full opacity-40"
        style={{
          inset: "-15%",
          background:
            "radial-gradient(circle, oklch(0.18 0.03 70) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
