import { motion } from "framer-motion";
import { Check, Flame } from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { pricing } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

export function Pricing() {
  const p = pricing.premium;
  const f = pricing.free;
  return (
    <section id="pricing" className="bg-white py-14 md:py-20">
      <Container>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-balance text-left font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-center sm:text-4xl md:text-[42px]"
        >
          {pricing.title}
        </motion.h2>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-9 grid max-w-5xl grid-cols-1 items-stretch gap-6 md:mt-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-8"
        >
          {/* Premium */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col overflow-hidden rounded-[24px] border border-accent/25 bg-white shadow-card"
          >
            <div className="relative overflow-hidden bg-[linear-gradient(135deg,#3B82F6_0%,#1D4ED8_100%)] px-6 py-8 text-center text-white md:px-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.10), transparent 62%)" }}
              />
              <p className="relative inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                <Flame size={13} />
                {p.badge}
              </p>
              <p className="relative mt-4 flex items-baseline justify-center gap-2">
                <span className="text-sm font-medium text-white/80">{p.priceFrom}</span>
                <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.03em] sm:text-[52px]">{p.price}</span>
                <span className="text-base font-semibold text-white/85">{p.priceUnit}</span>
              </p>
              <p className="relative mt-3 text-[13px] font-medium text-white/85">{p.note}</p>
            </div>

            <ul className="flex-1 grid gap-x-6 gap-y-3.5 p-6 sm:grid-cols-2 md:p-8">
              {p.features.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[15px] leading-snug text-ink-2">
                  <span className="mt-[2px] flex size-[18px] shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <Button size="lg" href="/subscribe" className="w-full">
                {p.cta}
              </Button>
            </div>
          </motion.div>

          {/* Free */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col overflow-hidden rounded-[24px] border border-border bg-white shadow-soft"
          >
            <div className="bg-surface-soft px-6 py-8 text-center md:px-8">
              <p className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-ink-2">
                {f.badge}
              </p>
              <p className="mt-4 font-display text-[32px] font-extrabold leading-none tracking-[-0.02em] text-ink sm:text-[38px]">
                {f.price}
              </p>
            </div>

            <div className="flex-1 space-y-5 p-6 md:space-y-6 md:p-8">
              {f.features.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <span className="mt-[2px] flex size-[18px] shrink-0 items-center justify-center rounded-full bg-surface-soft text-muted">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[15px] font-bold text-ink">{b.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <Button variant="outline" size="lg" href="/subscribe" className="w-full">
                {f.cta}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
