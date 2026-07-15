import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AudioLines, Video, Users, CloudUpload, ArrowRight } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionHeading } from "../primitives/SectionHeading";
import { Button } from "../primitives/Button";
import { transcriptionServices as S } from "../../data/content";
import { brand } from "../../data/assets";
import { EASE_OUT, fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS = [AudioLines, Video, Users, CloudUpload];

export function TranscriptionServices() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = S.tabs.length;
  const t = S.tabs[active];

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-14 md:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <SectionHeading title={S.title} />

        <motion.div variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-8 grid grid-cols-2 gap-3 lg:mt-10 lg:flex">
          {S.tabs.map((tab, i) => {
            const Icon = ICONS[i];
            const on = i === active;
            return (
              <motion.button
                key={tab.key}
                type="button"
                variants={fadeUp}
                aria-pressed={on}
                onClick={() => setActive(i)}
                className={`relative flex min-h-16 flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl border px-3 py-2 text-sm font-medium transition lg:h-16 lg:gap-2.5 lg:p-0 lg:text-base ${on ? "border-accent bg-white text-accent shadow-soft" : "border-transparent bg-surface-soft text-ink-2 hover:text-ink"}`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="text-center leading-tight">{tab.tab}</span>
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-accent/10" />
                {on && !reduce && (
                  <span
                    key={active}
                    aria-hidden="true"
                    onAnimationEnd={() => setActive((a) => (a + 1) % n)}
                    style={{ animationName: "tabProgress", animationDuration: `${S.autoMs}ms`, animationTimingFunction: "linear", animationFillMode: "forwards", animationPlayState: paused ? "paused" : "running" }}
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-10 grid items-center gap-10 lg:mt-12 lg:min-h-[440px] lg:gap-14 lg:grid-cols-2">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.key}
                initial={{ opacity: 0, x: reduce ? 0 : -20, filter: reduce ? "blur(0px)" : "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: reduce ? 0 : 20, filter: reduce ? "blur(0px)" : "blur(6px)" }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
              >
                {/* One line, trailing word in accent (like the live site). The reserved
                    height keeps the block still when a heading wraps to two lines. */}
                <h3 className="flex items-start justify-start text-left font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:justify-center sm:text-center md:text-4xl lg:justify-start lg:text-left lg:text-[42px]">
                  <span className="text-balance">
                    <span className="text-ink">{t.lead}</span>{" "}
                    <span className="text-accent">{t.accent}</span>
                  </span>
                </h3>
                <p className="mx-0 mt-4 max-w-md text-pretty text-left text-base leading-relaxed text-ink-2 sm:mx-auto sm:text-center md:text-lg lg:mx-0 lg:text-left">
                  {t.desc.map((part, i) =>
                    part.b ? (
                      <strong key={i} className="font-bold text-ink">{part.t}</strong>
                    ) : (
                      <span key={i}>{part.t}</span>
                    )
                  )}
                </p>
                <div className="mt-6 flex justify-start sm:justify-center lg:justify-start">
                  <Button size="lg" href="/subscribe">
                    {t.cta} <ArrowRight size={18} />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.key}
                initial={{ opacity: 0, x: reduce ? 0 : 24, filter: reduce ? "blur(0px)" : "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: reduce ? 0 : -24, filter: reduce ? "blur(0px)" : "blur(8px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="rounded-[20px] border border-border bg-white p-3 shadow-lift"
              >
                <img src={brand.serviceShots[t.key]} alt={t.tab} className="h-auto w-full rounded-[12px]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
