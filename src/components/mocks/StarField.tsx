// Reflect-style constellation backdrop for dark sections: scattered faint stars,
// a few brighter/twinkling ones with a soft glow. Deterministic (seeded) so it
// renders identically every time.
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rnd = mulberry32(20260709);
const STARS = Array.from({ length: 64 }, () => {
  const bright = rnd() > 0.8;
  return {
    x: rnd() * 100,
    y: rnd() * 100,
    size: bright ? 1.5 + rnd() * 1.4 : 0.6 + rnd() * 1,
    opacity: bright ? 0.45 + rnd() * 0.4 : 0.1 + rnd() * 0.28,
    twinkle: rnd() > 0.5,
    dur: 2.4 + rnd() * 3.4,
    delay: rnd() * 4,
    violet: rnd() > 0.72,
  };
});

export function StarField({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.violet ? "#9FAcFF" : "#CFE0FF",
            opacity: s.opacity,
            boxShadow: s.size > 1.7 ? `0 0 ${Math.round(s.size * 2)}px rgba(120,160,255,0.55)` : undefined,
            animation: s.twinkle ? `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` : undefined,
          }}
        />
      ))}
    </div>
  );
}
