import { useState } from "react";
import { Tag, Check } from "lucide-react";
import { subscribe } from "../../data/subscribe";

/* The offer band, rebuilt to the reference's shape (Kirill, round 12): ONE row -
   the gift leads, the promise sits beside it, and the thing that expires sits at
   the far end. In the reference that far end is a countdown; ours is the promo
   code, on his instruction.

   What went away and why:
   - The two-storey coupon (band, perforation, code row) cost ~230px of height
     for the same three facts. The perforation existed to separate two storeys;
     with one storey it separates nothing.
   - The second countdown. The same clock already runs in the bar pinned to the
     top of the page, so this one was the same fact told twice.

   On a phone the row wraps in reading order: gift and discount pill on top, the
   promise across the full width, the code field last. The pill never shares a
   line with the copy, which is what squeezed both lines into two each. */
export function PromoCode() {
  const [code, setCode] = useState(subscribe.promo.code);
  const [applied, setApplied] = useState(true);

  return (
    <div className="mx-auto mt-6 w-full max-w-2xl">
      <div className={`rounded-2xl p-3 transition-colors sm:p-3.5 ${applied ? "bg-accent-soft" : "bg-surface-soft"}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
          <img src="/brand/subscribe/gift.png" alt="" aria-hidden className="size-10 shrink-0 sm:size-12" />

          {/* DOM order is the PHONE order - gift and pill share the top line,
              the promise takes the next full-width line, the field comes last.
              From sm up `order` puts them back into the reference's single row:
              gift, promise, field, pill. */}
          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-white sm:order-4">
            <Tag size={12} /> {subscribe.promo.discount}
          </span>

          <div className="w-full min-w-0 sm:order-2 sm:w-auto sm:flex-1">
            <p className="text-[13.5px] font-bold leading-tight text-ink sm:text-[15px]">{subscribe.promo.label}</p>
            <p className="mt-0.5 text-[12px] leading-snug text-ink-2 sm:text-[12.5px]">{subscribe.promo.sub}</p>
          </div>

          <div className="flex w-full min-w-0 items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-soft sm:order-3 sm:w-auto sm:min-w-[190px]">
            {applied ? (
              <Check size={16} className="shrink-0 text-accent" strokeWidth={3} />
            ) : (
              <Tag size={16} className="shrink-0 text-muted" />
            )}
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setApplied(false);
              }}
              placeholder="Enter promo code"
              aria-label="Promo code"
              className="min-w-0 flex-1 bg-transparent text-[14px] font-bold tracking-wide text-ink outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-muted"
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
        </div>
      </div>
    </div>
  );
}
