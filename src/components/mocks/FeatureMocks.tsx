import { motion, useReducedMotion } from "framer-motion";
import { Check, FileVideo, ListChecks, Search, Sparkles } from "lucide-react";
import { featureFiles, featureImport } from "../../data/content";
import { platform } from "../../data/assets";

/* The feature visuals, drawn in V1's two voices: the meeting one on the dark
   band in V1's surface-dark card language, the file one as a light app window
   like the hero. No tinted plates anywhere - depth comes from real shadows. */

const TINTS = ["bg-accent-soft text-accent", "bg-trust-soft text-trust", "bg-[#FFF4E5] text-[#B45309]"];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

/* ---------------------------------------------------------------- meeting */

const MEETING = {
  title: "Q3 planning call",
  meta: "Today · 42 min",
  lines: [
    { who: "Elena Petrova", at: "12:04", text: "The pricing page test finished, and the three-month plan won on revenue per visitor." },
    { who: "Tom Alvarez", at: "12:19", text: "Then we make it the default and keep the monthly plan as the fallback." },
    { who: "Elena Petrova", at: "12:33", text: "I will write it up and send the numbers to finance before Thursday." },
  ],
  summary: [
    "Three-month plan won the pricing test.",
    "Numbers go to finance before Thursday.",
  ],
  actions: [
    { who: "Elena", text: "Send the pricing numbers to finance", done: true },
    { who: "Tom", text: "Make the 3-month plan the default", done: false },
  ],
};

const CALL_MARKS = ["Zoom", "Google Meet", "Microsoft Teams"];

export function MeetingResultMock() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[34px] opacity-70 blur-2xl"
        style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.35), transparent)" }}
      />
      <div className="surface-dark overflow-hidden rounded-[22px] border border-white/10">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-ink-invert">{MEETING.title}</p>
            <p className="text-[11px] text-muted-invert">{MEETING.meta}</p>
          </div>
          {/* The three places a call happens, as their real marks on white
              coins - a colored logo dropped straight on a dark field loses
              its own colors. */}
          <span className="ml-auto flex shrink-0 items-center gap-1.5">
            {CALL_MARKS.map((name) => (
              <span key={name} className="flex size-7 items-center justify-center rounded-full bg-white shadow-soft">
                <img src={platform[name]} alt={name} className="h-3.5 w-auto" />
              </span>
            ))}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <ul className="space-y-3">
            {MEETING.lines.map((l, i) => (
              <li key={l.at} className="flex gap-2.5">
                <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${TINTS[i % TINTS.length]}`}>
                  {initials(l.who)}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-muted-invert">
                    {l.who} <span className="tabular-nums">{l.at}</span>
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-[1.5] text-ink-invert/85">{l.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-px border-t border-white/10 bg-white/[0.04] sm:grid-cols-2">
          <div className="bg-dark-2/60 p-4 sm:p-5">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-ink-invert">
              <Sparkles size={12} className="text-accent-glow" />
              AI Summary
            </p>
            <ul className="space-y-1.5">
              {MEETING.summary.map((s) => (
                <li key={s} className="flex gap-2 text-[12px] leading-[1.45] text-muted-invert">
                  <span className="mt-[6px] size-1 shrink-0 rounded-full bg-accent-glow" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-dark-2/60 p-4 sm:p-5">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-ink-invert">
              <ListChecks size={12} className="text-accent-glow" />
              Action Items
            </p>
            <ul className="space-y-2">
              {MEETING.actions.map((a) => (
                <li key={a.text} className="flex items-start gap-2">
                  <span
                    className={`mt-[1px] flex size-[14px] shrink-0 items-center justify-center rounded-[4px] border ${
                      a.done ? "border-accent bg-accent text-white" : "border-white/25 bg-transparent"
                    }`}
                  >
                    {a.done ? <Check size={9} strokeWidth={3} /> : null}
                  </span>
                  <span className="text-[12px] leading-[1.4] text-muted-invert">
                    {a.text}
                    <span className="ml-1.5 rounded bg-white/10 px-1.5 py-[1px] text-[9px] font-medium text-ink-invert/70">{a.who}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- file */

export function FileFlowMock() {
  const reduce = useReducedMotion();
  const f = featureFiles.demo;
  return (
    <div className="overflow-hidden rounded-[22px] bg-white shadow-lift ring-1 ring-black/[0.07]">
      <div className="flex items-center gap-3 border-b border-border-soft px-4 py-3">
        <span className="hidden items-center gap-1.5 sm:flex" aria-hidden>
          <span className="size-[11px] rounded-full bg-[#FF5F57]" />
          <span className="size-[11px] rounded-full bg-[#FEBC2E]" />
          <span className="size-[11px] rounded-full bg-[#28C840]" />
        </span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent sm:ml-1">
          <FileVideo size={16} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-ink">{f.file.name}</p>
          <p className="text-[11px] text-muted">
            {f.file.size} · {f.file.length}
          </p>
        </div>
      </div>

      <div className="border-b border-border-soft px-4 py-3.5">
        <ol className="flex items-center gap-2">
          {f.stages.map((s, i) => (
            <li key={s} className="flex min-w-0 flex-1 items-center gap-2">
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  i === 0 ? "bg-trust text-white" : i === 1 ? "bg-accent text-white" : "bg-surface-soft text-muted"
                }`}
              >
                {i === 0 ? <Check size={11} strokeWidth={3} /> : i + 1}
              </span>
              <span className={`truncate text-[11px] font-medium ${i === 2 ? "text-muted" : "text-ink"}`}>{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-soft">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,#3B82F6,#2563EB)]"
            initial={{ width: "12%" }}
            animate={reduce ? { width: "68%" } : { width: ["12%", "68%"] }}
            transition={reduce ? undefined : { duration: 2.2, ease: "easeOut" }}
          />
        </div>
        <p className="mt-2 text-[11px] font-medium text-accent">{f.progress}</p>
      </div>

      <div className="p-4">
        <ul className="space-y-2.5">
          {f.lines.map((l, i) => (
            <li key={l.at} className="flex gap-2">
              <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${TINTS[i % TINTS.length]}`}>
                {initials(l.who)}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-muted">
                  {l.who} <span className="tabular-nums">{l.at}</span>
                </p>
                <p className="mt-0.5 text-[12px] leading-[1.45] text-ink-2">{l.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border-soft pt-3.5">
          <span className="mr-1 text-[11px] font-semibold text-muted">Export</span>
          {f.exports.map((e) => (
            <span key={e} className="rounded-md border border-border bg-white px-2 py-[3px] text-[10px] font-semibold text-ink-2">
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- platforms */

export function PlatformPills() {
  /* V1's pill row. Every mark keeps its NATIVE aspect: height is fixed, width
     is the logo's own - a brand mark forced into a square box is what came out
     cropped and stretched, and a cropped brand mark reads as a fake one. */
  return (
    <ul className="flex flex-wrap gap-2.5 sm:gap-3">
      {featureImport.platforms.map((name) => (
        <li
          key={name}
          className="inline-flex h-[52px] items-center gap-2.5 rounded-full border border-border bg-white px-5 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card"
        >
          <img src={platform[name]} alt="" aria-hidden className="h-[22px] w-auto" />
          <span className="text-sm font-semibold text-ink">{name}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ misc */

export function BenefitList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const odd = items.length % 2 === 1;
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {items.map((b, i) => (
        <li
          key={b}
          className={`flex items-start gap-2.5 text-[15px] leading-snug ${dark ? "text-muted-invert" : "text-ink-2"} ${
            odd && i === items.length - 1 ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""
          }`}
        >
          <span
            className={`mt-[2px] flex size-[18px] shrink-0 items-center justify-center rounded-full ${
              dark ? "bg-accent/20 text-accent-glow" : "bg-trust-soft text-trust"
            }`}
          >
            <Check size={11} strokeWidth={3} />
          </span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export { ListChecks, Search };
