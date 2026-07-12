export function GlowBackground({
  className = "",
  intensity = "md",
}: {
  className?: string;
  intensity?: "sm" | "md" | "lg";
}) {
  const a = intensity === "lg" ? 0.3 : intensity === "sm" ? 0.14 : 0.2;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 blur-[72px] ${className}`}
      style={{ background: `radial-gradient(closest-side, rgba(37,99,235,${a}), rgba(37,99,235,${a * 0.3}), transparent)` }}
    />
  );
}
