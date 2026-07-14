import { motion } from "framer-motion";
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
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

const premiumIcons: LucideIcon[] = [InfinityIcon, FilePlus2, Sparkles, Zap];
const freeIcons: LucideIcon[] = [CalendarCheck, Gauge, Hourglass];

function FeatureRow({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon size={22} />
      </span>
      <div className="min-w-0">
        <p className="font-display text-lg font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm text-ink-2">{body}</p>
      </div>
    </div>
  );
}

export function Pricing() {
  const p = pricing.premium;
  return (
    <section id="pricing" className="bg-white py-14 md:py-20">
      <Container>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-center font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          {pricing.title}
        </motion.h2>
        <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto mt-10 grid max-w-5xl grid-cols-1 items-stretch gap-6 md:mt-12 lg:grid-cols-2 lg:gap-8">
          <motion.div variants={fadeUp} className="flex flex-col overflow-hidden rounded-[24px] border border-accent/25 bg-white shadow-card">
            <div className="relative overflow-hidden bg-[linear-gradient(135deg,#3B82F6_0%,#1D4ED8_100%)] px-6 py-8 text-center text-white md:px-8 md:py-9">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.10), transparent 62%)" }} />
              <p className="relative flex items-center justify-center gap-2 text-sm font-semibold text-white/90">
                <Flame size={16} />
                <span>{p.badge}</span>
              </p>
              <p className="relative mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">{p.price}</p>
              <p className="relative mt-3 text-sm font-medium text-white/85">{p.note}</p>
            </div>
            <div className="flex-1 space-y-6 p-6 md:space-y-7 md:p-8">
              {p.features.map((f, i) => (
                <FeatureRow key={f.title} icon={premiumIcons[i]} title={f.title} body={f.body} />
              ))}
            </div>
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <Button size="lg" href="/subscribe" className="w-full">{p.cta}</Button>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col overflow-hidden rounded-[24px] border border-border bg-white shadow-soft">
            <div className="bg-surface-soft px-6 py-8 text-center md:px-8 md:py-9">
              <p className="font-semibold text-ink-2">{pricing.free.name}</p>
              <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">{pricing.free.price}</p>
              <p className="mt-1 font-medium text-ink-2">{pricing.free.priceNote}</p>
            </div>
            <div className="flex-1 space-y-6 p-6 md:space-y-7 md:p-8">
              {pricing.free.features.map((f, i) => (
                <FeatureRow key={f.title} icon={freeIcons[i]} title={f.title} body={f.body} />
              ))}
            </div>
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <Button variant="outline" size="lg" href="/subscribe" className="w-full">{pricing.free.cta}</Button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
