import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionHeading } from "../primitives/SectionHeading";
import { SectionCutout } from "../primitives/SectionCutout";
import { StarField } from "../mocks/StarField";
import { CosmicGlow } from "../mocks/CosmicGlow";
import { pricing } from "../../data/content";
import { EASE_OUT, SPRING, viewportOnce } from "../../lib/motion";

function Feature({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-sm text-muted-invert">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20"><Check size={13} className="text-accent-glow" /></span>
      <span>{children}</span>
    </li>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  const p = pricing.premium;
  const price = yearly ? p.yearlyPrice : p.monthlyPrice;
  const note = yearly ? p.yearlyNote : p.monthlyNote;
  return (
    <section id="pricing" className="relative overflow-hidden bg-dark-atmosphere py-20 md:py-28">
      <SectionCutout />
      <StarField />
      <CosmicGlow variant="orbit" className="top-[-120px] opacity-70" />
      <motion.div aria-hidden="true" initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={viewportOnce} transition={{ duration: 1.1, ease: EASE_OUT }} className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <Container className="relative">
        <SectionHeading eyebrow="Pricing" title="Simple pricing that scales with you" tone="dark" />
        <motion.div initial={{ opacity: 0, y: 16, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={viewportOnce} transition={{ duration: 0.55, ease: EASE_OUT }} className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
            {([["monthly", false], ["yearly", true]] as const).map(([label, val]) => (
              <button key={label} onClick={() => setYearly(val)} className="relative rounded-full px-4 py-2 text-sm font-medium">
                {yearly === val && <motion.span layoutId="toggle" transition={SPRING} className="absolute inset-0 rounded-full bg-accent" />}
                <span className={`relative z-10 ${yearly === val ? "text-white" : "text-muted-invert"}`}>{label === "monthly" ? pricing.toggle.monthly : pricing.toggle.yearly}</span>
                {label === "yearly" && <span className={`relative z-10 ml-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${yearly ? "bg-white/25 text-white" : "bg-accent/20 text-accent-glow"}`}>{pricing.toggle.save}</span>}
              </button>
            ))}
          </div>
        </motion.div>
        <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -50, filter: "blur(10px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={viewportOnce} transition={{ duration: 0.8, ease: EASE_OUT }} className="flex h-full flex-col rounded-tile border border-white/10 surface-dark p-8">
            <p className="text-sm font-semibold text-muted-invert">{pricing.free.name}</p>
            <div className="mt-3 flex min-h-[3.5rem] items-end"><p className="font-display text-4xl font-semibold tracking-tight text-ink-invert">{pricing.free.price}</p></div>
            <ul className="mt-7 flex-1 space-y-4 border-t border-white/10 pt-7">
              {pricing.free.features.map((f) => (<Feature key={f}>{f}</Feature>))}
            </ul>
            <Link to="/subscribe" className="mt-8 inline-flex h-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-base font-medium text-ink-invert transition-colors hover:bg-white/10">{pricing.free.cta}</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50, filter: "blur(10px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={viewportOnce} transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.08 }} className="relative h-full">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-3 -z-10 rounded-[38px] opacity-80 blur-2xl" style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.4), transparent)" }} />
            <div className="h-full rounded-tile p-[1.5px] shadow-blue" style={{ background: "linear-gradient(180deg,#3B82F6,#2563EB)" }}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] surface-dark p-8">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-44" style={{ background: "linear-gradient(180deg, rgba(76,155,255,0.12), transparent)" }} />
                <div className="relative flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink-invert">{p.name}</p>
                  <span className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: "linear-gradient(180deg,#3B82F6,#2563EB)" }}>{pricing.popular}</span>
                </div>
                <div className="relative mt-3 flex min-h-[3.5rem] items-end gap-2">
                  <AnimatePresence mode="popLayout">
                    <motion.span key={price} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="font-display text-5xl font-semibold tracking-tight text-ink-invert">{price}</motion.span>
                  </AnimatePresence>
                  <span className="mb-1.5 text-xs text-muted-invert">{note}</span>
                </div>
                <ul className="relative mt-7 flex-1 space-y-4 border-t border-white/10 pt-7">
                  {p.features.map((f) => (<Feature key={f}>{f}</Feature>))}
                </ul>
                <Link to="/subscribe" className="relative mt-8 inline-flex h-14 items-center justify-center rounded-full bg-[linear-gradient(180deg,#3B82F6_0%,#2563EB_100%)] text-base font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20 transition-all hover:brightness-[1.05]">{yearly ? p.ctaYearly : p.ctaMonthly}</Link>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.p initial={{ opacity: 0, filter: "blur(6px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={viewportOnce} transition={{ duration: 0.6, ease: EASE_OUT }} className="mt-8 text-center text-xs text-muted-invert">{pricing.badge}</motion.p>
      </Container>
    </section>
  );
}
