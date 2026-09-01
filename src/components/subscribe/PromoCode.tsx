import { useEffect, useState } from "react";
import { Tag, Check } from "lucide-react";
import { subscribe } from "../../data/subscribe";

const pad = (n: number) => String(n).padStart(2, "0");

/* The offer band, on the brief's shape: the gift leads, the promise sits beside
   it, and the far end carries what the visitor acts on - here BOTH the promo
   code and the clock, where the brief has only the clock.

   The clock counts the same seconds as the bar pinned to the top of the page.
   Two clocks showing DIFFERENT times is what made this one read as a mistake
   earlier; the fix is one countdown shown twice, not a countdown deleted.

   Widths: on a phone the band is two rows - gift, promise and discount on top,
   code and clock sharing the second. From sm up it is the brief's single row:
   gift, promise, code, discount, clock. */
function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="rounded-lg bg-white px-1.5 py-0.5 font-mono text-[15px] font-bold leading-tight tabular-nums text-accent shadow-soft sm:px-2 sm:text-[16px]">
        {value}
      </p>
      <p className="mt-0.5 text-[8px] font-semibold tracking-[0.06em] text-muted">{label}</p>
    </div>
  );
}

export function PromoCode() {
  const [code, setCode] = useState(subscribe.promo.code);
  const [applied, setApplied] = useState(true);
  const [left, setLeft] = useState(subscribe.countdownSeconds);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = Math.floor(left / 60);
  const ss = left % 60;

  return (
    <div className="mx-auto mt-5 w-full max-w-3xl">
      <div className={`rounded-2xl p-3 transition-colors sm:p-3.5 ${applied ? "bg-accent-soft" : "bg-surface-soft"}`}>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2.5 sm:gap-x-3">
          <img src="/brand/subscribe/gift.png" alt="" aria-hidden className="size-9 shrink-0 sm:size-11" />

          <div className="min-w-0 basis-[calc(100%-8.5rem)] grow sm:order-2 sm:basis-auto">
            <p className="text-[12.5px] font-bold leading-tight text-ink sm:text-[14.5px]">{subscribe.promo.label}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-ink-2 sm:text-[12px]">{subscribe.promo.sub}</p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-white sm:order-4">
            <Tag size={12} /> {subscribe.promo.discount}
          </span>

          <div className="flex min-w-0 basis-[58%] grow items-center gap-2 rounded-xl bg-white px-3 py-1.5 shadow-soft sm:order-3 sm:w-auto sm:min-w-[168px] sm:grow-0 sm:basis-auto sm:py-2">
            {applied ? (
              <Check size={15} className="shrink-0 text-accent" strokeWidth={3} />
            ) : (
              <Tag size={15} className="shrink-0 text-muted" />
            )}
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setApplied(false);
              }}
              placeholder="Enter promo code"
              aria-label="Promo code"
              className="min-w-0 flex-1 bg-transparent text-[13.5px] font-bold tracking-wide text-ink outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-muted sm:text-[14px]"
            />
            {!applied ? (
              <button
                onClick={() => setApplied(true)}
                className="shrink-0 rounded-lg bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-3 py-1 text-[12px] font-semibold text-white"
              >
                Apply
              </button>
            ) : null}
          </div>

          {/* The brief's own far-end element: "Offer ends in" over the units. */}
          <div className="flex shrink-0 items-center gap-2 sm:order-5">
            <p className="hidden text-[10px] font-semibold leading-tight text-ink-2 lg:block">
              Offer
              <br />
              ends in
            </p>
            <div className="flex items-start gap-1">
              <Unit value={pad(mm)} label="MIN" />
              <span className="pt-1 font-mono text-[15px] font-bold text-accent">:</span>
              <Unit value={pad(ss)} label="SEC" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
