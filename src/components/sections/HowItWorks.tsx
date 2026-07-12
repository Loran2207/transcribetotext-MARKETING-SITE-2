import { motion } from "framer-motion";
import { Upload, Languages as LangIcon, FileCheck2 } from "lucide-react";
import { Section } from "../primitives/Section";
import { SectionHeading } from "../primitives/SectionHeading";
import { Button } from "../primitives/Button";
import { howItWorks } from "../../data/content";
import { EASE_OUT, fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS = [Upload, LangIcon, FileCheck2];

export function HowItWorks() {
  return (
    <Section id="how" tone="white">
      <SectionHeading eyebrow="How it works" title={howItWorks.title} subtitle={howItWorks.subtitle} />
      <div className="relative mt-14">
        <motion.div aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={viewportOnce} transition={{ duration: 1, ease: EASE_OUT }} className="pointer-events-none absolute inset-x-0 top-10 hidden h-px origin-left bg-gradient-to-r from-transparent via-accent/25 to-transparent md:block" />
        <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid gap-12 md:grid-cols-3 md:gap-8">
          {howItWorks.steps.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div key={s.n} variants={fadeUp} className="relative flex flex-col items-center text-center">
                <div className="relative grid h-20 w-20 place-items-center rounded-3xl border border-border bg-white text-accent shadow-soft">
                  <Icon size={30} strokeWidth={1.6} />
                  <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-semibold text-white shadow-blue">{s.n}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-3 max-w-sm text-pretty leading-relaxed text-ink-2">{s.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={viewportOnce} transition={{ duration: 0.6, ease: EASE_OUT }} className="mt-14 flex justify-center">
        <Button href="#pricing" size="lg">{howItWorks.cta}</Button>
      </motion.div>
    </Section>
  );
}
