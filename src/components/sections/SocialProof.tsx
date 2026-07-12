import { motion } from "framer-motion";
import { Waveform } from "../primitives/Waveform";
import { socialProof } from "../../data/content";
import { blurIn, viewportOnce } from "../../lib/motion";

export function SocialProof() {
  return (
    <section className="bg-canvas py-6">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <motion.figure
          variants={blurIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex items-center justify-center gap-8 rounded-[24px] border border-accent/10 bg-accent-soft/60 px-10 py-7 text-accent"
        >
          <Waveform bars={9} height={24} color="accent" className="h-6 shrink-0" />
          <blockquote className="max-w-3xl text-balance text-center text-lg font-medium text-ink">
            {socialProof.quote}
          </blockquote>
          <Waveform bars={9} height={24} color="accent" className="h-6 shrink-0" />
        </motion.figure>
      </div>
    </section>
  );
}
