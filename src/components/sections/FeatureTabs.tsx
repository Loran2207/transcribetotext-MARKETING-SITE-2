import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, AudioLines, Check, CloudUpload, Sparkles, Users, Video } from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { PlatformPills } from "../mocks/FeatureMocks";
import { services } from "../../data/content";
import { platform } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

/* The site's own "Our Transcription Services" block, kept as the four tabs a
   visitor already knows - reordered so Meeting Transcription comes first and
   opens preselected. Each state's visual is a COMPOSITION, not one baked
   picture (Kirill, round 9: "одна фотка это галимо, это нужно комбинировать"):
   a generated scene photo as its own layer, and crisp code-drawn UI pieces
   floating over its edges with soft shadows - the Granola / Rev grammar the
   hero already speaks. */

const FLOAT =
  "bg-white ring-1 ring-black/[0.06] shadow-[0_2px_6px_rgba(16,24,40,0.06),0_16px_36px_-12px_rgba(16,24,40,0.18)]";

const TINTS = ["bg-accent-soft text-accent", "bg-trust-soft text-trust"];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

function MiniLine({ who, at, text, i }: { who: string; at: string; text: string; i: number }) {
  return (
    <li className="flex gap-2">
      <span className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${TINTS[i % TINTS.length]}`}>
        {initials(who)}
      </span>
      <div className="min-w-0">
        <p className="text-[9px] font-medium text-muted">
          {who} <span className="tabular-nums">{at}</span>
        </p>
        <p className="text-[10.5px] leading-[1.4] text-ink-2">{text}</p>
      </div>
    </li>
  );
}

function VisualMeeting() {
  return (
    <>
      <div className={`absolute -right-2 top-8 w-[190px] rounded-2xl p-3.5 sm:-right-4 sm:w-[210px] ${FLOAT}`}>
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-ink">
          <Sparkles size={12} className="text-accent" /> AI Summary
        </p>
        <ul className="space-y-1.5">
          {["Launch locked for Monday", "Marketing assets are ready"].map((b) => (
            <li key={b} className="flex gap-1.5 text-[10.5px] leading-[1.4] text-ink-2">
              <span className="mt-[5px] size-1 shrink-0 rounded-full bg-accent" />
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className={`absolute -bottom-8 -left-2 w-[230px] rounded-2xl p-3.5 sm:-left-4 sm:w-[250px] ${FLOAT}`}>
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-ink">
          <span className="size-1.5 rounded-full bg-deal" /> Live transcript
        </p>
        <ul className="space-y-2">
          <MiniLine who="Anna Ruiz" at="00:12" text="Let's lock the launch date today." i={0} />
          <MiniLine who="Leo Park" at="00:26" text="Marketing is ready for Monday." i={1} />
        </ul>
      </div>
    </>
  );
}

function VisualAudio() {
  return (
    <>
      <div className={`absolute -right-2 top-9 rounded-full px-3 py-1.5 sm:-right-4 ${FLOAT}`}>
        <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-ink">
          <Users size={12} className="text-accent" /> Speaker recognition
        </p>
      </div>
      <div className={`absolute -bottom-8 -left-2 w-[240px] rounded-2xl p-3.5 sm:-left-4 sm:w-[256px] ${FLOAT}`}>
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-ink">
          <AudioLines size={12} className="text-accent" /> Transcript
        </p>
        <div className="mb-2 flex items-end gap-[2px]" aria-hidden>
          {[5, 10, 7, 13, 8, 14, 6, 11, 9, 13, 5, 8, 12, 6, 10, 7, 12, 5, 9, 6].map((h, i) => (
            <span key={i} className="w-[3px] rounded-full bg-accent/55" style={{ height: h }} />
          ))}
        </div>
        <ul className="space-y-2">
          <MiniLine who="Guest" at="04:09" text="We were losing a day a week to write-ups." i={1} />
        </ul>
      </div>
    </>
  );
}

function VisualVideo() {
  return (
    <>
      <div className={`absolute -right-2 top-9 rounded-2xl p-3 sm:-right-4 ${FLOAT}`}>
        <p className="mb-1.5 text-[10.5px] font-semibold text-ink">Export</p>
        <div className="flex gap-1.5">
          {["SRT", "VTT"].map((f) => (
            <span key={f} className="rounded-md border border-border bg-white px-2 py-[3px] text-[9.5px] font-semibold text-ink-2">
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className={`absolute -bottom-8 -left-2 w-[240px] rounded-2xl p-3.5 sm:-left-4 sm:w-[256px] ${FLOAT}`}>
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-ink">
          <Video size={12} className="text-accent" /> Subtitles
        </p>
        <ul className="space-y-1.5">
          {[
            { at: "00:01", text: "Welcome back to the show." },
            { at: "00:05", text: "Today we talk about growth." },
          ].map((l) => (
            <li key={l.at} className="flex gap-2 text-[10.5px] leading-[1.4]">
              <span className="shrink-0 font-medium tabular-nums text-muted">{l.at}</span>
              <span className="text-ink-2">{l.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function VisualCloud() {
  return (
    <>
      <div className={`absolute -right-2 top-8 w-[210px] rounded-2xl p-3.5 sm:-right-4 sm:w-[224px] ${FLOAT}`}>
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-ink">
          <CloudUpload size={12} className="text-accent" /> Import
        </p>
        <div className="mb-2 flex items-center gap-1.5">
          {["YouTube", "Google Drive", "Dropbox"].map((n) => (
            <span key={n} className="flex size-6 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-black/[0.06]">
              <img src={platform[n]} alt={n} className="h-3 w-auto" />
            </span>
          ))}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-soft">
          <span className="block h-full w-[68%] rounded-full bg-[linear-gradient(90deg,#3B82F6,#2563EB)]" />
        </div>
        <p className="mt-1.5 text-[9.5px] font-medium text-muted">Importing from Google Drive</p>
      </div>
      <div className={`absolute -bottom-8 -left-2 rounded-full px-3 py-1.5 sm:-left-4 ${FLOAT}`}>
        <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-ink">
          <span className="flex size-4 items-center justify-center rounded-full bg-trust text-white">
            <Check size={9} strokeWidth={3.5} />
          </span>
          Transcript ready
        </p>
      </div>
    </>
  );
}

const VISUAL: Record<string, () => React.ReactElement> = {
  meeting: VisualMeeting,
  audio: VisualAudio,
  video: VisualVideo,
  cloud: VisualCloud,
};

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

            {(() => {
              const Pieces = VISUAL[s.key];
              return (
                <div className="relative mx-2 pb-8 sm:mx-4">
                  <div className="shadow-window overflow-hidden rounded-tile ring-1 ring-black/[0.06]">
                    <img src={s.photo} alt="" aria-hidden className="aspect-[4/3] w-full object-cover" />
                  </div>
                  <Pieces />
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
