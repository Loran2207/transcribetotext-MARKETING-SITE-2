import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "../primitives/Container";
import { Stars } from "../primitives/Stars";
import { testimonials } from "../../data/content";
import { brand } from "../../data/assets";
import { fadeUp, scaleIn, stagger, viewportOnce } from "../../lib/motion";

const NUM_TOKEN = /^\d+\+?$/;

// Renders a copy string with its numeric tokens ("300+") bolded, live-style.
function BoldNumbers({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\d+\+?)/).map((part, i) =>
        NUM_TOKEN.test(part) ? (
          <b key={i} className="font-semibold text-ink">{part}</b>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function Testimonials() {
  const [showMore, setShowMore] = useState(false);
  const items = showMore ? [...testimonials.items, ...testimonials.more] : testimonials.items;
  return (
    <section id="reviews" className="bg-white py-14 md:py-20">
      <Container>
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-left sm:text-center">
          <motion.h2 variants={fadeUp} className="text-balance font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            {testimonials.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 flex flex-wrap items-center justify-start gap-2 text-base text-ink-2 sm:justify-center md:text-lg">
            <span>{testimonials.ratingPrefix}</span>
            <b className="font-semibold text-ink">{testimonials.rating}</b>
            <Stars count={5} />
            <span><BoldNumbers text={testimonials.ratingSuffix} /></span>
          </motion.p>
        </motion.div>
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          <AnimatePresence initial={false}>
          {items.map((t) => (
            <motion.figure
              key={t.user}
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center rounded-[24px] border border-border-soft bg-surface-soft px-6 py-7 text-center transition hover:-translate-y-0.5 hover:shadow-card md:px-7 md:py-8"
            >
              <img src={brand.avatars[t.avatar]} alt="" className="size-20 rounded-full object-cover shadow-soft ring-4 ring-white" />
              <Stars count={5} className="mt-4" />
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{t.title}</h3>
              <blockquote className="mt-2 text-[15px] leading-relaxed text-ink-2">{t.quote}</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-ink">{t.user}</figcaption>
            </motion.figure>
          ))}
          </AnimatePresence>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-10 flex justify-center md:mt-12">
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className="inline-flex h-14 max-w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border bg-white px-6 text-base font-medium text-ink shadow-soft transition-all hover:border-accent/40 hover:bg-surface-soft md:px-8"
          >
            {showMore ? testimonials.ctaLess : testimonials.cta}
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
