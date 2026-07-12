import { useEffect, useState } from "react";
import { Tag, Check } from "lucide-react";
import { subscribe } from "../../data/subscribe";

const pad = (n: number) => String(n).padStart(2, "0");

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
    <div className="mx-auto mt-8 max-w-md">
      {applied && (
        <p className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-deal sm:justify-start">
          <Tag size={15} /> {subscribe.promo.label}!
        </p>
      )}
      <div className={`flex items-center gap-2 rounded-2xl border p-2 transition-colors ${applied ? "border-deal/40 bg-deal-soft" : "border-border bg-surface-soft"}`}>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-soft">
          {applied ? <Check size={16} className="shrink-0 text-deal" /> : <Tag size={16} className="shrink-0 text-muted" />}
          <input
            value={code}
            onChange={(e) => { setCode(e.target.value); setApplied(false); }}
            placeholder="Enter promo code"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink outline-none placeholder:font-normal placeholder:text-muted"
          />
        </div>
        {applied ? (
          <div className="flex shrink-0 items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 shadow-soft">
            <div className="text-center"><p className="font-mono text-lg font-bold leading-none tabular-nums text-deal">{pad(mm)}</p><p className="mt-0.5 text-[9px] font-medium text-muted">min</p></div>
            <span className="pb-2 font-mono text-base font-bold text-deal">:</span>
            <div className="text-center"><p className="font-mono text-lg font-bold leading-none tabular-nums text-deal">{pad(ss)}</p><p className="mt-0.5 text-[9px] font-medium text-muted">sec</p></div>
          </div>
        ) : (
          <button onClick={() => setApplied(true)} className="shrink-0 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-5 py-2.5 text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20 transition-[filter] hover:brightness-[1.05]">Apply</button>
        )}
      </div>
    </div>
  );
}
