import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Globe } from "lucide-react";
import { Section } from "../primitives/Section";
import { SectionHeading } from "../primitives/SectionHeading";
import { Button } from "../primitives/Button";
import { GoogleG } from "../subscribe/PaymentMarks";
import { languages } from "../../data/content";
import { brand } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

export function Languages() {
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? [...languages.list, ...languages.extra] : languages.list;
  return (
    <Section id="languages" tone="sky">
      <SectionHeading title={languages.title} subtitle={languages.subtitle} />
      <motion.div
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-12 grid max-w-6xl grid-cols-4 gap-5"
      >
        <AnimatePresence initial={false}>
        {list.map((name) => (
          <motion.div key={name} variants={fadeUp}>
            <a
              href="#languages"
              className="group flex items-center gap-3.5 rounded-2xl border border-border bg-white px-5 py-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <img src={brand.langFlags[name]} alt={`${name} flag`} loading="lazy" className="size-10 rounded-full" />
              <span className="flex-1 font-semibold text-ink">{name}</span>
              <ArrowRight size={16} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10 flex flex-col items-center"
      >
        <button type="button" onClick={() => setShowAll((v) => !v)} className="inline-flex items-center gap-2 font-medium text-accent transition hover:text-accent/80">
          <Globe size={16} />
          {showAll ? languages.seeFewer : languages.seeAll}
          <ChevronDown size={16} className={showAll ? "rotate-180 transition-transform" : "transition-transform"} />
        </button>
        <Button href="/subscribe" size="lg" className="mt-6">
          <span className="flex size-6 items-center justify-center rounded-full bg-white"><GoogleG size={14} /></span>
          {languages.cta}
        </Button>
      </motion.div>
    </Section>
  );
}
