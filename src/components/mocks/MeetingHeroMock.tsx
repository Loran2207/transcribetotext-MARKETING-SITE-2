import { motion, useReducedMotion } from "framer-motion";
import { Check, Languages, ListChecks, Share2, Sparkles, Users } from "lucide-react";
import { hero } from "../../data/content";

/* The hero visual is the product, not a picture of the idea of the product: one
   window in which the call, the live transcript, the summary and the action
   items are all on screen at once, which is exactly what the brief asks for.
   An earlier version floated the summary and the actions over the window as
   separate cards; they covered the transcript underneath, and the transcript is
   the thing the page is selling. Depth now comes from a second surface peeking
   out behind, which covers nothing. */

const d = hero.demo;

const TINTS = ["bg-accent-soft text-accent", "bg-trust-soft text-trust", "bg-[#FFF4E5] text-[#B45309]"];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

export function MeetingHeroMock() {
  const reduce = useReducedMotion();
  return (
    <div className="w-full">
      <motion.div
        className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-5 -bottom-2.5 h-16 rounded-[20px] border border-border-soft bg-white/70 shadow-soft"
        />

        <div className="relative overflow-hidden rounded-[20px] border border-border bg-white shadow-lift">
          {/* On a phone the meeting name, the platform, the recording pill and
              the clock cannot share 320px, and the name was the thing that got
              cut. So the name takes its own line there and the rest sits under
              it; from sm up they go back on one row. */}
          <div className="flex flex-col gap-2 border-b border-border-soft px-4 py-3 sm:flex-row sm:items-center sm:gap-3">
            <span className="min-w-0 text-sm font-semibold text-ink sm:truncate">{d.meeting}</span>
            <div className="flex items-center gap-2 sm:contents">
              <span className="shrink-0 rounded-md bg-surface-soft px-2 py-0.5 text-[11px] font-medium text-ink-2">{d.platform}</span>
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
          </div>

          <div className="grid sm:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)]">
            {/* Left: the words as they are being said. */}
            <div className="border-b border-border-soft p-4 sm:border-b-0 sm:border-r">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[11px] font-semibold text-muted">{d.live}</span>
                <span className="flex items-end gap-[2px]" aria-hidden>
                  {[6, 11, 8, 13, 7, 10].map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-[2px] rounded-full bg-accent/45"
                      style={{ height: h }}
                      animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4] }}
                      transition={reduce ? undefined : { duration: 1.1, repeat: Infinity, delay: i * 0.12 }}
                    />
                  ))}
                </span>
              </div>
              <ul className="space-y-3">
                {d.lines.map((l, i) => (
                  <li key={l.at} className="flex gap-2.5">
                    <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${TINTS[i % TINTS.length]}`}>
                      {initials(l.who)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-muted">
                        {l.who} <span className="tabular-nums">{l.at}</span>
                      </p>
                      <p className="mt-0.5 text-[13px] leading-[1.5] text-ink-2">
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

            {/* Right: what the product hands back, while the call is still on. */}
            <div className="divide-y divide-border-soft">
              <div className="p-4">
                <p className="mb-2.5 flex items-center gap-1.5 text-[12px] font-semibold text-ink">
                  <Sparkles size={13} className="text-accent" />
                  {d.summaryTitle}
                </p>
                <ul className="space-y-1.5">
                  {d.summary.map((s) => (
                    <li key={s} className="flex gap-2 text-[12px] leading-[1.45] text-ink-2">
                      <span className="mt-[6px] size-1 shrink-0 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4">
                <p className="mb-2.5 flex items-center gap-1.5 text-[12px] font-semibold text-ink">
                  <ListChecks size={13} className="text-accent" />
                  {d.actionsTitle}
                </p>
                <ul className="space-y-2">
                  {d.actions.map((a) => (
                    <li key={a.text} className="flex items-start gap-2">
                      <span
                        className={`mt-[1px] flex size-[15px] shrink-0 items-center justify-center rounded-[5px] border ${
                          a.done ? "border-accent bg-accent text-white" : "border-border bg-white"
                        }`}
                      >
                        {a.done ? <Check size={10} strokeWidth={3} /> : null}
                      </span>
                      <span className="text-[12px] leading-[1.4] text-ink-2">
                        {a.text}
                        <span className="ml-1.5 rounded bg-surface-soft px-1.5 py-[1px] text-[10px] font-medium text-muted">{a.who}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

/* The chips name what the window is doing, so they belong to the hero rather
   than to the window. They live on their own full-width row: inside the mock's
   column the fifth one dropped to a line of its own, and one word alone on a
   line is a defect here as much as it is in a heading. */
export function HeroChips() {
  return (
    <ul className="flex flex-wrap gap-1.5 sm:gap-2">
      {hero.chips.map((c, i) => {
        const Ico = [Users, Sparkles, ListChecks, Languages, Share2][i % 5];
        return (
          <li
            key={c}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-medium text-ink-2 shadow-soft sm:px-3 sm:py-1.5 sm:text-xs"
          >
            <Ico size={12} className="text-accent" />
            {c}
          </li>
        );
      })}
    </ul>
  );
}
