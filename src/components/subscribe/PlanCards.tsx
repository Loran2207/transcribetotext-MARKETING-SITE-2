import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { subscribe } from "../../data/subscribe";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

/* Paywall v2, hypothesis 8: a stronger visual hierarchy, so a reader can answer
   in two or three seconds which plan is recommended, where the saving is, what
   it costs a day, and which card to press.
   Reading order inside a card: what it is for (the tag), which plan, what it
   costs now against what it cost, the price per day as the big number, the
   saving, and one line naming who the plan suits. The choice control sits at the
   foot of the card, under everything it is a choice about.
   Below lg the three cards stay the snap carousel the build already had, with
   the popular plan centred and its neighbours peeking in. */

const TAG: Record<string, string> = {
  neutral: "border-border bg-white text-ink-2",
  accent: "border-transparent bg-accent text-white",
  gold: "border-transparent bg-[#FEF3C7] text-[#92400E]",
};

export function PlanCards({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const popular = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sc = scroller.current, el = popular.current;
    if (!sc || !el || window.innerWidth >= 1024) return;
    sc.scrollLeft = el.offsetLeft - (sc.clientWidth - el.clientWidth) / 2;
  }, []);

  return (
    <motion.div
      ref={scroller}
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mt-10 -mx-4 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-[calc(50%-140px)] pb-3 pt-3 [scrollbar-width:none] sm:-mx-6 md:px-[calc(50%-180px)] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
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
            aria-pressed={on}
            className={`relative flex w-[280px] shrink-0 snap-center flex-col rounded-tile border bg-white text-left transition-all md:w-[360px] lg:w-auto lg:shrink ${
              on ? "border-accent shadow-card ring-2 ring-accent/20" : "border-border shadow-soft hover:border-accent/40"
            }`}
          >
            {/* The tag sits on the card's own top edge, so it names the card
                rather than floating above a stack of three identical boxes. */}
            <span
              className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.07em] shadow-soft ${TAG[p.tone]}`}
            >
              {p.tag}
            </span>

            <div className="flex flex-1 flex-col p-5 pt-7 lg:p-6 lg:pt-8">
              <p className="text-xl font-bold tracking-tight text-ink sm:text-[22px]">{p.name}</p>

              <div className="mt-2 flex items-center gap-2 text-[15px]">
                <span className="text-muted line-through">{p.was}</span>
                <ChevronRight size={15} className="text-muted" strokeWidth={2.5} />
                <span className="font-semibold text-ink">{p.now}</span>
              </div>

              <div className="mt-4 border-t border-border/70 pt-4">
                <p className="text-[13px] text-muted line-through">{p.perDayWas}</p>
                <p className="mt-0.5 flex items-end gap-1.5">
                  <span className="font-display text-[36px] font-bold leading-none tracking-tight text-ink lg:text-[42px]">{p.perDay}</span>
                  <span className="mb-1 whitespace-nowrap text-sm text-muted">per day</span>
                </p>
              </div>

              {/* Reserved on every card, so the three stay aligned whether or not
                  the plan carries a saving. */}
              <div className="mt-3 h-[26px]">
                {p.save ? (
                  <span className="inline-flex items-center rounded-md bg-trust-soft px-2 py-1 text-[12px] font-bold text-trust">
                    {p.save}
                  </span>
                ) : null}
              </div>

              {/* Two lines are reserved on every card: one of the three notes
                  wraps, and without the reserve its card grew and its choice
                  control stopped lining up with the other two. */}
              <p className="mt-3 flex min-h-[52px] items-center justify-center rounded-xl bg-surface-soft px-3 py-2 text-center text-[12px] font-medium leading-snug text-ink-2">
                {p.note}
              </p>

              <span
                aria-hidden
                className={`mx-auto mt-5 grid size-7 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                  on ? "border-accent bg-accent text-white" : "border-border text-transparent"
                }`}
              >
                <Check size={14} strokeWidth={3} />
              </span>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
