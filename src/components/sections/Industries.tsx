import { motion } from "framer-motion";
import { BookOpen, FileText, Mic, PenLine, Play, Search, ShieldCheck, Users, Video, X } from "lucide-react";
import { SectionCutout } from "../primitives/SectionCutout";
import { Container } from "../primitives/Container";
import { SectionHeading } from "../primitives/SectionHeading";
import { industries } from "../../data/content";
import { platform } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

/* The brief's reference draws each use case WITH a miniature of the product
   doing that exact job, laid out as a bento (Kirill, round 9): the Meetings
   cell leads at double width, the medium cells let their widgets peek past
   the bottom edge, and Content Creation closes the grid as a wide slim bar. */

function Chrome({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-t-2xl bg-white p-3.5 shadow-card ring-1 ring-black/[0.06] ${className}`}>{children}</div>;
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

const CELL_ICON: Record<string, typeof Video> = {
  interviews: Mic,
  podcasts: Play,
  education: BookOpen,
  research: Search,
};

/* A medium bento cell: text on top, its widget anchored to the bottom edge
   and peeking past it - the cell clips the overhang. */
function BentoCell({ name, body, icon, children }: { name: string; body: string; icon: string; children: React.ReactNode }) {
  const Icon = CELL_ICON[icon];
  return (
    <motion.div
      variants={fadeUp}
      className="relative flex flex-col overflow-hidden rounded-[24px] border border-border bg-white p-6 shadow-soft lg:min-h-[300px]"
    >
      <div className="flex items-center gap-3">
        <span className="shadow-blue flex size-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-white">
          <Icon size={18} strokeWidth={1.9} />
        </span>
        <p className="font-display text-lg font-semibold tracking-[-0.01em] text-ink">{name}</p>
      </div>
      <p className="mt-3 text-pretty text-[13.5px] leading-relaxed text-ink-2">{body}</p>
      <div className="mt-auto translate-y-3 pt-5">{children}</div>
    </motion.div>
  );
}

const CALL_MARKS = ["Zoom", "Google Meet", "Microsoft Teams"];

export function Industries() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <SectionCutout fill="#0A0F1E" />
      <div aria-hidden className="bg-dot-grid-light pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <SectionHeading title={industries.title} subtitle={industries.subtitle} />
        {/* A bento, not six identical boxes (Kirill, round 9: "нужно сделать
            красивый бенто"): the Meetings cell spans two columns with a large
            transcript window bleeding off its corner, three medium cells sit
            under it with their widgets peeking from the bottom edge, and a
            wide slim Content Creation bar closes the grid with the export
            chips in a row. Every widget is anchored to a cell edge and
            clipped by it - the peek is the bento signature. */}
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-10 grid max-w-6xl gap-5 md:mt-14 lg:grid-cols-3 lg:gap-6"
        >
          {/* Meetings - the lead cell. */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[24px] border border-accent/40 bg-white p-6 shadow-card lg:col-span-2 lg:min-h-[290px]"
          >
            <span className="absolute right-5 top-5 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-3 py-1 text-[11px] font-bold text-white shadow-blue">
              {industries.popularTag}
            </span>
            <div className="flex items-center gap-3">
              <span className="shadow-blue flex size-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-white">
                <Video size={18} strokeWidth={1.9} />
              </span>
              <p className="font-display text-lg font-semibold tracking-[-0.01em] text-ink">{industries.cards[0].name}</p>
            </div>
            <p className="mt-3 max-w-[280px] text-pretty text-[13.5px] leading-relaxed text-ink-2">{industries.cards[0].body}</p>
            <span className="mt-4 flex items-center gap-1.5">
              {CALL_MARKS.map((name) => (
                <span key={name} className="flex size-6 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-black/[0.06]">
                  <img src={platform[name]} alt={name} className="h-3 w-auto" />
                </span>
              ))}
            </span>
            <div className="mt-5 w-[300px] translate-y-3 lg:absolute lg:bottom-0 lg:right-6 lg:mt-0 lg:w-[50%] lg:min-w-[300px]">
              <div className="rounded-t-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.06]">
                <div className="mb-2 flex items-center gap-1.5">
                  <span className="min-w-0 truncate text-[11px] font-semibold text-ink">Weekly product sync</span>
                  <span className="ml-auto flex shrink-0 items-center gap-1 text-[9.5px] font-medium text-deal">
                    <span className="size-1 rounded-full bg-deal" /> 32:18
                  </span>
                </div>
                <MiniTabs items={["Transcript", "Summary", "Action Items"]} />
                <div className="mt-2.5 space-y-2">
                  <Line who="Alex" at="00:02" text="Let's review the new onboarding flow." />
                  <Line who="Sarah" at="00:19" text="Designs are final, we launch next week." />
                  <Line who="Priya" at="00:31" text="I'll share the launch checklist after." />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interviews. */}
          <BentoCell name={industries.cards[1].name} body={industries.cards[1].body} icon="interviews">
            <WidgetInterviews />
          </BentoCell>

          {/* Podcasts, Education, Research. */}
          <BentoCell name={industries.cards[2].name} body={industries.cards[2].body} icon="podcasts">
            <WidgetPodcasts />
          </BentoCell>
          <BentoCell name={industries.cards[4].name} body={industries.cards[4].body} icon="education">
            <WidgetEducation />
          </BentoCell>
          <BentoCell name={industries.cards[3].name} body={industries.cards[3].body} icon="research">
            <WidgetResearch />
          </BentoCell>

          {/* Content Creation - the wide slim base bar. */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 rounded-[24px] border border-border bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between lg:col-span-3"
          >
            <div className="flex items-center gap-3">
              <span className="shadow-blue flex size-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-white">
                <PenLine size={18} strokeWidth={1.9} />
              </span>
              <div>
                <p className="font-display text-lg font-semibold tracking-[-0.01em] text-ink">{industries.cards[5].name}</p>
                <p className="text-[13.5px] leading-relaxed text-ink-2">{industries.cards[5].body}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {EXPORTS.map((e) => (
                <span key={e.name} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 shadow-soft">
                  <span className={`flex size-4 items-center justify-center rounded-[5px] ${e.tint}`}>
                    <FileText size={9} />
                  </span>
                  <span className="text-[11.5px] font-semibold text-ink-2">{e.name}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

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
