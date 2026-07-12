import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  FilePlus2,
  Flame,
  Gauge,
  Hourglass,
  Infinity as InfinityIcon,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { pricing } from "../../data/content";
import { fadeUp, stagger, SPRING, viewportOnce } from "../../lib/motion";

const premiumIcons: LucideIcon[] = [InfinityIcon, FilePlus2, Sparkles, Zap];
const freeIcons: LucideIcon[] = [CalendarCheck, Gauge, Hourglass];

function FeatureRow({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon size={22} />
      </span>
      <div>
        <p className="font-display text-lg font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm text-ink-2">{body}</p>
      </div>
    </div>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  const p = pricing.premium;
  const price = yearly ? p.yearlyPrice : p.monthlyPrice;
  const note = yearly ? p.yearlyNote : p.monthlyNote;
  return (
    <section id="pricing" className="bg-white py-20">
      <Container>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-center font-display text-4xl font-extrabold tracking-tight text-ink">
          {pricing.title}
        </motion.h2>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-6 flex items-center justify-center gap-3">
          <span className={yearly ? "text-ink-2" : "font-medium text-ink"}>{pricing.toggle.monthly}</span>
          <button type="button" role="switch" aria-checked={yearly} aria-label="Toggle yearly billing" onClick={() => setYearly((v) => !v)} className="h-7 w-12 rounded-full bg-accent p-1">
            <motion.span animate={{ x: yearly ? 20 : 0 }} transition={SPRING} className="block size-5 rounded-full bg-white shadow-soft" />
          </button>
          <span className={yearly ? "font-medium text-accent" : "text-ink-2"}>{pricing.toggle.yearly}</span>
          <span className="rounded-full bg-deal-soft px-2.5 py-1 text-xs font-bold text-deal">{pricing.toggle.save}</span>
        </motion.div>
        <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto mt-12 grid max-w-5xl grid-cols-2 items-stretch gap-8">
          <motion.div variants={fadeUp} className="flex flex-col overflow-hidden rounded-[24px] border border-accent/25 bg-white shadow-card">
            <div className="relative overflow-hidden bg-[linear-gradient(135deg,#3B82F6_0%,#1D4ED8_100%)] px-8 py-9 text-center text-white">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.10), transparent 62%)" }} />
              <p className="relative flex items-center justify-center gap-2 text-sm font-semibold text-white/90">
                <Flame size={16} />
                <span>{p.badge}</span>
              </p>
              <div className="relative mt-3 flex h-12 items-center justify-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={price} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="font-display text-5xl font-extrabold tracking-tight">
                    {price}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="relative mt-3 flex items-center justify-center gap-2">
                <span className="text-sm font-medium text-white/85">{note}</span>
                {yearly && <span className="rounded-full bg-deal px-2.5 py-1 text-xs font-bold text-white">{pricing.toggle.save}</span>}
              </div>
            </div>
            <div className="flex-1 space-y-7 p-8">
              {p.features.map((f, i) => (
                <FeatureRow key={f.title} icon={premiumIcons[i]} title={f.title} body={f.body} />
              ))}
            </div>
            <div className="px-8 pb-8">
              <Button size="lg" href="/subscribe" className="w-full">{yearly ? p.ctaYearly : p.ctaMonthly}</Button>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col overflow-hidden rounded-[24px] border border-border bg-white shadow-soft">
            <div className="bg-surface-soft px-8 py-9 text-center">
              <p className="font-semibold text-ink-2">{pricing.free.name}</p>
              <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-ink">{pricing.free.price}</p>
              <p className="mt-1 font-medium text-ink-2">{pricing.free.priceNote}</p>
            </div>
            <div className="flex-1 space-y-7 p-8">
              {pricing.free.features.map((f, i) => (
                <FeatureRow key={f.title} icon={freeIcons[i]} title={f.title} body={f.body} />
              ))}
            </div>
            <div className="px-8 pb-8">
              <Button variant="outline" size="lg" href="/subscribe" className="w-full">{pricing.free.cta}</Button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
