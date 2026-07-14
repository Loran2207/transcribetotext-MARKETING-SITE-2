import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Globe } from "lucide-react";
import { Section } from "../primitives/Section";
import { SectionHeading } from "../primitives/SectionHeading";
import { Button } from "../primitives/Button";
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
        className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:mt-10 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 lg:gap-5"
      >
        <AnimatePresence initial={false}>
        {list.map((name) => (
          <motion.div key={name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <a
              href="#languages"
              className="group flex items-center gap-2 rounded-2xl border border-border bg-white px-3 py-3 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card sm:gap-3 sm:px-4 sm:py-3.5 lg:gap-3.5 lg:px-5 lg:py-4"
            >
              <img src={brand.langFlags[name]} alt={`${name} flag`} loading="lazy" className="size-8 shrink-0 rounded-full sm:size-9 lg:size-10" />
              <span className="flex-1 font-semibold text-ink max-sm:text-sm">{name}</span>
              <ArrowRight size={16} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-accent max-sm:hidden" />
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
        className="mt-8 flex flex-col items-center lg:mt-10"
      >
        <button type="button" onClick={() => setShowAll((v) => !v)} className="inline-flex items-center gap-2 font-medium text-accent transition hover:text-accent/80 max-lg:min-h-11 max-lg:px-2">
          <Globe size={16} />
          {showAll ? languages.seeFewer : languages.seeAll}
          <ChevronDown size={16} className={showAll ? "rotate-180 transition-transform" : "transition-transform"} />
        </button>
        <Button href="/subscribe" size="lg" className="mt-6">
          {languages.cta}
        </Button>
      </motion.div>
    </Section>
  );
}
