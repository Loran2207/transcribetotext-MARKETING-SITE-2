import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../primitives/Button";
import { hero } from "../../data/content";
import { brand } from "../../data/assets";
import { fadeUp, stagger } from "../../lib/motion";

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="top" className="relative overflow-hidden bg-canvas pt-28 pb-12 md:pt-[120px] md:pb-16">
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show" className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="text-left sm:text-center lg:text-left">
            <motion.h1 variants={fadeUp} className="font-display tracking-tight">
              <span className="block text-3xl font-extrabold leading-none text-accent md:text-4xl lg:whitespace-nowrap lg:text-[54px]">{hero.titleAccent}</span>
              <span className="mt-3 block text-xl font-bold text-ink md:text-2xl lg:text-3xl">{hero.titleRest}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-0 mt-4 max-w-md text-pretty text-base leading-relaxed text-ink-2 sm:mx-auto md:text-lg lg:mx-0 lg:mt-5">
              {hero.subtitle}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Button href="/subscribe" size="lg">{hero.primaryCta} <ArrowRight size={18} /></Button>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="flex justify-center lg:justify-end">
            <motion.img
              src={brand.compareShot}
              alt="Comparison of transcribing now versus with TranscribeToText.AI: time efficiency, accuracy, and speed all rated high"
              className="w-full max-w-[560px] mix-blend-multiply"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
