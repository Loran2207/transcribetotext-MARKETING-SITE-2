import { motion } from "framer-motion";
import { Section } from "../primitives/Section";
import { SectionHeading } from "../primitives/SectionHeading";
import { Button } from "../primitives/Button";
import { LangRow } from "../mocks/LangRow";
import { Globe3D } from "../mocks/Globe3D";
import { languages } from "../../data/content";
import { fadeLeft, fadeRight, fadeUp, stagger, viewportOnce } from "../../lib/motion";

const half = Math.ceil(languages.list.length / 2);
const row1 = languages.list.slice(0, half);
const row2 = languages.list.slice(half);
const MASK = "linear-gradient(to right, transparent, black 10%, black 90%, transparent)";

export function Languages() {
  return (
    <Section id="languages" tone="white" className="relative overflow-hidden">
      <SectionHeading eyebrow={`${languages.count} languages`} title={languages.title} subtitle={languages.subtitle} />
      <div className="relative mt-10">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[62%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 sm:h-[820px] sm:w-[820px]">
          <Globe3D />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[52%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[80px]" />
        <motion.div variants={stagger(0.14)} initial="hidden" whileInView="show" viewport={viewportOnce} className="relative flex flex-col gap-4 overflow-hidden py-6" style={{ WebkitMaskImage: MASK, maskImage: MASK }}>
          <motion.div variants={fadeRight}><LangRow items={row1} /></motion.div>
          <motion.div variants={fadeLeft}><LangRow items={row2} reverse /></motion.div>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="relative mt-8 flex justify-center">
          <Button href="#" variant="outline" size="md">{languages.cta}</Button>
        </motion.div>
        <div aria-hidden="true" className="h-44 sm:h-72" />
      </div>
    </Section>
  );
}
