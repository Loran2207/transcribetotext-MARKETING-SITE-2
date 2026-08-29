import { motion } from "framer-motion";
import { Download, Languages, ListChecks, Search, Sparkles, Users } from "lucide-react";
import { Section } from "../primitives/Section";
import { SectionHeading } from "../primitives/SectionHeading";
import { productValue } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS: Record<string, typeof Sparkles> = {
  summary: Sparkles,
  speakers: Users,
  actions: ListChecks,
  translate: Languages,
  search: Search,
  export: Download,
};

/* V1's card voice: white card, real shadow, and the icon as a blue gradient
   app-tile - the one accent that makes the grid read as rich rather than flat. */
export function ProductValue() {
  return (
    <Section id="premium" tone="white">
      <SectionHeading title={productValue.title} />
      <motion.ul
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-6"
      >
        {productValue.cards.map((c) => {
          const Icon = ICONS[c.key];
          return (
            <motion.li
              key={c.key}
              variants={fadeUp}
              className="rounded-[20px] border border-border bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <span className="shadow-blue flex size-11 items-center justify-center rounded-xl bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-white">
                <Icon size={20} strokeWidth={1.9} />
              </span>
              <p className="mt-5 text-[13px] font-semibold text-accent">{c.name}</p>
              <p className="mt-1.5 font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">{c.claim}</p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-2">{c.body}</p>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
}
