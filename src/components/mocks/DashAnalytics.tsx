// Ported from the real app right-panel Pro variant (Figma node 3575-5668).
const SOURCES: { label: string; value: number; pct: number }[] = [
  { label: "Zoom", value: 138, pct: 100 },
  { label: "Google Meet", value: 92, pct: 67 },
  { label: "Microphone", value: 64, pct: 46 },
  { label: "File upload", value: 48, pct: 35 },
];

export function AnalyticsCard() {
  return (
    <div className="rounded-[14px] border border-border bg-white p-[18px]">
      <p className="text-ink" style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "-0.2px" }}>Analytics</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="font-display text-[26px] font-semibold leading-none text-ink">128.4</p>
          <p className="mt-1 text-[11px] text-muted">Hours transcribed</p>
        </div>
        <div>
          <p className="font-display text-[26px] font-semibold leading-none text-ink">342</p>
          <p className="mt-1 text-[11px] text-muted">Files transcribed</p>
        </div>
      </div>
      <p className="mt-5 text-[11px] font-semibold text-muted" style={{ letterSpacing: "0.4px" }}>By source</p>
      <div className="mt-2.5 flex flex-col gap-2.5">
        {SOURCES.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="w-[76px] shrink-0 text-[12px] text-ink-2">{s.label}</span>
            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#EEF1F7]">
              <span className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: s.pct + "%" }} />
            </span>
            <span className="w-6 shrink-0 text-right font-mono text-[11px] text-muted">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
