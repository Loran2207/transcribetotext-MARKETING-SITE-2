// Reflect-style shimmering heart glow behind the Reviews heading, in our blue.
// Two heart layers cross-fade for an iridescent shimmer.
const HEART = "M12 21S2.5 14.8 2.5 8.6C2.5 5.3 5 3 8 3c1.9 0 3.2 1.1 4 2.4C12.8 4.1 14.1 3 16 3c3 0 5.5 2.3 5.5 5.6C21.5 14.8 12 21 12 21z";

export function HeartGlow({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <svg width="580" height="540" viewBox="0 0 24 22" fill="none" style={{ filter: "blur(38px)" }}>
        <defs>
          <radialGradient id="hgA" cx="50%" cy="36%" r="62%">
            <stop offset="0%" stopColor="#9CC4FF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#2563EB" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hgB" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#4C9BFF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#1D4ED8" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d={HEART} fill="url(#hgA)" style={{ animation: "heartShimmer 5.5s ease-in-out infinite" }} />
        <path d={HEART} fill="url(#hgB)" style={{ animation: "heartShimmer 5.5s ease-in-out infinite 2.75s" }} />
      </svg>
    </div>
  );
}
