import { motion } from "framer-motion";
import { Infinity as InfinityIcon, Timer, SmilePlus, Link2, PlaySquare, FileOutput } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionHeading } from "../primitives/SectionHeading";
import { premiumFeatures } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS = [InfinityIcon, Timer, SmilePlus, Link2, PlaySquare, FileOutput];

export function Features() {
  return (
    <section id="premium" className="bg-white py-20">
      <Container>
        <SectionHeading title={premiumFeatures.title} />
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-16 gap-y-12"
        >
          {premiumFeatures.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div key={item.title} variants={fadeUp} className="flex items-start gap-5">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon size={26} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink-2">{item.body}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
