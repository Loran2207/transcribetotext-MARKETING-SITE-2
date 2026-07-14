import { motion } from "framer-motion";
import { Waveform } from "../primitives/Waveform";
import { socialProof } from "../../data/content";
import { blurIn, viewportOnce } from "../../lib/motion";

export function SocialProof() {
  return (
    <section className="bg-canvas py-6">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 md:px-10">
        <motion.figure
          variants={blurIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-center gap-5 rounded-[24px] border border-accent/10 bg-accent-soft/60 px-5 py-7 text-accent md:flex-row md:justify-center md:gap-8 md:px-10 md:py-7"
        >
          {/* Phone: the waveform sits above the quote, where there is room for it. */}
          <Waveform bars={16} height={22} color="accent" className="flex h-6 shrink-0 md:hidden" />
          <Waveform bars={9} height={24} color="accent" className="hidden h-6 shrink-0 md:flex" />
          <blockquote className="max-w-3xl text-balance text-center text-base font-medium text-ink md:text-lg">
            {socialProof.quote}
          </blockquote>
          <Waveform bars={9} height={24} color="accent" className="hidden h-6 shrink-0 md:flex" />
          <Waveform bars={16} height={22} color="accent" className="flex h-6 shrink-0 md:hidden" />
        </motion.figure>
      </div>
    </section>
  );
}
