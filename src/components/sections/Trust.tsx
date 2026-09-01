import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { FileUp, Globe, Users, Video } from "lucide-react";
import { Container } from "../primitives/Container";
import { trust } from "../../data/content";
import { platform } from "../../data/assets";
import { fadeUp, scaleIn, stagger, viewportOnce } from "../../lib/motion";

/* V1's stat band: no boxes, no plates - big numbers with the accent on the
   suffix, hairline top and bottom on plain white. The fourth column is not a
   number, it is the three places a meeting happens, so it shows their real
   marks instead of pretending to be a figure. */

function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? parseInt(m[1], 10) : 0;
  const suffix = m ? m[2] : "";
  /* V1's accent-on-the-suffix trick works for "K+" and "%"; painting a whole
     phrase like " hrs / 5GB" blue turned a unit into a slogan. A long suffix
     stays ink, one step smaller, so the number still leads. */
  const shortSuffix = suffix.trim().length <= 3;
  const [n, setN] = useState(reduce ? target : 0);
  useEffect(() => {
    if (!m || reduce || !inView) return;
    const c = animate(0, target, { duration: 1.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, target]);
  return (
    <span className="font-display text-4xl font-bold tracking-tight text-ink md:text-[40px]">
      <span ref={ref}>{m ? n : value}</span>
      {shortSuffix ? (
        <span className="text-accent">{suffix}</span>
      ) : (
        <span className="text-[0.62em] font-semibold text-ink-2">{suffix}</span>
      )}
    </span>
  );
}

const MEETING_MARKS = ["Zoom", "Google Meet", "Microsoft Teams"];
const CARD_ICONS = [Users, Globe, FileUp, Video];

/* The brief's own reference for this block: one white card carrying the four
   columns, thin vertical dividers between them, and an icon in a soft round
   coin above each figure. */
export function Trust() {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-accent shadow-soft"
          >
            {trust.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-balance font-display text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl md:text-[40px] md:leading-[1.1]"
          >
            {trust.title}
            <span className="block text-ink-2">{trust.subtitle}</span>
          </motion.h2>
        </motion.div>

        <motion.dl
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-y-8 rounded-tile border border-border bg-white py-8 shadow-card md:mt-12 lg:grid-cols-4 lg:py-9"
        >
          {trust.cards.map((c, i) => {
            const Icon = CARD_ICONS[i];
            return (
              <motion.div
                key={c.label}
                variants={scaleIn}
                className={`flex flex-col items-center gap-1.5 px-5 text-center ${i > 0 ? "lg:border-l lg:border-border-soft" : ""}`}
              >
                <span className="mb-2 flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                {i === 3 ? (
                  <dd className="flex h-[40px] items-center gap-2.5 md:h-[44px]">
                    {MEETING_MARKS.map((name) => (
                      <img key={name} src={platform[name]} alt={name} className="h-6 w-auto md:h-7" />
                    ))}
                  </dd>
                ) : (
                  <dd>
                    <StatValue value={c.value} />
                  </dd>
                )}
                <dt className="text-sm font-semibold text-ink">{c.label}</dt>
                <p className="text-pretty text-[13px] leading-relaxed text-muted">{c.body}</p>
              </motion.div>
            );
          })}
        </motion.dl>
      </Container>
    </section>
  );
}
