import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section } from "../primitives/Section";
import { SectionHeading } from "../primitives/SectionHeading";
import { faq } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section id="faq" tone="white">
      <SectionHeading title={faq.title} />
      <motion.div variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto mt-12 max-w-3xl space-y-4">
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.div key={item.q} variants={fadeUp} className={`rounded-2xl border bg-white px-6 transition ${isOpen ? "border-accent/40 shadow-soft" : "border-border hover:border-accent/30"}`}>
              <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium text-ink">
                <span>{item.q}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-accent">
                  <ChevronDown size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                    <p className="pb-5 text-[15px] leading-relaxed text-ink-2">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto mt-10 max-w-2xl text-center">
        <h3 className="font-display text-xl font-semibold text-ink">{faq.supportTitle}</h3>
        <p className="mt-2 text-ink-2">
          {faq.support}{" "}
          <a href={`mailto:${faq.supportEmail}`} className="font-medium text-accent">
            {faq.supportEmail}
          </a>
        </p>
      </motion.div>
    </Section>
  );
}
