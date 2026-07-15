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
        className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:mt-10 lg:mt-12 lg:grid-cols-3 lg:gap-6"
      >
        {industries.list.map((name, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div
              key={name}
              variants={fadeUp}
              className="flex items-center gap-2.5 rounded-2xl border border-border bg-white px-3 py-3 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card sm:gap-3 sm:px-5 sm:py-4 lg:gap-4 lg:px-6 lg:py-5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent sm:size-11">
                <Icon strokeWidth={1.8} className="size-[18px] sm:size-[22px]" />
              </span>
              <span className="min-w-0 text-[15px] font-semibold leading-tight text-ink sm:text-lg sm:leading-normal">{name}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
