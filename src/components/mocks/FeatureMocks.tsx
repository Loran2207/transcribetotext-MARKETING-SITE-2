import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, FileVideo, ListChecks, Search, Sparkles } from "lucide-react";
import { featureFiles, featureImport } from "../../data/content";
import { platform } from "../../data/assets";

/* Three visuals, one per feature block. Each shows the product doing the thing
   the block promises - a meeting that has ended and left a transcript behind, a
   file walking through processing, and the places a file can come from. */

const TINTS = ["bg-accent-soft text-accent", "bg-trust-soft text-trust", "bg-[#FFF4E5] text-[#B45309]"];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

function Avatar({ name, i }: { name: string; i: number }) {
  return (
    <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${TINTS[i % TINTS.length]}`}>
      {initials(name)}
    </span>
  );
}

/* ---------------------------------------------------------------- meeting */

const MEETING = {
  title: "Q3 planning call",
  meta: "Today, 42 min",
  platform: "Zoom",
  lines: [
    { who: "Elena Petrova", at: "12:04", text: "The pricing page test finished, and the three-month plan won on revenue per visitor." },
    { who: "Tom Alvarez", at: "12:19", text: "Then we make it the default and keep the monthly plan as the fallback." },
    { who: "Elena Petrova", at: "12:33", text: "I will write it up and send the numbers to finance before Thursday." },
    { who: "Priya Raman", at: "12:47", text: "I can take the copy changes, they are small." },
  ],
  summary: [
    "Three-month plan won the pricing test on revenue per visitor.",
    "It becomes the default; monthly stays as the fallback.",
    "Numbers go to finance before Thursday.",
  ],
  actions: [
    { who: "Elena", text: "Send the pricing numbers to finance", done: true },
    { who: "Tom", text: "Make the 3-month plan the default", done: false },
    { who: "Priya", text: "Update the pricing page copy", done: false },
  ],
};

export function MeetingResultMock() {
  const [tab, setTab] = useState<"summary" | "actions">("summary");
  return (
    <div className="overflow-hidden rounded-[20px] border border-border bg-white shadow-lift">
      <div className="flex items-center gap-3 border-b border-border-soft px-4 py-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <FileVideo size={15} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{MEETING.title}</p>
          <p className="text-[11px] text-muted">{MEETING.meta}</p>
        </div>
        <span className="ml-auto shrink-0 rounded-md bg-surface-soft px-2 py-1 text-[11px] font-medium text-ink-2">
          {MEETING.platform}
        </span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="border-b border-border-soft p-4 md:border-b-0 md:border-r">
          <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold text-muted">
            <Search size={11} />
            Searchable transcript
          </p>
          <ul className="space-y-2.5">
            {MEETING.lines.map((l, i) => (
              <li key={l.at} className="flex gap-2">
                <Avatar name={l.who} i={i} />
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-muted">
                    {l.who} <span className="tabular-nums">{l.at}</span>
                  </p>
                  <p className="mt-0.5 text-[12px] leading-[1.45] text-ink-2">{l.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <div className="mb-3 flex gap-1 rounded-lg bg-surface-soft p-[3px]">
            {(["summary", "actions"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                className={`flex-1 rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                  tab === k ? "bg-white text-ink shadow-soft" : "text-muted hover:text-ink-2"
                }`}
              >
                {k === "summary" ? "AI Summary" : "Action Items"}
              </button>
            ))}
          </div>

          {tab === "summary" ? (
            <ul className="space-y-2">
              {MEETING.summary.map((s) => (
                <li key={s} className="flex gap-2 text-[12px] leading-[1.45] text-ink-2">
                  <Sparkles size={11} className="mt-[3px] shrink-0 text-accent" />
                  {s}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-2">
              {MEETING.actions.map((a) => (
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
          )}
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
    <div className="overflow-hidden rounded-[20px] border border-border bg-white shadow-lift">
      <div className="flex items-center gap-3 border-b border-border-soft px-4 py-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <FileVideo size={18} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{f.file.name}</p>
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
            className="h-full rounded-full bg-accent"
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
              <Avatar name={l.who} i={i} />
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

export function PlatformGrid() {
  return (
    /* Two columns, not three: at three the longest real brand name on the list
       ("Microsoft Teams") came out clipped, and a clipped brand name is a
       defect, not a long name. */
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {featureImport.platforms.map((name) => (
        <li
          key={name}
          className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3.5 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card"
        >
          <img src={platform[name]} alt="" aria-hidden className="size-7 shrink-0" />
          <span className="min-w-0 text-sm font-semibold text-ink">{name}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ misc */

export function BenefitList({ items }: { items: string[] }) {
  /* Both feature blocks carry five benefits, and in a two-column grid the odd
     one out is squeezed into half the width - which is what broke "Searchable
     meeting history" and "...SRT & VTT export" onto a second line with one word
     alone on it. The last item takes the whole row instead. */
  const odd = items.length % 2 === 1;
  return (
    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {items.map((b, i) => (
        <li
          key={b}
          className={`flex items-start gap-2.5 text-[15px] leading-snug text-ink-2 ${
            odd && i === items.length - 1 ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""
          }`}
        >
          <span className="mt-[2px] flex size-[18px] shrink-0 items-center justify-center rounded-full bg-trust-soft text-trust">
            <Check size={11} strokeWidth={3} />
          </span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export { ListChecks };
