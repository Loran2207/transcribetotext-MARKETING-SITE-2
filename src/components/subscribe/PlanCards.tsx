import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { subscribe } from "../../data/subscribe";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

// Mirrors the original app paywall cards: white cards, radio top-right, the popular
// card gets a full-width blue band, the selected card gets the accent border.
// Below lg the three cards become a snap carousel: the popular plan sits in the
// middle and its neighbours peek in from both sides, so it reads as a choice of
// three rather than a stack you have to scroll past.
export function PlanCards({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const popular = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sc = scroller.current, el = popular.current;
    if (!sc || !el || window.innerWidth >= 1024) return;
    // center the popular card without scrolling the page
    sc.scrollLeft = el.offsetLeft - (sc.clientWidth - el.clientWidth) / 2;
  }, []);

  return (
    <motion.div
      ref={scroller}
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mt-12 -mx-4 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-[calc(50%-140px)] pb-3 [scrollbar-width:none] sm:-mx-6 md:px-[calc(50%-180px)] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
    >
      {subscribe.plans.map((p, i) => {
        const on = i === selected;
        return (
          <motion.button
            key={p.key}
            ref={p.popular ? popular : undefined}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            onClick={() => onSelect(i)}
            className={`relative flex w-[280px] shrink-0 snap-center flex-col overflow-hidden rounded-tile border bg-white text-left transition-all md:w-[360px] lg:w-auto lg:shrink ${
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
            <div className="flex flex-1 flex-col p-5 pt-4 lg:p-7 lg:pt-4">
              <div className="flex items-start justify-between gap-2">
                <p className="whitespace-nowrap text-lg font-semibold tracking-tight text-ink lg:whitespace-normal lg:text-xl">{p.name}</p>
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${on ? "border-accent bg-accent text-white" : "border-border text-transparent"}`}><Check size={13} strokeWidth={3} /></span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <p className="text-sm text-muted"><span className="line-through">{p.was}</span> <span className="font-semibold text-ink">{p.now}</span></p>
                <span className="rounded-full bg-deal px-2 py-0.5 text-[10px] font-semibold text-white">50% off</span>
              </div>
              <div className="mt-5 flex items-end gap-1.5 border-t border-border/70 pt-5 lg:mt-6 lg:pt-6">
                <span className="mb-1.5 text-sm text-muted line-through">{p.perDayWas}</span>
                <span className="font-display text-[32px] font-semibold leading-none tracking-tight text-ink lg:text-[42px]">{p.perDay}</span>
                <span className="mb-1.5 whitespace-nowrap text-sm text-muted">per day</span>
              </div>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
