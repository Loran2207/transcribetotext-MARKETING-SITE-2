import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { Sparkles, ThumbsUp, Globe, ShieldCheck, Users } from "lucide-react";
import { Container } from "../primitives/Container";
import { stats } from "../../data/content";
import { scaleIn, stagger, viewportOnce } from "../../lib/motion";

const ICONS = [Sparkles, ThumbsUp, Globe, ShieldCheck, Users];

function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? parseInt(m[1], 10) : 0;
  const suffix = m ? m[2] : "";
  const [n, setN] = useState(reduce ? target : 0);
  useEffect(() => {
    if (!m || reduce || !inView) return;
    const c = animate(0, target, { duration: 1.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, target]);
  return (
    <span className="font-display text-4xl font-extrabold tracking-tight text-ink">
      <span ref={ref}>{m ? n : value}</span>{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section id="features" className="bg-white py-14 md:py-16">
      <Container>
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-6"
        >
          {stats.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={s.label}
                variants={scaleIn}
                className={`relative mt-7 rounded-[24px] border border-border-soft bg-surface-soft px-4 pb-6 pt-12 text-center ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <span className="shadow-blue absolute -top-7 left-1/2 flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-white">
                  <Icon size={24} strokeWidth={1.9} />
                </span>
                <div><StatValue value={s.value} /></div>
                <div className="mt-1 text-sm text-ink-2">{s.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
