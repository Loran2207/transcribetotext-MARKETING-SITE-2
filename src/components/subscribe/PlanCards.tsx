import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { subscribe } from "../../data/subscribe";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

// Mirrors the original app paywall cards (app.transcribetotext.ai/subscribe):
// white cards, radio top-right, popular card gets a full-width blue header band,
// selected card gets the accent border. Restyled with our tokens.
export function PlanCards({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  return (
    <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-12 grid grid-cols-3 items-stretch gap-5">
      {subscribe.plans.map((p, i) => {
        const on = i === selected;
        return (
          <motion.button
            key={p.key}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            onClick={() => onSelect(i)}
            className={`relative flex flex-col overflow-hidden rounded-tile border bg-white text-left transition-all ${
              on ? "border-accent shadow-card ring-2 ring-accent/20" : "border-border shadow-soft hover:border-accent/40"
            }`}
          >
            {p.popular ? (
              <span className="w-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] py-1.5 text-center text-xs font-semibold text-white">
                Most popular
              </span>
            ) : (
              <span aria-hidden="true" className="block w-full py-1.5 text-xs">&nbsp;</span>
            )}
            <div className="flex flex-1 flex-col p-7 pt-4">
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
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
