import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Section } from "../primitives/Section";
import { SectionHeading } from "../primitives/SectionHeading";
import { faq } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" tone="white">
      <SectionHeading eyebrow="FAQ" title={faq.title} />
      <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto mt-12 max-w-3xl space-y-3">
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.div key={item.q} variants={fadeUp} className="overflow-hidden rounded-card border border-border bg-white shadow-soft">
              <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-4 px-6 py-5 text-left">
                <span className="text-[15px] font-semibold text-ink">{item.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <Plus size={16} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                    <p className="px-6 pb-5 text-pretty text-sm leading-relaxed text-ink-2">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 16, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={viewportOnce} transition={{ duration: 0.6 }} className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
        {faq.support}
      </motion.p>
    </Section>
  );
}
