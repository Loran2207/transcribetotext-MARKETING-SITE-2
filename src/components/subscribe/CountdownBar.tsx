import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { subscribe } from "../../data/subscribe";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function CountdownBar({ onGetPlan }: { onGetPlan: () => void }) {
  const [left, setLeft] = useState(subscribe.countdownSeconds);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="sticky top-0 z-40 border-b border-border bg-white/85 backdrop-blur-xl">
      {/* Phone: two stacked rows (discount + timer, then the actions).
          md and up: the discount block sits in the middle; the spacer column keeps it optically centered. */}
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-2 px-4 py-2.5 sm:px-6 md:grid-cols-[1fr_auto_1fr] md:gap-4">
        <span aria-hidden="true" className="hidden md:block" />
        <div className="flex min-w-0 items-center justify-center gap-4 sm:gap-5">
          <div className="min-w-0 text-center">
            <p className="text-[11px] font-medium text-muted">{subscribe.discount.label}</p>
            <p className="text-sm font-semibold text-ink">{subscribe.discount.offer}</p>
          </div>
          <span aria-hidden="true" className="h-8 w-px shrink-0 bg-border" />
          <div className="text-center">
            <p className="text-[11px] font-medium text-muted">Time left</p>
            <p className="font-mono text-sm font-semibold tabular-nums text-accent">{fmt(left)}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 md:justify-end">
          <button onClick={onGetPlan} className="min-h-11 shrink-0 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-5 py-2.5 text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20 transition-[filter] hover:brightness-[1.05] md:min-h-0">
            {subscribe.cta}
          </button>
          <span aria-hidden="true" className="h-6 w-px shrink-0 bg-border" />
          <Link to="/" className="shrink-0 py-3 pl-1 text-sm font-medium text-muted transition-colors hover:text-ink md:py-0">{subscribe.skip}</Link>
        </div>
      </div>
    </div>
  );
}
