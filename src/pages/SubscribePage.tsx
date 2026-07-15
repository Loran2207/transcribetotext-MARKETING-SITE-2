import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { CountdownBar } from "../components/subscribe/CountdownBar";
import { PromoCode } from "../components/subscribe/PromoCode";
import { PlanCards } from "../components/subscribe/PlanCards";
import { CheckoutModal } from "../components/subscribe/CheckoutModal";
import { DarkFeedback } from "../components/subscribe/DarkFeedback";
import { Guarantee, Benefits, SafeCheckout } from "../components/subscribe/SubscribeSections";
import { PAYWALL_HEADING } from "../components/subscribe/headings";
import { subscribe } from "../data/subscribe";
import { fadeUp, stagger } from "../lib/motion";

export function SubscribePage() {
  const { search } = useLocation();
  // ?checkout=open / ?checkout=error open the dialog directly (used for mockups).
  const initial = useMemo(() => {
    const p = new URLSearchParams(search).get("checkout");
    return { open: p === "open" || p === "error", error: p === "error" };
  }, [search]);
  const [selected, setSelected] = useState(1);
  const [open, setOpen] = useState(initial.open);
  const plan = subscribe.plans[selected];
  const legalBody = subscribe.legal.body.replace("{now}", plan.now).replace("{was}", plan.was);
  return (
    <div className="relative min-h-screen bg-canvas">
      <CountdownBar onGetPlan={() => setOpen(true)} />
      <div className="relative z-10 overflow-hidden">
        <div className="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-6 md:pt-12">
          <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="flex flex-col items-center text-center">
            <motion.h1 variants={fadeUp} className={PAYWALL_HEADING}>{subscribe.heading}</motion.h1>
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
          <div className="h-10 md:h-16" />
        </div>
      </div>
      <DarkFeedback />
      <div className="bg-canvas">
        {/* pb clears the fixed Continue bar (h-14 button + py-4 = 89px tall). */}
        <div className="mx-auto w-full max-w-5xl px-4 pb-32 pt-2 sm:px-6 md:pb-40">
          <SafeCheckout />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 py-3 backdrop-blur md:py-4" style={{ boxShadow: "0 -10px 34px rgba(16,24,40,.10)" }}>
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
      <CheckoutModal open={open} onClose={() => setOpen(false)} planIndex={selected} forceError={initial.error} />
    </div>
  );
}
