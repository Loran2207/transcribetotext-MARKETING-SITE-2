import { motion } from "framer-motion";
import { BookOpen, ChevronRight, FileText, Mic, PenLine, Play, Search, ShieldCheck, Users, Video, X } from "lucide-react";
import { SectionCutout } from "../primitives/SectionCutout";
import { Container } from "../primitives/Container";
import { SectionHeading } from "../primitives/SectionHeading";
import { industries } from "../../data/content";
import { platform } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS: Record<string, typeof Video> = {
  meetings: Video,
  interviews: Mic,
  podcasts: Play,
  research: Search,
  education: BookOpen,
  content: PenLine,
};

/* The brief's reference draws each use case WITH a miniature of the product
   doing that exact job (Kirill, round 7: "вот эту часть ты так и не сделал").
   Every card: icon + name, the brief's one line, and a small quiet widget -
   white, hairline ring, tiny type. The Meetings card leads with an accent
   border and the Most popular tag, like the reference's first card. */

function Chrome({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl bg-white p-2.5 shadow-soft ring-1 ring-black/[0.06] ${className}`}>{children}</div>;
}

function MiniTabs({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <div className="flex gap-3 border-b border-border-soft pb-1">
      {items.map((t, i) => (
        <span
          key={t}
          className={`relative whitespace-nowrap text-[9px] font-semibold ${i === active ? "text-accent" : "text-muted"}`}
        >
          {t}
          {i === active ? <span className="absolute -bottom-[5px] left-0 right-0 h-[2px] rounded-full bg-accent" /> : null}
        </span>
      ))}
    </div>
  );
}

function Line({ who, at, text }: { who: string; at: string; text: string }) {
  return (
    <p className="text-[9px] leading-[1.45] text-ink-2">
      <span className="font-semibold text-ink">{who}</span> <span className="tabular-nums text-muted">{at}</span>
      <br />
      {text}
    </p>
  );
}

function WidgetMeetings() {
  return (
    <Chrome>
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className="min-w-0 truncate text-[9.5px] font-semibold text-ink">Weekly product sync</span>
        <span className="ml-auto flex shrink-0 items-center gap-1 text-[8.5px] font-medium text-deal">
          <span className="size-1 rounded-full bg-deal" /> 32:18
        </span>
      </div>
      <MiniTabs items={["Transcript", "Summary", "Action Items"]} />
      <div className="mt-2 space-y-1.5">
        <Line who="Alex" at="00:02" text="Let's review the new onboarding flow." />
        <Line who="Sarah" at="00:19" text="Designs are final, we launch next week." />
      </div>
    </Chrome>
  );
}

function WidgetInterviews() {
  return (
    <Chrome>
      <div className="space-y-1.5">
        <Line who="Interviewer" at="00:01" text="Can you tell us about your background?" />
        <Line who="Guest" at="00:07" text="Sure, I started out in digital marketing." />
      </div>
      <div className="mt-2 flex items-end gap-[2px]" aria-hidden>
        {[4, 9, 6, 12, 8, 14, 7, 11, 5, 10, 6, 13, 8, 5, 9, 12, 6, 10, 4, 8].map((h, i) => (
          <span key={i} className="w-[2.5px] rounded-full bg-accent/50" style={{ height: h }} />
        ))}
      </div>
    </Chrome>
  );
}

function WidgetPodcasts() {
  return (
    <Chrome>
      <div className="flex h-14 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#1E293B,#0A0F1E)]">
        <span className="flex size-6 items-center justify-center rounded-full bg-white/90 text-ink">
          <Play size={10} className="ml-[1px]" fill="currentColor" />
        </span>
      </div>
      <p className="mt-1.5 text-[8.5px] font-medium tabular-nums text-muted">0:00 / 45:28</p>
      <div className="mt-1.5 space-y-1 border-t border-border-soft pt-1.5">
        <Line who="Host" at="00:00" text="Welcome back to the show." />
        <Line who="Guest" at="00:05" text="Great to be here, thanks." />
      </div>
    </Chrome>
  );
}

function WidgetEducation() {
  return (
    <Chrome>
      <p className="mb-1.5 text-[9.5px] font-semibold text-ink">Lecture: Psychology 101</p>
      <MiniTabs items={["Transcript", "Summary"]} />
      <div className="mt-2 space-y-1.5">
        <Line who="Professor" at="00:00" text="Today we'll discuss cognitive biases." />
        <Line who="Professor" at="00:45" text="Confirmation bias is our tendency to..." />
      </div>
    </Chrome>
  );
}

function WidgetResearch() {
  const hit = <span className="rounded-[3px] bg-accent-soft px-0.5 font-medium text-accent">marketing strategy</span>;
  return (
    <Chrome>
      <div className="flex items-center gap-1.5 rounded-lg border border-border px-2 py-1">
        <Search size={9} className="shrink-0 text-muted" />
        <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ink">marketing strategy</span>
        <X size={9} className="shrink-0 text-muted" />
      </div>
      <p className="mt-1.5 text-[8.5px] font-medium text-muted">3 results found</p>
      <div className="mt-1 space-y-1">
        <p className="text-[9px] leading-[1.45] text-ink-2">
          <span className="tabular-nums text-muted">12:03</span> ...our {hit} focuses on...
        </p>
        <p className="text-[9px] leading-[1.45] text-ink-2">
          <span className="tabular-nums text-muted">18:47</span> we should test a new {hit}
        </p>
      </div>
    </Chrome>
  );
}

const EXPORTS = [
  { name: "DOCX", tint: "bg-accent-soft text-accent" },
  { name: "PDF", tint: "bg-deal/10 text-deal" },
  { name: "TXT", tint: "bg-surface-soft text-ink-2" },
  { name: "SRT", tint: "bg-[#F3E8FF] text-[#7C3AED]" },
  { name: "VTT", tint: "bg-trust-soft text-trust" },
];

function WidgetExport() {
  return (
    <Chrome>
      <p className="mb-1.5 text-[9.5px] font-semibold text-ink">Export</p>
      <ul className="space-y-1">
        {EXPORTS.map((e) => (
          <li key={e.name} className="flex items-center gap-1.5">
            <span className={`flex size-4 items-center justify-center rounded-[5px] ${e.tint}`}>
              <FileText size={9} />
            </span>
            <span className="text-[9px] font-medium text-ink-2">{e.name}</span>
            <ChevronRight size={9} className="ml-auto text-muted" />
          </li>
        ))}
      </ul>
    </Chrome>
  );
}

const WIDGETS: Record<string, () => React.ReactElement> = {
  meetings: WidgetMeetings,
  interviews: WidgetInterviews,
  podcasts: WidgetPodcasts,
  education: WidgetEducation,
  research: WidgetResearch,
  content: WidgetExport,
};

const CALL_MARKS = ["Zoom", "Google Meet", "Microsoft Teams"];

export function Industries() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <SectionCutout fill="#0A0F1E" />
      <div aria-hidden className="bg-dot-grid-light pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <SectionHeading title={industries.title} subtitle={industries.subtitle} />
        <motion.ul
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-10 grid max-w-6xl items-stretch gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 lg:gap-6"
        >
          {industries.cards.map((c, idx) => {
            const Icon = ICONS[c.key];
            const Widget = WIDGETS[c.key];
            const lead = idx === 0;
            return (
              <motion.li
                key={c.key}
                variants={fadeUp}
                className={`relative flex flex-col rounded-[20px] border bg-white p-5 transition hover:-translate-y-1 hover:shadow-card ${
                  lead ? "border-accent/50 shadow-card" : "border-border shadow-soft"
                }`}
              >
                {lead ? (
                  <span className="absolute -top-3 right-5 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-3 py-1 text-[11px] font-bold text-white shadow-blue">
                    {industries.popularTag}
                  </span>
                ) : null}
                <div className="flex items-center gap-3">
                  <span className="shadow-blue flex size-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-white">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <p className="font-display text-[17px] font-semibold leading-tight tracking-[-0.01em] text-ink">{c.name}</p>
                </div>
                <div className="mt-4 grid flex-1 gap-3 min-[420px]:grid-cols-[1fr_1.2fr] min-[420px]:items-start">
                  <div className="flex h-full flex-col">
                    <p className="text-pretty text-[13px] leading-relaxed text-ink-2">{c.body}</p>
                    {lead ? (
                      <span className="mt-auto flex items-center gap-1.5 pt-3">
                        {CALL_MARKS.map((name) => (
                          <span key={name} className="flex size-6 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-black/[0.06]">
                            <img src={platform[name]} alt={name} className="h-3 w-auto" />
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </div>
                  <Widget />
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[13px] text-muted"
        >
          {industries.footnote.map((f, i) => (
            <motion.li key={f} variants={fadeUp} className="flex items-center gap-1.5">
              {i === 0 ? <Users size={13} className="text-accent" /> : <ShieldCheck size={13} className="text-trust" />}
              {f}
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
