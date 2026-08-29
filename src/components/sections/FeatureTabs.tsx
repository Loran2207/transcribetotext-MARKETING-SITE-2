import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, AudioLines, Check, CloudUpload, Users, Video } from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { PlatformPills } from "../mocks/FeatureMocks";
import { services } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

/* The site's own "Our Transcription Services" block, kept as the four tabs a
   visitor already knows - reordered so Meeting Transcription comes first and
   opens preselected. Each state: the copy on the left, a generated editorial
   photograph on the right (Kirill, round 7: photographs, not drawn UI bits). */

const TAB_ICON: Record<string, typeof Users> = {
  meeting: Users,
  audio: AudioLines,
  video: Video,
  cloud: CloudUpload,
};

export function FeatureTabs() {
  /* ?service=audio preselects a tab - used by the Figma state captures. */
  const initial = useMemo(() => {
    const q = new URLSearchParams(window.location.search).get("service");
    const i = services.items.findIndex((s) => s.key === q);
    return i >= 0 ? i : 0;
  }, []);
  const [active, setActive] = useState(initial);
  const s = services.items[active];

  return (
    <section id="features" className="border-t border-border-soft bg-white py-16 md:py-24">
      <Container>
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <motion.h2
            variants={fadeUp}
            className="text-center font-display text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-4xl md:text-[40px]"
          >
            {services.title}
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {services.items.map((it, i) => {
              const Ico = TAB_ICON[it.key];
              const on = i === active;
              return (
                <button
                  key={it.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold transition sm:px-5 ${
                    on
                      ? "border-accent bg-white text-accent shadow-soft"
                      : "border-border bg-white text-ink-2 hover:border-accent/40 hover:text-ink"
                  }`}
                >
                  <Ico size={15} className={on ? "text-accent" : "text-muted"} />
                  {it.tab}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-10 grid max-w-5xl items-center gap-10 md:mt-14 lg:grid-cols-2 lg:gap-14"
          >
            <div>
              <h3 className="text-balance font-display text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[32px]">
                {s.titlePre} <span className="text-accent">{s.titleAccent}</span>
                {s.titlePost ? ` ${s.titlePost}` : ""}
              </h3>
              {s.body.map((b) => (
                <p key={b} className="mt-4 text-pretty text-[15px] leading-relaxed text-ink-2">
                  {b}
                </p>
              ))}
              {s.benefits.length > 0 ? (
                <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-2">
                      <span className="mt-[2px] flex size-[18px] shrink-0 items-center justify-center rounded-full bg-trust-soft text-trust">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
              {s.platforms ? (
                <div className="mt-6">
                  <PlatformPills items={s.platforms} compact />
                </div>
              ) : null}
              <div className="mt-8">
                <Button href="/subscribe">
                  {s.cta} <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            <div className="shadow-window overflow-hidden rounded-tile ring-1 ring-black/[0.06]">
              <img src={s.photo} alt="" aria-hidden className="aspect-[4/3] w-full object-cover" />
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
