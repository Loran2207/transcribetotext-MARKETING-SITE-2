import { motion } from "framer-motion";
import { GraduationCap, Radio, Landmark, HeartPulse, Newspaper, Scale, Megaphone, Mic, FlaskConical, ArrowUpRight } from "lucide-react";
import { Section } from "../primitives/Section";
import { SectionHeading } from "../primitives/SectionHeading";
import { industries } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS = [GraduationCap, Radio, Landmark, HeartPulse, Newspaper, Scale, Megaphone, Mic, FlaskConical];

export function Industries() {
  return (
    <Section tone="white" className="relative overflow-hidden bg-dot-grid-light">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[120px]" />
      <div className="relative">
        <SectionHeading eyebrow="Who it is for" title={industries.title} subtitle={industries.subtitle} />
        <motion.div variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3.5 sm:grid-cols-3">
          {industries.list.map((name, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.a
                key={name}
                href="#"
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-card border border-border bg-white p-[18px] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(120deg, rgba(37,99,235,0.05), transparent 62%)" }} />
                <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl text-accent transition-all duration-300 group-hover:scale-105 group-hover:text-white" style={{ background: "linear-gradient(160deg, #EAF1FE, #F7F9FC)" }}>
                  <span aria-hidden="true" className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(160deg,#3B82F6,#2563EB)" }} />
                  <Icon size={21} strokeWidth={1.7} className="relative" />
                </span>
                <span className="relative flex-1 text-[15px] font-semibold text-ink">{name}</span>
                <ArrowUpRight size={17} className="relative shrink-0 -translate-x-1 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
