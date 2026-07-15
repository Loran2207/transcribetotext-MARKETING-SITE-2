import { motion } from "framer-motion";
import { BadgeCheck, Crown, Rocket, Smile } from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { StarField } from "../mocks/StarField";
import { finalCta } from "../../data/content";
import { EASE_OUT, blurIn, fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS = [Crown, Rocket, Smile, BadgeCheck];

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-dark-atmosphere py-14 md:py-20">
      <StarField />
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[130px]" />
      <motion.div aria-hidden="true" initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={viewportOnce} transition={{ duration: 1.1, ease: EASE_OUT }} className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <Container className="relative">
        <motion.h2 variants={blurIn} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-balance text-left font-display text-3xl font-extrabold tracking-tight text-white sm:text-center md:text-4xl">
          {finalCta.title}
        </motion.h2>
        <motion.div variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:mt-12 md:gap-10 lg:mt-14 lg:grid-cols-4">
          {finalCta.items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div key={it.title} variants={fadeUp}>
                <Icon strokeWidth={1.5} className="size-10 text-accent-glow sm:mx-auto md:size-12" />
                <h3 className="mt-4 text-left font-display text-lg font-semibold text-white sm:text-center">{it.title}</h3>
                <p className="mt-2 text-left text-sm leading-relaxed text-muted-invert sm:text-center">
                  {it.body}
                  {it.link ? (
                    <>
                      {" "}
                      <a href="#" className="text-accent-glow underline transition-colors hover:text-white">{it.link}</a>
                    </>
                  ) : null}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-10 flex justify-start sm:justify-center md:mt-12">
          <Button size="lg" href="/subscribe" variant="outline" className="border-transparent font-semibold text-accent">{finalCta.cta}</Button>
        </motion.div>
      </Container>
    </section>
  );
}
