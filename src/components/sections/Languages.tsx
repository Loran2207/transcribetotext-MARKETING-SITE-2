import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { languages } from "../../data/content";
import { brand } from "../../data/assets";
import { fadeUp, scaleIn, stagger, viewportOnce } from "../../lib/motion";

/* The brief asks for this block to take less room: the language names go and
   the flags stay. A flag on its own is a puzzle for anyone who does not know it,
   so every circle still carries its language name for a pointer and for a
   screen reader - the name is hidden, not thrown away. */
export function Languages() {
  const [all, setAll] = useState(false);
  const shown = all ? [...languages.list, ...languages.extra] : languages.list;

  return (
    <section id="languages" className="border-t border-border-soft bg-white py-12 md:py-16">
      <Container>
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-start gap-2.5 text-left sm:items-center sm:text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-2xl font-semibold tracking-[-0.025em] text-ink sm:text-3xl"
          >
            {languages.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl text-pretty text-sm leading-relaxed text-ink-2">
            {languages.subtitle}
          </motion.p>
        </motion.div>

        <motion.ul
          variants={stagger(0.03)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-7 flex flex-wrap items-center justify-start gap-2.5 sm:justify-center sm:gap-3"
        >
          {shown.map((name) => (
            <motion.li key={name} variants={scaleIn} title={name}>
              <img
                src={brand.langFlags[name]}
                alt={name}
                className="size-10 rounded-full bg-white object-cover shadow-card ring-2 ring-white sm:size-11"
              />
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
          <Button href="/subscribe">{languages.cta}</Button>
        </div>
      </Container>
    </section>
  );
}
