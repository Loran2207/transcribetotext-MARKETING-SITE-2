import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { CountdownBar } from "../components/subscribe/CountdownBar";
import { PromoCode } from "../components/subscribe/PromoCode";
import { PlanCards } from "../components/subscribe/PlanCards";
import { CheckoutModal } from "../components/subscribe/CheckoutModal";
import { DarkFeedback } from "../components/subscribe/DarkFeedback";
import { Guarantee, Benefits, SafeCheckout } from "../components/subscribe/SubscribeSections";
import { Logo } from "../components/primitives/Logo";
import { subscribe } from "../data/subscribe";
import { fadeUp, stagger } from "../lib/motion";

export function SubscribePage() {
  const [selected, setSelected] = useState(1);
  const [open, setOpen] = useState(false);
  const plan = subscribe.plans[selected];
  const legalBody = subscribe.legal.body.replace("{now}", plan.now).replace("{was}", plan.was);
  return (
    <div className="relative min-h-screen bg-canvas">
      <CountdownBar onGetPlan={() => setOpen(true)} />
      <div className="relative z-10 overflow-hidden">
        <div className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-6">
          <div className="flex items-center justify-between">
            <Logo />
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink"><ArrowLeft size={15} /> Back to site</Link>
          </div>
          <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="mt-12 flex flex-col items-center text-center">
            <motion.h1 variants={fadeUp} className="text-balance font-display text-4xl font-semibold tracking-[-0.025em] text-ink sm:text-5xl">{subscribe.heading}</motion.h1>
          </motion.div>
          <PromoCode />
          <PlanCards selected={selected} onSelect={setSelected} />
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted">
            {subscribe.legal.pre}{" "}
            {subscribe.legal.links.map((l, i) => (
              <span key={l}>
                <a href="#" className="font-medium text-accent hover:underline">{l}</a>
                {i < subscribe.legal.links.length - 1 ? (i === subscribe.legal.links.length - 2 ? " and " : ", ") : ". "}
              </span>
            ))}
            {legalBody}
          </p>
          <Guarantee />
          <Benefits />
          <div className="h-16" />
        </div>
      </div>
      <DarkFeedback />
      <div className="bg-canvas">
        <div className="mx-auto w-full max-w-5xl px-4 pb-40 pt-2 sm:px-6">
          <SafeCheckout />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 py-4 backdrop-blur" style={{ boxShadow: "0 -10px 34px rgba(16,24,40,.10)" }}>
        <div className="flex justify-center">
          <motion.button
            onClick={() => setOpen(true)}
            whileTap={{ scale: 0.985 }}
            className="flex h-14 w-full max-w-2xl items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6_0%,#2563EB_100%)] text-base font-semibold text-white shadow-blue ring-1 ring-inset ring-white/25 transition-[filter] hover:brightness-[1.05]"
          >
            {subscribe.continueCta} <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
      <CheckoutModal open={open} onClose={() => setOpen(false)} planIndex={selected} />
    </div>
  );
}
