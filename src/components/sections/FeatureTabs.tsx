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
   visitor already knows, Meeting Transcription first and preselected.

   The visual follows the grammar the strongest marketing pages use for
   photography (Langdock, V7): the PHOTOGRAPH IS THE ENVIRONMENT and it stays
   soft; the product panel is the ONE sharp thing in the frame, sitting in the
   photo's own space with a real drop shadow. Every glow is the light inside
   the picture - no colored blur behind the card, which is exactly the move
   that reads as generated slop. Round 10, after three rejected attempts. */

const PANEL =
  "rounded-2xl bg-white shadow-[0_2px_8px_rgba(16,24,40,0.10),0_28px_56px_-20px_rgba(16,24,40,0.42)] ring-1 ring-black/[0.05]";

const TINTS = ["bg-accent-soft text-accent", "bg-trust-soft text-trust"];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

function PanelLine({ who, at, text, i }: { who: string; at: string; text: string; i: number }) {
  return (
    <li className="flex gap-2">
      <span className={`flex size-[22px] shrink-0 items-center justify-center rounded-full text-[9.5px] font-semibold ${TINTS[i % TINTS.length]}`}>
        {initials(who)}
      </span>
      <div className="min-w-0">
        <p className="text-[9.5px] font-medium text-muted">
          {who} <span className="tabular-nums">{at}</span>
        </p>
        <p className="text-[11.5px] leading-[1.4] text-ink-2">{text}</p>
      </div>
    </li>
  );
}

function PanelMeeting() {
  return (
    <div className={`${PANEL} p-4`}>
      <div className="mb-2.5 flex items-center gap-2 border-b border-border-soft pb-2.5">
        <span className="min-w-0 truncate text-[11.5px] font-semibold text-ink">Weekly product sync</span>
        <span className="hidden shrink-0 rounded bg-surface-soft px-1.5 py-0.5 text-[9.5px] font-medium text-ink-2 sm:inline">
          Google Meet
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1 text-[9.5px] font-semibold text-deal">
          <span className="size-1.5 rounded-full bg-deal" /> 24:18
        </span>
      </div>
      <ul className="space-y-2">
        <PanelLine who="Anna Ruiz" at="00:12" text="Let's lock the launch date today." i={0} />
        <PanelLine who="Leo Park" at="00:26" text="Marketing is ready for Monday." i={1} />
      </ul>
      <div className="mt-2.5 flex items-start gap-1.5 border-t border-border-soft pt-2.5">
        <Sparkles size={12} className="mt-[1px] shrink-0 text-accent" />
        <p className="text-[11px] leading-[1.4] text-ink-2">
          <span className="font-semibold text-ink">AI Summary</span> Launch locked for Monday, marketing assets ready.
        </p>
      </div>
    </div>
  );
}

function PanelAudio() {
  return (
    <div className={`${PANEL} p-4`}>
      <div className="mb-2.5 flex items-center gap-2">
        <AudioLines size={13} className="shrink-0 text-accent" />
        <span className="text-[11.5px] font-semibold text-ink">Founder interview.mp3</span>
        <span className="ml-auto shrink-0 text-[9.5px] font-medium tabular-nums text-muted">1 hr 08 min</span>
      </div>
      <div className="mb-2.5 flex items-end gap-[3px]" aria-hidden>
        {[6, 12, 8, 15, 10, 17, 7, 13, 11, 16, 6, 10, 14, 8, 12, 9, 15, 7, 11, 8, 13, 6, 10, 12].map((h, i) => (
          <span key={i} className="w-[3px] shrink-0 rounded-full bg-accent/50" style={{ height: h }} />
        ))}
      </div>
      <ul className="space-y-2 border-t border-border-soft pt-2.5">
        <PanelLine who="Interviewer" at="04:02" text="What made you start the company?" i={0} />
        <PanelLine who="Guest" at="04:09" text="We were losing a day a week to write-ups." i={1} />
      </ul>
    </div>
  );
}

function PanelVideo() {
  return (
    <div className={`${PANEL} p-4`}>
      <div className="mb-2.5 flex items-center gap-2">
        <Video size={13} className="shrink-0 text-accent" />
        <span className="text-[11.5px] font-semibold text-ink">Subtitles</span>
        <span className="ml-auto flex shrink-0 gap-1">
          {["SRT", "VTT"].map((f) => (
            <span key={f} className="rounded border border-border px-1.5 py-[2px] text-[9px] font-semibold text-ink-2">
              {f}
            </span>
          ))}
        </span>
      </div>
      <ul className="space-y-1.5 border-t border-border-soft pt-2.5">
        {[
          { at: "00:01", text: "Welcome back to the show." },
          { at: "00:05", text: "Today we talk about growth." },
          { at: "00:11", text: "Our first hire changed everything." },
        ].map((l) => (
          <li key={l.at} className="flex gap-2 text-[11.5px] leading-[1.4]">
            <span className="shrink-0 font-medium tabular-nums text-muted">{l.at}</span>
            <span className="text-ink-2">{l.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PanelCloud() {
  return (
    <div className={`${PANEL} p-4`}>
      <div className="mb-2.5 flex items-center gap-2">
        <CloudUpload size={13} className="shrink-0 text-accent" />
        <span className="text-[11.5px] font-semibold text-ink">Import</span>
        <span className="ml-auto flex shrink-0 items-center gap-1">
          {["YouTube", "Google Drive", "Dropbox"].map((n) => (
            <span key={n} className="flex size-[22px] items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-black/[0.06]">
              <img src={platform[n]} alt={n} className="h-[11px] w-auto" />
            </span>
          ))}
        </span>
      </div>
      <div className="border-t border-border-soft pt-2.5">
        <p className="mb-1.5 text-[11px] font-medium text-ink-2">Q3 strategy call.mp4</p>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-soft">
          <span className="block h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#3B82F6,#2563EB)]" />
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[10.5px] font-medium text-ink-2">
          <span className="flex size-4 items-center justify-center rounded-full bg-trust text-white">
            <Check size={9} strokeWidth={3.5} />
          </span>
          Transcript ready in seconds
        </p>
      </div>
    </div>
  );
}

const PANELS: Record<string, () => React.ReactElement> = {
  meeting: PanelMeeting,
  audio: PanelAudio,
  video: PanelVideo,
  cloud: PanelCloud,
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
  const Panel = PANELS[s.key];

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

            {/* The photograph carries the light and the depth; the panel is the
                only sharp object in it, standing on the picture's own floor. */}
            <div className="relative overflow-hidden rounded-tile shadow-window ring-1 ring-black/[0.06]">
              <img src={s.photo} alt="" aria-hidden className="aspect-[4/3] w-full object-cover" />
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(10,15,30,0) 38%, rgba(10,15,30,0.18) 100%)" }}
              />
              <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
                <Panel />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
