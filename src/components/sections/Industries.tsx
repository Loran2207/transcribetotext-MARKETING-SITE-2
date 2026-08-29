import { motion } from "framer-motion";
import { BookOpen, FileText, Mic, Play, Search, ShieldCheck, Users, Video, X } from "lucide-react";
import { SectionCutout } from "../primitives/SectionCutout";
import { Container } from "../primitives/Container";
import { SectionHeading } from "../primitives/SectionHeading";
import { industries } from "../../data/content";
import { platform } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

/* The bento, round 11. The previous version was the SAFE bento - six tinted
   trays, a white widget centred in each - and it read as a table with rounded
   corners. Rebuilt on what the measured top of the market actually does:

   1. The lead cell's content IS a photograph, edge to edge, with its label
      written straight on the picture over a SHORT bottom scrim (Poly: 71px on
      a 380px cell). It also ties this section to the feature frames above it,
      so the page reads as one photographic system.
   2. That cell carries a real cut-out - a folder tab across its top left. In a
      survey of ~60 bento sections this was the only non-rectangular cell
      geometry found anywhere, which is exactly why it reads as unusual.
   3. A widget that overruns its cell DISSOLVES into the tray colour instead of
      being chopped square (Attio's mask-gradient, built here as a tray-coloured
      wash so it survives the DOM-to-Figma export). The eye reads a fade as
      "continues" and a hard cut as "broken".
   4. Row rhythm is 1:2 - the lead is exactly two rows plus the gap, the
      arithmetic Clerk and Family both use.
   5. One cell is deliberately QUIET - deep ink, one glyph, no widget. Six loud
      cells is what makes a bento read as noise. */

const CARD = "rounded-[10px] bg-white p-3.5 ring-1 ring-black/[0.05]";
const CELL = "relative overflow-hidden rounded-[20px]";

function Line({ who, at, text }: { who: string; at: string; text: string }) {
  return (
    <p className="text-[10.5px] leading-[1.45] text-ink-2">
      <span className="font-semibold text-ink">{who}</span> <span className="tabular-nums text-muted">{at}</span>
      <br />
      {text}
    </p>
  );
}

function WidgetInterviews() {
  return (
    <div className={CARD}>
      <div className="mb-3 flex items-end gap-[3px]" aria-hidden>
        {[5, 11, 7, 14, 9, 16, 8, 12, 6, 13, 7, 15, 9, 6, 11, 14, 7, 12, 5, 10, 13, 8, 15, 9].map((h, i) => (
          <span key={i} className="w-[3px] shrink-0 rounded-full bg-accent/50" style={{ height: h }} />
        ))}
      </div>
      <div className="space-y-2 border-t border-border-soft pt-3">
        <Line who="Interviewer" at="00:01" text="Can you tell us about your background?" />
        <Line who="Guest" at="00:07" text="Sure, I started out in digital marketing." />
        <Line who="Interviewer" at="00:21" text="And what pulled you into this industry?" />
      </div>
    </div>
  );
}

function WidgetPodcasts() {
  return (
    <div className={CARD}>
      <div className="flex items-center gap-2">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <Play size={11} className="ml-[1px]" fill="currentColor" />
        </span>
        <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-surface-soft">
          <span className="block h-full w-1/4 rounded-full bg-accent" />
        </span>
        <span className="shrink-0 text-[10px] font-medium tabular-nums text-muted">45:28</span>
      </div>
      <div className="mt-3 space-y-2 border-t border-border-soft pt-3">
        <Line who="Host" at="00:00" text="Welcome back to the show." />
        <Line who="Guest" at="00:05" text="Great to be here, thanks for having me." />
        <Line who="Host" at="00:14" text="Let's start with how you got here." />
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

/* A working cell: tinted tray, its heading, then the widget running past the
   bottom edge and dissolving into the tray's own colour. The heading and the
   widget's first rows are always whole - only the repeating tail fades, which
   is the difference between clipping texture and clipping information. */
function BentoCell({
  name,
  body,
  icon: Icon,
  tint,
  wash,
  children,
  className = "",
}: {
  name: string;
  body: string;
  icon: typeof Video;
  tint: string;
  wash: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} className={`${CELL} flex flex-col p-5 ${tint} ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-white text-accent">
          <Icon size={16} strokeWidth={1.9} />
        </span>
        <p className="font-display text-[16px] font-semibold tracking-[-0.01em] text-ink">{name}</p>
      </div>
      <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-ink-2">{body}</p>
      {/* The widget runs to the cell's true bottom edge - the negative margin
          cancels the padding - so the tray colour finishes it off completely.
          A fade that stops short of the edge leaves a hard cut under it, which
          is the exact "обрезан" defect it exists to prevent. */}
      <div className="relative -mb-5 mt-4 min-h-[196px] flex-1 overflow-hidden lg:min-h-[130px]">
        <div className="absolute inset-x-0 top-0">{children}</div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${wash} 72%, ${wash} 100%)` }}
        />
      </div>
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
          className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-12 lg:grid-rows-[282px_282px_auto]"
        >
          {/* The lead: a photograph, with a folder tab cut across its top left.
              The tab is what says "a recording, filed" without a word of copy. */}
          <motion.div variants={fadeUp} className="flex flex-col sm:col-span-2 lg:col-span-6 lg:row-span-2">
            <div className="flex h-[38px] w-fit items-center gap-2.5 rounded-t-[14px] bg-dark pl-4 pr-3">
              <Video size={15} strokeWidth={1.9} className="text-accent-glow" />
              <span className="font-display text-[14px] font-semibold text-ink-invert">{c[0].name}</span>
              <span className="rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-2 py-[3px] text-[10px] font-bold text-white">
                {industries.popularTag}
              </span>
            </div>
            <div className={`${CELL} min-h-[320px] flex-1 rounded-tl-none bg-dark lg:min-h-0`}>
              <img
                src="/brand/features/bento-meetings.jpg"
                alt=""
                aria-hidden
                className="absolute inset-0 size-full object-cover"
              />
              {/* A SHORT scrim, ~20% of the cell - it darkens the two text lines
                  and nothing else, so the photograph stays a photograph. */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[38%]"
                style={{ background: "linear-gradient(0deg, rgba(6,12,30,0.86) 0%, rgba(6,12,30,0.55) 40%, rgba(6,12,30,0) 100%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[15px] font-semibold leading-snug text-white">{c[0].body}</p>
                <span className="mt-3 flex items-center gap-1.5">
                  {CALL_MARKS.map((name) => (
                    <span key={name} className="flex size-7 items-center justify-center rounded-full bg-white">
                      <img src={platform[name]} alt={name} className="h-3.5 w-auto" />
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </motion.div>

          <BentoCell name={c[1].name} body={c[1].body} icon={Mic} tint="bg-accent-soft" wash="#EAF1FE" className="lg:col-span-3">
            <WidgetInterviews />
          </BentoCell>

          <BentoCell name={c[2].name} body={c[2].body} icon={Play} tint="bg-surface-soft" wash="#F7F9FC" className="lg:col-span-3">
            <WidgetPodcasts />
          </BentoCell>

          {/* The quiet cell. Deep ink, one glyph, no widget - the rhythm break
              that stops six loud cells reading as noise. */}
          <motion.div
            variants={fadeUp}
            className={`${CELL} surface-dark flex flex-col p-5 lg:col-span-2`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-white/10 text-accent-glow ring-1 ring-white/15">
                <BookOpen size={16} strokeWidth={1.9} />
              </span>
              <p className="font-display text-[16px] font-semibold tracking-[-0.01em] text-ink-invert">{c[4].name}</p>
            </div>
            <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-muted-invert">{c[4].body}</p>
            {/* Hairline graphic, not a widget: the quiet cell stays quiet, and
                the lines read as a page of notes without drawing a panel. */}
            <div aria-hidden className="mt-5 space-y-3">
              {[100, 82, 92, 68, 88, 54, 76, 84, 62].map((w, i) => (
                <span key={i} className="block h-px rounded-full bg-white/15" style={{ width: `${w}%` }} />
              ))}
            </div>
          </motion.div>

          <BentoCell name={c[3].name} body={c[3].body} icon={Search} tint="bg-accent-soft" wash="#EAF1FE" className="lg:col-span-4">
            <WidgetResearch />
          </BentoCell>

          {/* The base bar: one outer radius, and 1px gutters INSIDE showing the
              tray through - the hairline made of geometry rather than borders. */}
          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-[20px] bg-deal/[0.15] sm:col-span-2 lg:col-span-12 lg:row-auto"
          >
            <div className="flex flex-col gap-px sm:flex-row">
              <div className="flex items-center gap-3 bg-deal/[0.05] p-5 sm:min-w-[340px]">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-white text-deal">
                  <FileText size={16} strokeWidth={1.9} />
                </span>
                <div>
                  <p className="font-display text-[16px] font-semibold tracking-[-0.01em] text-ink">{c[5].name}</p>
                  <p className="text-[12.5px] leading-relaxed text-ink-2">{c[5].body}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-2 bg-deal/[0.05] p-5 sm:justify-end">
                {EXPORTS.map((e) => (
                  <span key={e.name} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5">
                    <span className={`flex size-4 items-center justify-center rounded-[5px] ${e.tint}`}>
                      <FileText size={9} />
                    </span>
                    <span className="text-[11.5px] font-semibold text-ink-2">{e.name}</span>
                  </span>
                ))}
              </div>
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
