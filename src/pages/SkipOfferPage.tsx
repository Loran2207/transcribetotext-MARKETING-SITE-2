import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Crown, Check, ArrowRight } from "lucide-react";
import { Logo } from "../components/primitives/Logo";
import { subscribe } from "../data/subscribe";
import { fadeUp, stagger } from "../lib/motion";

export function SkipOfferPage() {
  const navigate = useNavigate();
  const offer = subscribe.skipOffer;
  return (
    <div className="relative min-h-screen bg-canvas">
      <section
        className="relative min-h-screen"
        style={{ background: "radial-gradient(80% 60% at 50% -10%, #EAF1FE 0%, rgba(234,241,254,0) 70%)" }}
      >
        <div className="relative mx-auto w-full max-w-3xl px-5 pt-6 sm:px-6">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
          <Link
            to="/"
            className="absolute right-5 top-6 whitespace-nowrap text-sm text-muted transition-colors hover:text-ink-2 sm:right-6"
          >
            {offer.dismiss}
          </Link>
        </div>

        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-[640px] px-5 pb-44 pt-10 text-center sm:px-6 md:pt-14"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <span className="grid size-20 place-items-center rounded-full bg-accent-soft">
              <Crown className="size-10 text-accent" strokeWidth={2} />
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-balance font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] md:text-4xl lg:text-[44px]"
          >
            <span className="block text-ink">{offer.heading}</span>
            <span className="block text-accent">{offer.headingAccent}</span>
            <span className="block text-ink">{offer.headingRest}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-2">
            {offer.body}
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-xl text-base font-medium leading-relaxed text-ink-2">
            {offer.bodyDeal}
          </motion.p>

          <motion.h2 variants={fadeUp} className="mt-9 font-display text-lg font-semibold text-ink md:text-xl">
            {offer.listTitle}
          </motion.h2>

          <motion.ul variants={stagger(0.07)} className="mx-auto mt-5 flex w-fit flex-col items-start gap-3">
            {offer.list.map((item) => (
              <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-left">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-trust text-white">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="font-medium text-ink">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p variants={fadeUp} className="mt-8 font-semibold text-trust">
            {offer.urgency}
          </motion.p>
        </motion.div>
      </section>

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 py-3 backdrop-blur md:py-4"
        style={{ boxShadow: "0 -10px 34px rgba(16,24,40,.10)" }}
      >
        <div className="flex justify-center">
          <motion.button
            onClick={() => navigate("/subscribe")}
            whileTap={{ scale: 0.985 }}
            className="flex h-14 w-full max-w-2xl items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6_0%,#2563EB_100%)] text-base font-semibold text-white shadow-blue ring-1 ring-inset ring-white/25 transition-[filter] hover:brightness-[1.05]"
          >
            {offer.cta}
            <ArrowRight className="size-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
