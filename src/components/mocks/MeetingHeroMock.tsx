import { motion, useReducedMotion } from "framer-motion";
import { Check, Languages, ListChecks, Share2, Sparkles, Users } from "lucide-react";
import { hero } from "../../data/content";

/* The hero visual is the product, drawn at V1's dashboard grade: one wide app
   window under the centered headline, carrying everything the brief names at
   once - the call (real participant tiles), the live transcript, the AI
   summary and the action items. The tiles are cropped from the meeting scene
   Kirill generated for V2; our captions cover the baked-in ones, so the names
   on the picture and the names in the transcript are the same names. */

const d = hero.demo;

const TINTS = ["bg-accent-soft text-accent", "bg-trust-soft text-trust", "bg-[#FFF4E5] text-[#B45309]"];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

function Tile({ p, live }: { p: { name: string; photo: string }; live?: boolean }) {
  /* The photos are trimmed above their baked-in captions, so the only name on
     a tile is the one we draw - and it matches the transcript. */
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[10px] bg-ink/5">
      <img src={p.photo} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-8"
        style={{ background: "linear-gradient(180deg, rgba(6,10,20,0) 0%, rgba(6,10,20,0.72) 100%)" }}
      />
      <span className="absolute bottom-1.5 left-2 text-[10px] font-semibold text-white drop-shadow-sm">{p.name}</span>
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

const CHIP_ICON = [Users, Sparkles, ListChecks, Languages, Share2];

export function MeetingHeroMock() {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden rounded-[22px] bg-white shadow-lift ring-1 ring-black/[0.07]">
      {/* Window chrome: the traffic lights say "this is the app", the header
          names the meeting, and the recording pill says it is happening now. */}
      <div className="flex items-center gap-3 border-b border-border-soft px-4 py-3 sm:px-5">
        <span className="hidden items-center gap-1.5 sm:flex" aria-hidden>
          <span className="size-[11px] rounded-full bg-[#FF5F57]" />
          <span className="size-[11px] rounded-full bg-[#FEBC2E]" />
          <span className="size-[11px] rounded-full bg-[#28C840]" />
        </span>
        <span className="min-w-0 truncate text-[13px] font-semibold text-ink sm:ml-2">{d.meeting}</span>
        <span className="hidden shrink-0 rounded-md bg-surface-soft px-2 py-0.5 text-[11px] font-medium text-ink-2 sm:inline">{d.platform}</span>
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

      {/* The call itself: a strip of real faces across the top, the way the
          call apps draw it, which also keeps the columns below the same
          height - a tall side rail left the results column half empty. */}
      <div className="grid grid-cols-4 gap-2 border-b border-border-soft p-3 sm:gap-2.5 sm:px-4">
        {d.participants.map((p, i) => (
          <Tile key={p.name} p={p} live={i === 0} />
        ))}
      </div>

      <div className="grid md:grid-cols-[minmax(0,1.16fr)_minmax(0,1fr)]">
        {/* The words, as they are being said. */}
        <div className="border-b border-border-soft p-4 sm:p-5 md:border-b-0 md:border-r">
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

        {/* What the product hands back, while the call is still running. */}
        <div className="divide-y divide-border-soft">
          <div className="p-4 sm:p-5">
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
          <div className="p-4 sm:p-5">
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
                  <span className="text-[12px] leading-[1.45] text-ink-2">
                    {a.text}
                    <span className="ml-1.5 rounded bg-surface-soft px-1.5 py-[1px] text-[10px] font-medium text-muted">{a.who}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The brief's chips live INSIDE the visual, as its own footer strip -
          words over a hairline, not a gray plate. */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border-soft px-4 py-3 sm:px-5">
        {hero.chips.map((c, i) => {
          const Ico = CHIP_ICON[i % CHIP_ICON.length];
          return (
            <span key={c} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-2">
              <Ico size={12} className="text-accent" />
              {c}
            </span>
          );
        })}
      </div>
    </div>
  );
}
