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
      <div className="mx-auto flex max-w-[1100px] items-center gap-4 px-4 py-2.5 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium text-muted">{subscribe.discount.label}</p>
          <p className="truncate text-sm font-semibold text-ink">{subscribe.discount.offer}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[11px] font-medium text-muted">Time left</p>
          <p className="font-mono text-sm font-semibold tabular-nums text-accent">{fmt(left)}</p>
        </div>
        <button onClick={onGetPlan} className="shrink-0 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-5 py-2.5 text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20 transition-[filter] hover:brightness-[1.05]">
          {subscribe.cta}
        </button>
        <Link to="/" className="shrink-0 text-sm font-medium text-accent transition-colors hover:text-accent-dark">{subscribe.skip}</Link>
      </div>
    </div>
  );
}
