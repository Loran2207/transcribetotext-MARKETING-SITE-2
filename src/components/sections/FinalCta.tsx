import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { SectionCutout } from "../primitives/SectionCutout";
import { StarField } from "../mocks/StarField";
import { finalCta } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-dark-atmosphere py-16 md:py-24">
      <SectionCutout />
      <StarField />
      <Container className="relative">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto flex max-w-2xl flex-col items-start gap-4 text-left sm:items-center sm:text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-balance font-display text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-ink-invert sm:text-4xl md:text-[46px]"
          >
            {finalCta.titleLine1}
            <span className="block">{finalCta.titleLine2}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-pretty text-base leading-relaxed text-muted-invert md:text-lg">
            {finalCta.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-3 flex flex-col items-start gap-2.5 sm:items-center">
            <Button href="/subscribe" size="lg">
              {finalCta.cta} <ArrowRight size={18} />
            </Button>
            <span className="text-[13px] text-muted-invert">{finalCta.ctaNote}</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
