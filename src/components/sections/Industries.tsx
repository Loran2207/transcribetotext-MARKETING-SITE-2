import { motion } from "framer-motion";
import { GraduationCap, Clapperboard, Landmark, HeartPulse, Newspaper, Scale, Megaphone, Mic, BookOpen } from "lucide-react";
import { Section } from "../primitives/Section";
import { SectionHeading } from "../primitives/SectionHeading";
import { industries } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS = [GraduationCap, Clapperboard, Landmark, HeartPulse, Newspaper, Scale, Megaphone, Mic, BookOpen];

export function Industries() {
  return (
    <Section tone="white">
      <SectionHeading title={industries.title} subtitle={industries.subtitle} />
      <motion.div
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:mt-10 lg:mt-12 lg:grid-cols-3 lg:gap-6"
      >
        {industries.list.map((name, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div
              key={name}
              variants={fadeUp}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-4 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card sm:px-5 lg:gap-4 lg:px-6 lg:py-5"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <span className="text-lg font-semibold text-ink">{name}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
