import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { Target, Languages as LangIcon, Users, Heart, Lock } from "lucide-react";
import { Container } from "../primitives/Container";
import { stats } from "../../data/content";
import { scaleIn, stagger, viewportOnce } from "../../lib/motion";

const ICONS = [Target, LangIcon, Users, Heart, Lock];

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
    <span className="font-display text-4xl font-semibold tracking-tight text-ink md:text-[40px]">
      <span ref={ref}>{m ? n : value}</span><span className="text-accent">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <div className="border-y border-border bg-white">
      <Container>
        <motion.dl variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid grid-cols-2 gap-y-10 py-14 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div key={s.label} variants={scaleIn} className="flex flex-col items-center gap-2 px-2 text-center">
                <span className="text-accent"><Icon size={24} strokeWidth={1.7} /></span>
                <dd><StatValue value={s.value} /></dd>
                <dt className="text-sm text-ink-2">{s.label}</dt>
              </motion.div>
            );
          })}
        </motion.dl>
      </Container>
    </div>
  );
}
