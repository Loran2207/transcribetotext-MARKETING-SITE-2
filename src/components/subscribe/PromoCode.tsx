import { useEffect, useState } from "react";
import { Tag, Check, Clock } from "lucide-react";
import { subscribe } from "../../data/subscribe";

const pad = (n: number) => String(n).padStart(2, "0");

// Loud on purpose: the promo is the reason the paywall converts, so it gets an
// accent card, a deal badge and a live countdown instead of a quiet input row.
// On phones the code and the timer sit on one line, and the timer collapses to a
// single inline clock so the block stays two tidy rows.
export function PromoCode() {
  const [code, setCode] = useState(subscribe.promo.code);
  const [applied, setApplied] = useState(true);
  const [left, setLeft] = useState(4 * 60 + 56);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = Math.floor(left / 60), ss = left % 60;
  return (
    <div className="mx-auto mt-8 w-full max-w-xl">
      <div
        className={`rounded-tile border-2 p-3 transition-colors sm:p-4 ${
          applied ? "border-accent/40 bg-accent-soft" : "border-border bg-surface-soft"
        }`}
        style={applied ? { boxShadow: "0 10px 30px rgba(37,99,235,.14)" } : undefined}
      >
        {applied && (
          <div className="mb-2.5 flex flex-wrap items-center gap-2 px-1 sm:mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
              <Tag size={13} /> {subscribe.promo.discount}
            </span>
            <p className="text-sm font-semibold text-accent-dark sm:text-[15px]">{subscribe.promo.label}</p>
          </div>
        )}
        <div className="flex items-center gap-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl bg-white px-3.5 py-3 shadow-soft sm:px-4">
            {applied ? <Check size={18} className="shrink-0 text-accent" strokeWidth={3} /> : <Tag size={18} className="shrink-0 text-muted" />}
            <input
              value={code}
              onChange={(e) => { setCode(e.target.value); setApplied(false); }}
              placeholder="Enter promo code"
              className="min-w-0 flex-1 bg-transparent text-base font-bold tracking-wide text-ink outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-muted"
            />
          </div>
          {applied ? (
            <>
              {/* phone: one compact clock */}
              <span className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-white px-3 py-3 font-mono text-base font-bold tabular-nums text-accent shadow-soft sm:hidden">
                <Clock size={15} />
                {pad(mm)}:{pad(ss)}
              </span>
              {/* tablet and up: the min / sec blocks */}
              <div className="hidden shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-soft sm:flex">
                <div className="text-center">
                  <p className="font-mono text-xl font-bold leading-none tabular-nums text-accent">{pad(mm)}</p>
                  <p className="mt-1 text-[9px] font-medium text-muted">min</p>
                </div>
                <span className="pb-3 font-mono text-lg font-bold text-accent">:</span>
                <div className="text-center">
                  <p className="font-mono text-xl font-bold leading-none tabular-nums text-accent">{pad(ss)}</p>
                  <p className="mt-1 text-[9px] font-medium text-muted">sec</p>
                </div>
              </div>
            </>
          ) : (
            <button onClick={() => setApplied(true)} className="shrink-0 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-5 py-3 text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20 transition-[filter] hover:brightness-[1.05] sm:px-6">Apply</button>
          )}
        </div>
      </div>
    </div>
  );
}
