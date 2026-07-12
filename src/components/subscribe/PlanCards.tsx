import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { subscribe } from "../../data/subscribe";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

// Cards stay vertical and in a row on desktop. On narrow screens they become a
// swipe carousel (scroll-snap, one card per view) - built now, hidden by the desktop lock.
export function PlanCards({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  return (
    <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-12 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-1 pb-3 pt-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {subscribe.plans.map((p, i) => {
        const on = i === selected;
        return (
          <motion.button
            key={p.key}
            variants={fadeUp}
            whileHover={{ y: -5 }}
            onClick={() => onSelect(i)}
            className={`relative flex min-w-full shrink-0 snap-center flex-col rounded-tile border p-7 text-left transition-all sm:min-w-0 ${on ? "border-accent bg-white shadow-card ring-2 ring-accent/25" : "border-border bg-surface-soft hover:border-accent/40 hover:bg-white hover:shadow-soft"} ${p.popular ? "bg-gradient-to-b from-accent-soft/50 to-white" : ""}`}
          >
            {p.popular && (
              <>
                <span aria-hidden="true" className="pointer-events-none absolute -inset-2 -z-10 rounded-[30px] opacity-70 blur-2xl" style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.30), transparent)" }} />
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-3.5 py-1 text-[11px] font-semibold text-white shadow-blue">Most popular</span>
              </>
            )}
            <div className="flex items-start justify-between">
              <p className="text-xl font-semibold tracking-tight text-ink">{p.name}</p>
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${on ? "border-accent bg-accent text-white" : "border-border text-transparent"}`}><Check size={13} strokeWidth={3} /></span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <p className="text-sm text-muted"><span className="line-through">{p.was}</span> <span className="font-semibold text-ink">{p.now}</span></p>
              <span className="rounded-full bg-deal px-2 py-0.5 text-[10px] font-semibold text-white">50% off</span>
            </div>
            <div className="mt-6 flex items-end gap-1.5 border-t border-border/70 pt-6">
              <span className="mb-1.5 text-sm text-muted line-through">{p.perDayWas}</span>
              <span className="font-display text-[42px] font-semibold leading-none tracking-tight text-ink">{p.perDay}</span>
              <span className="mb-1.5 text-sm text-muted">per day</span>
            </div>
            <p className="mt-3 text-xs text-muted">Billed as {p.now}, cancel anytime</p>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
