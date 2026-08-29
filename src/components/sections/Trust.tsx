import { motion } from "framer-motion";
import { Globe, HardDriveUpload, Users, Video } from "lucide-react";
import { Container } from "../primitives/Container";
import { trust } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS = [Users, Globe, HardDriveUpload, Video];

/* One card carries words rather than a number ("Zoom - Meet - Teams"), so the
   value size follows the value's own length. A single class would either shrink
   the numbers that are the point or push the words onto three lines. */
function valueClass(v: string) {
  if (v.length <= 8) return "text-[28px] leading-none";
  if (v.length <= 14) return "text-[22px] leading-tight";
  return "text-[17px] leading-tight";
}

export function Trust() {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-start gap-3 text-left sm:items-center sm:text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-accent shadow-soft"
          >
            {trust.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-balance font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl md:text-[42px] md:leading-[1.1]"
          >
            {trust.title}
            <span className="block text-ink-2">{trust.subtitle}</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-9 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-border-soft bg-border-soft md:mt-12 lg:grid-cols-4"
        >
          {trust.cards.map((c, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={c.label}
                variants={fadeUp}
                className="flex flex-col items-center bg-tint-sky px-4 py-7 text-center sm:px-5 sm:py-8"
              >
                <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-white text-accent shadow-soft">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <span className={`font-display font-extrabold tracking-[-0.02em] text-ink ${valueClass(c.value)}`}>
                  {c.value}
                </span>
                <span className="mt-2 text-sm font-semibold text-ink">{c.label}</span>
                <span className="mt-1.5 text-pretty text-xs leading-relaxed text-ink-2">{c.body}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
