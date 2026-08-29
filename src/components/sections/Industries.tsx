import { motion } from "framer-motion";
import { BookOpen, FileText, Mic, PenLine, Play, Search, ShieldCheck, Users, Video, X } from "lucide-react";
import { SectionCutout } from "../primitives/SectionCutout";
import { Container } from "../primitives/Container";
import { SectionHeading } from "../primitives/SectionHeading";
import { industries } from "../../data/content";
import { platform } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

/* The bento, rebuilt on the pattern the premium ones actually use (Loom,
   Discord, FLORA): the CELL is a soft tinted tray, and the product widget is a
   white object floating IN it - fully visible, with air around it and its own
   shadow. Nothing is clipped: the owner could not read the widgets when their
   bottoms were cut by the cell edge. Rhythm comes from cell SIZE and tint
   rotation - one dark lead cell at double width, four medium cells, one wide
   base bar - not from six identical white boxes on white. */

const CARD = "w-full rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.05]";

function MiniTabs({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <div className="flex gap-3 border-b border-border-soft pb-1.5">
      {items.map((t, i) => (
        <span key={t} className={`relative whitespace-nowrap text-[10px] font-semibold ${i === active ? "text-accent" : "text-muted"}`}>
          {t}
          {i === active ? <span className="absolute -bottom-[7px] left-0 right-0 h-[2px] rounded-full bg-accent" /> : null}
        </span>
      ))}
    </div>
  );
}

function Line({ who, at, text }: { who: string; at: string; text: string }) {
  return (
    <p className="text-[10.5px] leading-[1.45] text-ink-2">
      <span className="font-semibold text-ink">{who}</span> <span className="tabular-nums text-muted">{at}</span>
      <br />
      {text}
    </p>
  );
}

function WidgetMeetings() {
  return (
    <div className={CARD}>
      <div className="mb-2 flex items-center gap-2">
        <span className="min-w-0 truncate text-[11.5px] font-semibold text-ink">Weekly product sync</span>
        <span className="ml-auto flex shrink-0 items-center gap-1 text-[10px] font-semibold text-deal">
          <span className="size-1.5 rounded-full bg-deal" /> 32:18
        </span>
      </div>
      <MiniTabs items={["Transcript", "Summary", "Action Items"]} />
      <div className="mt-3 space-y-2">
        <Line who="Alex" at="00:02" text="Let's review the new onboarding flow." />
        <Line who="Sarah" at="00:19" text="Designs are final, we launch next week." />
        <Line who="Priya" at="00:31" text="I'll share the checklist right after." />
      </div>
    </div>
  );
}

function WidgetInterviews() {
  return (
    <div className={CARD}>
      <div className="space-y-2">
        <Line who="Interviewer" at="00:01" text="Can you tell us about your background?" />
        <Line who="Guest" at="00:07" text="Sure, I started out in digital marketing." />
      </div>
      <div className="mt-3 flex items-end gap-[3px] border-t border-border-soft pt-3" aria-hidden>
        {[5, 11, 7, 14, 9, 16, 8, 12, 6, 13, 7, 15, 9, 6, 11, 14, 7, 12, 5, 10, 13, 8].map((h, i) => (
          <span key={i} className="w-[3px] shrink-0 rounded-full bg-accent/50" style={{ height: h }} />
        ))}
      </div>
    </div>
  );
}

function WidgetPodcasts() {
  return (
    <div className={CARD}>
      <div className="flex h-[76px] items-center justify-center rounded-xl bg-[linear-gradient(135deg,#1E293B,#0A0F1E)]">
        <span className="flex size-8 items-center justify-center rounded-full bg-white/95 text-ink shadow-soft">
          <Play size={12} className="ml-[1px]" fill="currentColor" />
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[10px] font-medium tabular-nums text-muted">0:00</span>
        <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-surface-soft">
          <span className="block h-full w-1/4 rounded-full bg-accent" />
        </span>
        <span className="text-[10px] font-medium tabular-nums text-muted">45:28</span>
      </div>
      <div className="mt-2.5 space-y-2 border-t border-border-soft pt-2.5">
        <Line who="Host" at="00:00" text="Welcome back to the show." />
        <Line who="Guest" at="00:05" text="Great to be here, thanks." />
      </div>
    </div>
  );
}

function WidgetEducation() {
  return (
    <div className={CARD}>
      <p className="mb-2 text-[11.5px] font-semibold text-ink">Lecture: Psychology 101</p>
      <MiniTabs items={["Transcript", "Summary"]} />
      <div className="mt-3 space-y-2">
        <Line who="Professor" at="00:00" text="Today we'll discuss cognitive biases." />
        <Line who="Professor" at="00:45" text="Confirmation bias is our tendency to look for what we expect." />
        <Line who="Professor" at="01:12" text="Next week we cover memory and recall." />
      </div>
    </div>
  );
}

function WidgetResearch() {
  const hit = <span className="rounded-[3px] bg-accent-soft px-0.5 font-medium text-accent">marketing strategy</span>;
  return (
    <div className={CARD}>
      <div className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5">
        <Search size={11} className="shrink-0 text-muted" />
        <span className="min-w-0 flex-1 truncate text-[10.5px] font-medium text-ink">marketing strategy</span>
        <X size={11} className="shrink-0 text-muted" />
      </div>
      <p className="mt-3 text-[10px] font-medium text-muted">3 results found</p>
      {/* Each hit is a flex row, not one wrapped paragraph with inline spans:
          the DOM-to-Figma converter mis-measures the wrapped case and the
          lines land on top of each other in the mockup. */}
      <div className="mt-2 space-y-2.5">
        {[
          { at: "12:03", pre: "...our ", post: " focuses on retention first." },
          { at: "18:47", pre: "we should test a new ", post: " in Q4." },
          { at: "32:11", pre: "the ", post: " showed great results." },
        ].map((r) => (
          <div key={r.at} className="flex gap-1.5 text-[10.5px] leading-[1.5]">
            <span className="shrink-0 tabular-nums text-muted">{r.at}</span>
            <span className="text-ink-2">
              {r.pre}
              {hit}
              {r.post}
            </span>
          </div>
        ))}
      </div>
    </div>
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

/* A medium cell: tinted tray, title block, then the widget as a white object
   with air on every side. The widget is never cut by the cell. */
function BentoCell({
  name,
  body,
  icon,
  tint,
  children,
}: {
  name: string;
  body: string;
  icon: string;
  tint: string;
  children: React.ReactNode;
}) {
  const Icon = CELL_ICON[icon];
  return (
    <motion.div variants={fadeUp} className={`flex flex-col rounded-[24px] p-5 ${tint}`}>
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-accent shadow-soft">
          <Icon size={17} strokeWidth={1.9} />
        </span>
        <p className="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">{name}</p>
      </div>
      <p className="mt-2.5 text-pretty text-[13px] leading-relaxed text-ink-2">{body}</p>
      <div className="mt-4 flex flex-1 items-center">{children}</div>
    </motion.div>
  );
}

const CALL_MARKS = ["Zoom", "Google Meet", "Microsoft Teams"];

export function Industries() {
  const c = industries.cards;
  return (
    <section className="relative bg-white py-16 md:py-24">
      <SectionCutout fill="#0A0F1E" />
      <div aria-hidden className="bg-dot-grid-light pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <SectionHeading title={industries.title} subtitle={industries.subtitle} />

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-10 grid max-w-6xl gap-4 md:mt-14 lg:grid-cols-3 lg:gap-5"
        >
          {/* The lead cell: dark, double width, the product window sitting in it
              whole, the call marks under the copy. */}
          <motion.div
            variants={fadeUp}
            className="surface-dark relative flex flex-col gap-5 rounded-[24px] p-6 sm:flex-row sm:items-center lg:col-span-2"
          >
            <div className="sm:w-[46%]">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-glow ring-1 ring-white/15">
                  <Video size={17} strokeWidth={1.9} />
                </span>
                <p className="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink-invert">{c[0].name}</p>
                <span className="rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-2.5 py-1 text-[10.5px] font-bold text-white shadow-blue">
                  {industries.popularTag}
                </span>
              </div>
              <p className="mt-2.5 text-pretty text-[13px] leading-relaxed text-muted-invert">{c[0].body}</p>
              <span className="mt-4 flex items-center gap-1.5">
                {CALL_MARKS.map((name) => (
                  <span key={name} className="flex size-7 items-center justify-center rounded-full bg-white shadow-soft">
                    <img src={platform[name]} alt={name} className="h-3.5 w-auto" />
                  </span>
                ))}
              </span>
            </div>
            <div className="sm:flex-1">
              <WidgetMeetings />
            </div>
          </motion.div>

          <BentoCell name={c[1].name} body={c[1].body} icon="interviews" tint="bg-accent-soft">
            <WidgetInterviews />
          </BentoCell>

          <BentoCell name={c[2].name} body={c[2].body} icon="podcasts" tint="bg-surface-soft">
            <WidgetPodcasts />
          </BentoCell>

          <BentoCell name={c[4].name} body={c[4].body} icon="education" tint="bg-accent-soft">
            <WidgetEducation />
          </BentoCell>

          <BentoCell name={c[3].name} body={c[3].body} icon="research" tint="bg-surface-soft">
            <WidgetResearch />
          </BentoCell>

          {/* The base bar: our second accent, the export formats as real chips. */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 rounded-[24px] bg-deal/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between lg:col-span-3"
          >
            <div className="flex items-start gap-2.5 sm:items-center">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-deal shadow-soft">
                <PenLine size={17} strokeWidth={1.9} />
              </span>
              <div>
                <p className="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">{c[5].name}</p>
                <p className="text-[13px] leading-relaxed text-ink-2">{c[5].body}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {EXPORTS.map((e) => (
                <span key={e.name} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-soft">
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
