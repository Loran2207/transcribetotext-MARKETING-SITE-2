import { motion, useReducedMotion } from "framer-motion";
import { Check, Languages, ListChecks, Share2, Sparkles, Users } from "lucide-react";
import { hero } from "../../data/content";

/* The hero visual as the Amberscript reference in the brief composes it: one
   main window (the live transcript) with satellite cards overlapping its
   edges - the call tiles over the right edge, the AI Summary and the Action
   Items hanging off the bottom corners. Every piece is its own surface with
   its own shadow, so the collage reads as deliberate layers, not a pile.
   Faces generated on Kirill's Higgsfield account; captions are ours and match
   the transcript's speakers. */

const d = hero.demo;

const TINTS = ["bg-accent-soft text-accent", "bg-trust-soft text-trust", "bg-[#FFF4E5] text-[#B45309]"];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

function Tile({ p, live, className = "" }: { p: { name: string; photo: string }; live?: boolean; className?: string }) {
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-xl bg-ink/5 shadow-lift ring-1 ring-black/10 ${className}`}>
      <img src={p.photo} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-9"
        style={{ background: "linear-gradient(180deg, rgba(6,10,20,0) 0%, rgba(6,10,20,0.66) 100%)" }}
      />
      <span className="absolute bottom-1.5 left-2 max-w-[calc(100%-12px)] truncate text-[10px] font-semibold text-white drop-shadow-sm">
        {p.name}
      </span>
      {live ? (
        <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-black/35">
          <span className="size-1.5 rounded-full bg-trust" />
        </span>
      ) : null}
    </div>
  );
}

function Eq() {
  const reduce = useReducedMotion();
  return (
    <span className="flex items-end gap-[2px]" aria-hidden>
      {[6, 11, 8, 13, 7, 10].map((h, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-accent/50"
          style={{ height: h }}
          animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4] }}
          transition={reduce ? undefined : { duration: 1.1, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
    </span>
  );
}

function SummaryCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-4 shadow-lift ring-1 ring-black/[0.07] ${className}`}>
      <p className="mb-2.5 flex items-center gap-1.5 text-[12px] font-semibold text-ink">
        <Sparkles size={13} className="text-accent" />
        {d.summaryTitle}
      </p>
      <ul className="space-y-1.5">
        {d.summary.map((s) => (
          <li key={s} className="flex gap-2 text-[12px] leading-[1.5] text-ink-2">
            <span className="mt-[6px] size-1 shrink-0 rounded-full bg-accent" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActionsCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-4 shadow-lift ring-1 ring-black/[0.07] ${className}`}>
      <p className="mb-2.5 flex items-center gap-1.5 text-[12px] font-semibold text-ink">
        <ListChecks size={13} className="text-accent" />
        {d.actionsTitle}
      </p>
      <ul className="space-y-2">
        {d.actions.map((it) => (
          <li key={it.text} className="flex items-start gap-2">
            <span
              className={`mt-[1px] flex size-[15px] shrink-0 items-center justify-center rounded-full ${
                it.done ? "bg-accent text-white" : "border border-border bg-white"
              }`}
            >
              {it.done ? <Check size={9} strokeWidth={3.5} /> : null}
            </span>
            <span className="text-[12px] leading-[1.45] text-ink-2">{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const CHIP_ICON = [Users, Sparkles, ListChecks, Languages, Share2];

function Chips() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border-soft px-5 py-3">
      {hero.chips.map((c, i) => {
        const Ico = CHIP_ICON[i % CHIP_ICON.length];
        return (
          <span key={c} className="inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-medium text-ink-2">
            <Ico size={11} className="text-accent" />
            {c}
          </span>
        );
      })}
    </div>
  );
}

export function MeetingHeroMock() {
  const reduce = useReducedMotion();
  const [a, b] = d.participants;
  return (
    /* Room for the overhang: tiles past the right edge, cards past the bottom.
       The bottom reserve is sized so the hanging cards overlap the window by
       only ~30px - a bitten edge, not a covered footer. */
    <div className="relative lg:pb-32 lg:pr-14">
      <div className="relative overflow-hidden rounded-[22px] bg-white shadow-lift ring-1 ring-black/[0.07]">
        <div className="flex items-center gap-3 border-b border-border-soft px-4 py-3">
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="size-[11px] rounded-full bg-[#FF5F57]" />
            <span className="size-[11px] rounded-full bg-[#FEBC2E]" />
            <span className="size-[11px] rounded-full bg-[#28C840]" />
          </span>
          <span className="ml-1 min-w-0 truncate text-[13px] font-semibold text-ink">{d.meeting}</span>
          <span className="hidden shrink-0 rounded-md bg-surface-soft px-2 py-0.5 text-[11px] font-medium text-ink-2 sm:inline">
            {d.platform}
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-deal/10 px-2.5 py-1 text-[11px] font-semibold text-deal">
            <motion.span
              className="size-1.5 rounded-full bg-deal"
              animate={reduce ? undefined : { opacity: [1, 0.25, 1] }}
              transition={reduce ? undefined : { duration: 1.6, repeat: Infinity }}
            />
            {d.recording}
          </span>
          <span className="shrink-0 text-[11px] font-medium tabular-nums text-muted">{d.elapsed}</span>
        </div>

        {/* Below lg the collage flattens into a stack: tile strip, transcript,
            then the two result cards side by side, then the chips. */}
        <div className="grid grid-cols-2 gap-2 border-b border-border-soft p-3 lg:hidden">
          <Tile p={a} live className="shadow-none ring-black/5" />
          <Tile p={b} className="shadow-none ring-black/5" />
        </div>

        <div className="p-4 sm:p-5 lg:pb-6 lg:pr-32">
          <div className="mb-3.5 flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-[0.02em] text-muted">{d.live}</span>
            <Eq />
          </div>
          <ul className="space-y-3.5">
            {d.lines.map((l, i) => (
              <li key={l.at} className="flex gap-2.5">
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${TINTS[i % TINTS.length]}`}>
                  {initials(l.who)}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-muted">
                    {l.who} <span className="tabular-nums">{l.at}</span>
                  </p>
                  <p className="mt-0.5 text-[13px] leading-[1.55] text-ink-2">
                    {l.text}
                    {i === d.lines.length - 1 ? (
                      <span className="ml-0.5 inline-block h-[13px] w-[2px] translate-y-[2px] bg-accent align-middle" />
                    ) : null}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid border-t border-border-soft sm:grid-cols-2 sm:divide-x sm:divide-border-soft lg:hidden">
          <div className="border-b border-border-soft p-4 sm:border-b-0">
            <SummaryCard className="!p-0 !shadow-none !ring-0" />
          </div>
          <div className="p-4">
            <ActionsCard className="!p-0 !shadow-none !ring-0" />
          </div>
        </div>

        {/* The brief's chips, centered so the hanging cards below only ever
            cover the footer's empty corners. */}
        <Chips />
        {/* An empty band at the window's foot, lg only: the hanging cards bite
            into THIS, never into the chips above it. */}
        <div aria-hidden className="hidden h-10 lg:block" />
      </div>

      {/* The satellites, lg and up: the call over the right edge, the two
          results hanging off the bottom corners - each its own layer. */}
      <div className="absolute right-0 top-12 hidden w-[164px] flex-col gap-3 lg:flex">
        <Tile p={a} live />
        <Tile p={b} />
      </div>
      <ActionsCard className="absolute bottom-0 left-5 hidden w-[262px] lg:block" />
      <SummaryCard className="absolute bottom-1 right-16 hidden w-[240px] lg:block" />
    </div>
  );
}
