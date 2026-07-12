import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block font-mono text-xs tracking-[0.06em] text-muted ${className}`}
    >
      {children}
    </span>
  );
}
