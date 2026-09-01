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

/* The reference's card grammar, centered throughout: the side tags are quiet
   pills INSIDE the card at the top, only MOST POPULAR rides the border, and
   every line below - name, prices, saving, note, radio - is centered. Our
   voices stay: brand blue for the recommended plan, the house rose - loud,
   filled, "наш алый" - for the value one. */
const TAG_IN: Record<string, string> = {
  neutral: "bg-surface-soft text-ink-2",
  gold: "bg-[linear-gradient(180deg,#FB7185,#F43F5E)] text-white shadow-[0_8px_20px_rgba(244,63,94,.30)]",
};
const TAG_TOP =
  "border-transparent bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-white shadow-blue";
const SAVE: Record<string, string> = {
  accent: "bg-accent-soft text-accent",
  gold: "bg-deal/10 text-deal",
};
const NOTE: Record<string, string> = {
  neutral: "bg-surface-soft text-ink-2",
  accent: "bg-accent-soft/60 text-accent-dark",
  gold: "bg-deal/[0.07] text-ink-2",
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
            className={`relative flex w-[280px] shrink-0 snap-center flex-col rounded-tile border bg-white text-center transition-all md:w-[360px] lg:w-auto lg:shrink ${
              on ? "border-accent shadow-card ring-2 ring-accent/20" : "border-border shadow-soft hover:border-accent/40"
            }`}
          >
            {/* Only the recommended plan's tag rides the border, as in the
                reference; the side tags are pills inside the card. */}
            {p.tone === "accent" ? (
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border px-3.5 py-1 text-[10px] font-bold tracking-[0.07em] ${TAG_TOP}`}
              >
                {p.tag}
              </span>
            ) : null}

            <div className="flex flex-1 flex-col items-center p-4 pt-5 text-center lg:p-5 lg:pt-6">
              {/* One tag zone on every card so the three names share a line:
                  the side cards show their pill here, the middle reserves it. */}
              <div className="flex h-6 items-center">
                {p.tone !== "accent" ? (
                  <span className={`inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-1 text-[10px] font-bold tracking-[0.07em] ${TAG_IN[p.tone]}`}>
                    {p.tag}
                  </span>
                ) : null}
              </div>

              <p className="mt-1.5 text-[19px] font-bold tracking-tight text-ink sm:text-[21px]">{p.name}</p>

              <div className="mt-1.5 flex items-center justify-center gap-2 text-[14.5px]">
                <span className="text-muted line-through">{p.was}</span>
                <ChevronRight size={15} className="text-muted" strokeWidth={2.5} />
                <span className="font-semibold text-ink">{p.now}</span>
              </div>

              <div className="mt-3 w-full border-t border-border/70 pt-3">
                <p className="text-[12px] text-muted line-through">{p.perDayWas}</p>
                <p className="mt-0.5 flex items-end justify-center gap-1.5">
                  <span className="font-display text-[34px] font-bold leading-none tracking-tight text-ink lg:text-[38px]">{p.perDay}</span>
                  <span className="mb-1 whitespace-nowrap text-sm text-muted">per day</span>
                </p>
              </div>

              {/* Reserved on every card, so the three stay aligned whether or not
                  the plan carries a saving. The badge speaks the card's voice:
                  blue on the recommended plan, rose on the value one. */}
              <div className="mt-2 flex h-[24px] items-center">
                {p.save ? (
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-[12px] font-bold ${SAVE[p.tone] ?? "bg-trust-soft text-trust"}`}>
                    {p.save}
                  </span>
                ) : null}
              </div>

              {/* The reference draws the note as a soft tinted pill in the
                  card's own tone; two lines stay reserved so the three choice
                  controls keep one baseline. */}
              <p className={`mt-2.5 flex min-h-[38px] w-full items-center justify-center rounded-xl px-3 py-1.5 text-center text-[12px] font-medium leading-snug ${NOTE[p.tone]}`}>
                {p.note}
              </p>

              <span
                aria-hidden
                className={`mx-auto mt-3.5 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                  on ? "border-accent bg-accent text-white" : "border-border text-transparent"
                }`}
              >
                <Check size={13} strokeWidth={3} />
              </span>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
