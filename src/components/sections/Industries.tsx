import { motion } from "framer-motion";
import { BookOpen, FileVideo, Mic, PenLine, Search, ShieldCheck, Users, Video } from "lucide-react";
import { SectionCutout } from "../primitives/SectionCutout";
import { Container } from "../primitives/Container";
import { SectionHeading } from "../primitives/SectionHeading";
import { industries } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS: Record<string, typeof Video> = {
  meetings: Video,
  interviews: Mic,
  podcasts: FileVideo,
  research: Search,
  education: BookOpen,
  content: PenLine,
};

/* V1's industry-card voice: white card, blue gradient app-tile, the name, one
   plain line. No interface fragments inside the cards - the interface lives in
   the hero and the feature windows, where it has the room to look real. */
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
          className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-6"
        >
          {industries.cards.map((c) => {
            const Icon = ICONS[c.key];
            return (
              <motion.li
                key={c.key}
                variants={fadeUp}
                className="flex flex-col rounded-[20px] border border-border bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
              >
                <div className="flex items-center gap-3.5">
                  <span className="shadow-blue flex size-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-white">
                    <Icon size={20} strokeWidth={1.9} />
                  </span>
                  <p className="font-display text-lg font-semibold leading-tight tracking-[-0.01em] text-ink">{c.name}</p>
                </div>
                <p className="mt-3.5 text-pretty text-sm leading-relaxed text-ink-2">{c.body}</p>
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
