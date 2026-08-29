import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { BookOpen, FileVideo, Mic, PenLine, Search, ShieldCheck, Users, Video } from "lucide-react";
import { Section } from "../primitives/Section";
import { SectionHeading } from "../primitives/SectionHeading";
import { industries } from "../../data/content";
import { platform } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS: Record<string, typeof Video> = {
  meetings: Video,
  interviews: Mic,
  podcasts: FileVideo,
  research: Search,
  education: BookOpen,
  content: PenLine,
};

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-white px-2 py-[3px] text-[10px] font-semibold text-ink-2">{children}</span>
  );
}

/* Each card carries one small piece of the real thing it stands for, so the six
   read as six different jobs rather than six copies of the same tile. */
function Hint({ k }: { k: string }) {
  if (k === "meetings") {
    return (
      <span className="flex items-center gap-1.5">
        {["Zoom", "Google Meet", "Microsoft Teams"].map((p) => (
          <img key={p} src={platform[p]} alt="" aria-hidden className="size-5" />
        ))}
      </span>
    );
  }
  if (k === "interviews") {
    return (
      <span className="flex items-center gap-1.5">
        <span className="flex size-5 items-center justify-center rounded-full bg-accent-soft text-[9px] font-bold text-accent">IN</span>
        <span className="flex size-5 items-center justify-center rounded-full bg-trust-soft text-[9px] font-bold text-trust">GU</span>
        <span className="text-[10px] font-medium text-muted">2 speakers</span>
      </span>
    );
  }
  if (k === "podcasts") {
    return (
      <span className="flex items-end gap-[3px]" aria-hidden>
        {[7, 12, 9, 15, 6, 13, 8, 11, 5, 14, 9, 7].map((h, i) => (
          <span key={i} className="w-[3px] rounded-full bg-accent/35" style={{ height: h }} />
        ))}
      </span>
    );
  }
  if (k === "research") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-2 py-1 text-[10px] font-medium text-muted">
        <Search size={10} />
        “onboarding cost” · 14 hits
      </span>
    );
  }
  if (k === "education") {
    return (
      <span className="flex items-center gap-2">
        <Chip>Lecture 08</Chip>
        <span className="text-[10px] font-medium text-muted">1 hr 12 min</span>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5">
      <Chip>SRT</Chip>
      <Chip>DOCX</Chip>
      <Chip>TXT</Chip>
    </span>
  );
}

export function Industries() {
  return (
    <Section tone="white">
      <SectionHeading title={industries.title} subtitle={industries.subtitle} />
      <motion.ul
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-9 grid max-w-5xl gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-6"
      >
        {industries.cards.map((c) => {
          const Icon = ICONS[c.key];
          return (
            <motion.li
              key={c.key}
              variants={fadeUp}
              className="flex flex-col rounded-[20px] border border-border bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <p className="font-display text-lg font-bold leading-tight tracking-[-0.01em] text-ink">{c.name}</p>
              </div>
              <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink-2">{c.body}</p>
              <div className="mt-5 border-t border-border-soft pt-3.5">
                <Hint k={c.key} />
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
        className="mt-8 flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-[13px] text-muted sm:justify-center"
      >
        {industries.footnote.map((f, i) => (
          <motion.li key={f} variants={fadeUp} className="flex items-center gap-1.5">
            {i === 0 ? <Users size={13} className="text-accent" /> : <ShieldCheck size={13} className="text-trust" />}
            {f}
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
