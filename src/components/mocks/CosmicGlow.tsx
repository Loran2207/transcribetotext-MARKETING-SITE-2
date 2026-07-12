// Reflect-inspired ambient glows for dark sections, tuned to our brand blue.
// "beam": a vertical light shaft (echoes Reflect's spire), pairs with the top cutout.
// "orbit": faint concentric radar rings with a glowing core (Reflect's radar motif).
export function CosmicGlow({ variant = "beam", className = "" }: { variant?: "beam" | "orbit"; className?: string }) {
  if (variant === "orbit") {
    return (
      <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${className}`}>
        <div
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(76,155,255,0.32), transparent 70%)", filter: "blur(34px)" }}
        />
        <svg width="820" height="820" viewBox="0 0 820 820" fill="none" className="opacity-70">
          {[90, 180, 270, 360].map((r) => (
            <circle key={r} cx="410" cy="410" r={r} stroke="rgba(124,167,255,0.12)" strokeWidth="1" />
          ))}
          <circle cx="410" cy="410" r="4.5" fill="#8FB6FF" />
        </svg>
      </div>
    );
  }
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 ${className}`}>
      <div style={{ width: 400, height: 580, background: "radial-gradient(46% 55% at 50% 0%, rgba(76,155,255,0.26), transparent 70%)", filter: "blur(16px)" }} />
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{ width: 2.5, height: 460, background: "linear-gradient(to bottom, rgba(190,215,255,0.9), rgba(76,155,255,0.32) 26%, transparent 82%)", filter: "blur(1px)" }}
      />
    </div>
  );
}
