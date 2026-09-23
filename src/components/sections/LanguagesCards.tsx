import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Globe } from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { languages } from "../../data/content";
import { brand } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";
import { SECTION_TITLE } from "../../lib/typography";

/* The languages as cards - flag, name, arrow - the shape the live site has
   (Kirill, round 25). It stands beside the flag-only block rather than
   replacing it, so both readings of the section can be compared side by side.
   Four across on desktop, three on tablet, two on phones, where the arrow goes
   so the longest name still fits on one line.

   Each card animates on mount rather than through the list's variants: the
   eight cards that "See all" adds arrive after the list has already played its
   reveal, and children added then would stay at their hidden state. */
export function LanguagesCards() {
  const [all, setAll] = useState(false);
  const shown = all ? [...languages.list, ...languages.extra] : languages.list;

  return (
    <section id="languages-cards" className="border-t border-border-soft bg-surface-soft py-12 md:py-16">
      <Container>
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-start gap-3 text-left sm:items-center sm:text-center"
        >
          <motion.h2 variants={fadeUp} className={`text-ink ${SECTION_TITLE}`}>
            {languages.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl text-pretty text-[15px] leading-relaxed text-ink-2">
            {languages.subtitle}
          </motion.p>
        </motion.div>

        <motion.ul
          variants={stagger(0.03)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"
        >
          {shown.map((name) => (
            <motion.li key={name} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <a
                href="/subscribe"
                className="group flex h-14 items-center gap-2.5 rounded-2xl border border-border bg-white px-3 shadow-soft transition hover:border-accent/40 hover:shadow-card sm:h-16 sm:gap-3.5 sm:px-4 lg:h-[74px] lg:px-5"
              >
                <img src={brand.langFlags[name]} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-black/5 sm:size-9 lg:size-10" />
                <span className="min-w-0 flex-1 text-[13px] font-semibold leading-tight text-ink sm:text-[15px]">{name}</span>
                <ArrowRight size={16} className="hidden shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent sm:block" />
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-6 flex flex-col items-start gap-4 sm:items-center">
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent transition hover:text-accent-dark"
          >
            <Globe size={14} />
            {all ? languages.seeFewer : languages.seeAll}
            <ChevronDown size={14} className={all ? "rotate-180 transition" : "transition"} />
          </button>
          <Button href="/subscribe" size="lg">{languages.cta}</Button>
        </div>
      </Container>
    </section>
  );
}
