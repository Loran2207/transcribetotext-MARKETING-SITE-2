import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { CountdownBar } from "../components/subscribe/CountdownBar";
import { PromoCode } from "../components/subscribe/PromoCode";
import { PlanCards } from "../components/subscribe/PlanCards";
import { CheckoutModal } from "../components/subscribe/CheckoutModal";
import { DarkFeedback } from "../components/subscribe/DarkFeedback";
import { Guarantee, Benefits, SafeCheckout } from "../components/subscribe/SubscribeSections";
import { Logo } from "../components/primitives/Logo";
import { TopWave } from "../components/primitives/TopWave";
import { subscribe } from "../data/subscribe";
import { fadeUp, stagger } from "../lib/motion";

export function SubscribePage() {
  const [selected, setSelected] = useState(1);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  return (
    <div className="relative min-h-screen bg-canvas">
      {/* Top wash + waveform are pinned to the very top of the page, exactly like the
          landing hero, so the wave sits in the same place when you navigate between
          the two pages. The countdown bar floats over it the way the nav does on the
          landing page. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[540px] bg-hero-wash" />
      <TopWave />
      <CountdownBar onGetPlan={() => setOpen(true)} />
      <div className="relative z-10 overflow-hidden bg-grid-lines-fine">
        <div className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-6">
          <div className="flex items-center justify-between">
            <Logo />
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink"><ArrowLeft size={15} /> Back to site</Link>
          </div>
          <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="mt-12 flex flex-col items-center text-center">
            <motion.h1 variants={fadeUp} className="text-balance font-display text-4xl font-semibold tracking-[-0.025em] text-ink sm:text-5xl">{subscribe.heading}</motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-md text-pretty text-lg text-ink-2">{subscribe.subheading}</motion.p>
          </motion.div>
          <PromoCode />
          <PlanCards selected={selected} onSelect={setSelected} />
          <Guarantee />
          <Benefits />
          <div className="h-16" />
        </div>
      </div>
      <DarkFeedback />
      <div className="bg-canvas">
        <div className="mx-auto w-full max-w-5xl px-4 pb-32 pt-10 sm:px-6">
          <SafeCheckout />
        </div>
      </div>
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
        <motion.button
          onClick={() => setOpen(true)}
          initial={reduce ? undefined : { y: 24, opacity: 0 }}
          animate={reduce ? undefined : { y: [0, -5, 0], opacity: 1 }}
          transition={reduce ? undefined : { y: { duration: 3.4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="pointer-events-auto inline-flex h-14 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-9 text-base font-semibold text-white ring-1 ring-inset ring-white/25 transition-[filter] hover:brightness-[1.06]"
          style={{ boxShadow: "0 14px 44px rgba(37,99,235,0.55), 0 2px 8px rgba(37,99,235,0.4)" }}
        >
          {subscribe.cta} <ArrowRight size={18} />
        </motion.button>
      </div>
      <CheckoutModal open={open} onClose={() => setOpen(false)} planIndex={selected} />
    </div>
  );
}
