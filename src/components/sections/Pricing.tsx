import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionHeading } from "../primitives/SectionHeading";
import { SectionCutout } from "../primitives/SectionCutout";
import { StarField } from "../mocks/StarField";
import { CosmicGlow } from "../mocks/CosmicGlow";
import { pricing } from "../../data/content";
import { EASE_OUT, viewportOnce } from "../../lib/motion";

/* V1's pricing surface, carrying the brief's content: the dark band with the
   starfield, the Premium card wrapped in the blue glow frame, the Free card
   quiet beside it. This is the block Kirill said he did not want to buy from
   in the flat version - V1's is the one he called beautiful. */

function Feature({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-muted-invert">
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/20">
        <Check size={13} className="text-accent-glow" />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Pricing() {
  const p = pricing.premium;
  const f = pricing.free;
  return (
    <section id="pricing" className="relative overflow-hidden bg-dark-atmosphere py-20 md:py-28">
      <SectionCutout />
      <StarField />
      <CosmicGlow variant="orbit" className="top-[-120px] opacity-70" />
      <motion.div
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.1, ease: EASE_OUT }}
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-white/12 to-transparent"
      />
      <Container className="relative">
        <SectionHeading
          title={
            <>
              <span className="block">{pricing.titleLine1}</span>
              {pricing.titleLine2}
            </>
          }
          tone="dark"
        />

        <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-6 md:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
          {/* Premium leads: the glow frame is what says "this is the one". */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="relative h-full"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 -z-10 rounded-[38px] opacity-80 blur-2xl"
              style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.4), transparent)" }}
            />
            <div className="h-full rounded-tile p-[1.5px] shadow-blue" style={{ background: "linear-gradient(180deg,#3B82F6,#2563EB)" }}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] surface-dark p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-44"
                  style={{ background: "linear-gradient(180deg, rgba(76,155,255,0.12), transparent)" }}
                />
                <div className="relative flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink-invert">{p.badge}</p>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: "linear-gradient(180deg,#3B82F6,#2563EB)" }}
                  >
                    Most popular
                  </span>
                </div>
                <div className="relative mt-4 flex items-end gap-2">
                  <span className="mb-2 text-[11px] font-bold tracking-[0.08em] text-muted-invert">{p.priceFrom}</span>
                  <span className="font-display text-[52px] font-semibold leading-none tracking-tight text-ink-invert">{p.price}</span>
                  <span className="mb-1.5 text-sm font-medium text-muted-invert">{p.priceUnit}</span>
                </div>
                <p className="relative mt-2.5 text-[13px] text-muted-invert">{p.note}</p>
                <ul className="relative mt-7 grid flex-1 gap-x-6 gap-y-3.5 border-t border-white/10 pt-7 sm:grid-cols-2">
                  {p.features.map((b) => (
                    <Feature key={b}>{b}</Feature>
                  ))}
                </ul>
                <Link
                  to="/subscribe"
                  className="relative mt-8 inline-flex h-14 items-center justify-center rounded-full bg-[linear-gradient(180deg,#3B82F6_0%,#2563EB_100%)] text-base font-semibold tracking-[0.04em] text-white shadow-blue ring-1 ring-inset ring-white/20 transition-all hover:brightness-[1.05]"
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Free: present, honest, quiet. */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.08 }}
            className="flex h-full flex-col rounded-tile border border-white/10 surface-dark p-8"
          >
            <p className="text-sm font-semibold text-muted-invert">{f.badge}</p>
            <div className="mt-4 flex min-h-[52px] items-end">
              <p className="font-display text-4xl font-semibold tracking-tight text-ink-invert">{f.price}</p>
            </div>
            <div className="mt-7 flex-1 space-y-5 border-t border-white/10 pt-7">
              {f.features.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/10">
                    <Check size={13} className="text-muted-invert" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink-invert">{b.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-invert">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/subscribe"
              className="mt-8 inline-flex h-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-base font-medium tracking-[0.04em] text-ink-invert transition-colors hover:bg-white/10"
            >
              {f.cta}
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
