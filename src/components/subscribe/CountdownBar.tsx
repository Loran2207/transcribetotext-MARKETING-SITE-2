import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { subscribe } from "../../data/subscribe";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

const cta = "shrink-0 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20 transition-[filter] hover:brightness-[1.05]";

export function CountdownBar({ onGetPlan }: { onGetPlan: () => void }) {
  const [left, setLeft] = useState(subscribe.countdownSeconds);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="sticky top-0 z-40 border-b border-border bg-white/85 backdrop-blur-xl">
      {/* Phone and tablet: the original app header. Discount left, timer right, and
          Skip becomes a round close button. No Get my plan here: the Continue button
          is pinned to the bottom of the screen instead. */}
      <div className="flex items-center gap-3 px-4 py-2.5 lg:hidden">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium text-muted">{subscribe.discount.label}</p>
          <p className="truncate text-[15px] font-bold text-ink">{subscribe.discount.offer}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[11px] font-medium text-muted">Time left</p>
          <p className="font-mono text-[15px] font-bold tabular-nums text-accent">{fmt(left)}</p>
        </div>
        <Link
          to="/"
          aria-label={subscribe.skip}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-colors hover:text-accent-dark"
        >
          <X size={16} />
        </Link>
      </div>

      {/* Desktop: the discount block sits in the middle, the spacer column keeps it
          optically centered, Skip stays a text link away from Get my plan. */}
      <div className="mx-auto hidden max-w-[1100px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-2.5 lg:grid">
        <span aria-hidden="true" />
        <div className="flex items-center justify-center gap-5">
          <div className="text-center">
            <p className="text-[11px] font-medium text-muted">{subscribe.discount.label}</p>
            <p className="text-sm font-semibold text-ink">{subscribe.discount.offer}</p>
          </div>
          <span aria-hidden="true" className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-[11px] font-medium text-muted">Time left</p>
            <p className="font-mono text-sm font-semibold tabular-nums text-accent">{fmt(left)}</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <button onClick={onGetPlan} className={`${cta} px-5 py-2.5 text-sm`}>{subscribe.cta}</button>
          <span aria-hidden="true" className="h-6 w-px bg-border" />
          <Link to="/" className="shrink-0 pl-1 text-sm font-medium text-muted transition-colors hover:text-ink">{subscribe.skip}</Link>
        </div>
      </div>
    </div>
  );
}
