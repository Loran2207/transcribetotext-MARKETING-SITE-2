import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "../primitives/Section";
import { SectionHeading } from "../primitives/SectionHeading";
import { Button } from "../primitives/Button";
import { howItWorks } from "../../data/content";
import { EASE_OUT, fadeUp, stagger, viewportOnce } from "../../lib/motion";

const CONNECTORS = [
  "left-[calc(16.666%+3.5rem)] right-[calc(50%+3.5rem)]",
  "left-[calc(50%+3.5rem)] right-[calc(16.666%+3.5rem)]",
];

export function HowItWorks() {
  return (
    <Section id="how" tone="white">
      <SectionHeading title={howItWorks.title} subtitle={howItWorks.subtitle} />
      <div className="relative mt-14">
        {CONNECTORS.map((pos, i) => (
          <motion.div
            key={pos}
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.25 + i * 0.15, ease: EASE_OUT }}
            className={`pointer-events-none absolute top-8 origin-left border-t-2 border-dashed border-accent/50 ${pos}`}
          >
            <ArrowRight size={20} className="absolute -right-1 -top-[9px] text-accent" />
          </motion.div>
        ))}
        <motion.div variants={stagger(0.14)} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid grid-cols-3 gap-10">
          {howItWorks.steps.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="flex flex-col">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent-soft font-display text-2xl font-bold text-accent">
                {s.n}
              </div>
              <h3 className="mt-6 text-center font-display text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-3 text-center text-[15px] leading-relaxed text-ink-2">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={viewportOnce} transition={{ duration: 0.6, ease: EASE_OUT }} className="mt-12 flex justify-center">
        <Button href="/subscribe" size="lg">
          {howItWorks.cta}
          <ArrowRight size={18} />
        </Button>
      </motion.div>
    </Section>
  );
}
