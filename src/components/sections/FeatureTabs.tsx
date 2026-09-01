import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, AudioLines, Check, CloudUpload, Download, Sparkles, Users, Video } from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { PlatformPills } from "../mocks/FeatureMocks";
import { services } from "../../data/content";
import { platform } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

/* The site's own "Our Transcription Services" block, kept as the four tabs a
   visitor already knows, Meeting Transcription first and preselected.

   Round 11 rebuild, on the grammar the owner pointed at (Wispr Flow): the
   PHOTOGRAPH IS THE CARD and the interface lives INSIDE it - the transcript is
   naked type ON the picture, and only ONE real component stands in the frame
   with a shadow. Ours is the same mechanic in our own key: every scene is a
   monochrome blue night frame with heavy bokeh, so white type and blue UI sit
   on it without fighting. Each of the four states is composed differently
   (transcript, waveform, subtitles, import), because a single template with
   swapped contents is what read as four pictures of the same thing. */

/* No scrim. Measured on the reference: their photographs carry 82% of their
   pixels below L60, and that exposure alone carries white type - no overlay
   gradient, no text-shadow anywhere in their stylesheet. Ours are darker still
   (90-94% below L60), so a scrim would only mud them. The one gradient kept is
   a whisper at the very bottom, where the panel's white edge meets the frame. */
const FOOT_WASH =
  "linear-gradient(180deg, rgba(4,10,26,0) 0%, rgba(4,10,26,0.34) 100%)";

/* The one real component in each frame. Measured on the reference: their
   composer carries box-shadow NONE - a 98%-luminance block on an 82%-dark
   photograph lifts by value contrast alone, and a drop shadow is exactly the
   dark halo that was rejected in round 51. Small radius, like a real control. */
const CARD = "rounded-[10px] bg-white p-3.5 ring-1 ring-black/[0.04]";

/* The status pill: an ink capsule with a LIGHT RING, measured off the
   reference - on a dark photograph a pill without a ring loses its own edge,
   and a ring reads where a shadow cannot. Solid rgba rather than
   backdrop-blur: the DOM-to-Figma converter drops the filter and the pill
   would land in the mockup as clear glass. */
function StatusPill({ children, live = false }: { children: React.ReactNode; live?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(7,15,36,0.86)] px-3 py-1.5 text-[11px] font-bold text-white ring-2 ring-white/85">
      {live ? <span className="size-1.5 rounded-full bg-deal" /> : <Sparkles size={11} className="text-[#8FC2FF]" />}
      {children}
    </span>
  );
}

/* Naked transcript type, straight on the photograph. Measured on the
   reference: 12px, weight 600, 18px line-height - SMALL and HEAVY, because
   heavy small type survives on busy bokeh while light large type shimmers.
   The speaker's name is the accent, and it is a light blue: an accent must
   out-brighten the picture (L 186 here) or it sinks into the photograph. */
function Say({ who, children }: { who: string; children: React.ReactNode }) {
  return (
    <p className="text-[12.5px] font-semibold leading-[18px] tracking-[0.01em] text-[#F2F6FF]">
      <span className="text-[#8FC2FF]">{who}</span> {children}
    </p>
  );
}

function Meta({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold tracking-[0.01em] text-white/55">{children}</p>;
}

/* The status pill sits low and centred, in the band of open photograph under
   the panel - the reference's own footing, and what stops the frame from
   ending on a hard edge. */
function Foot({ children }: { children: React.ReactNode }) {
  return <div className="mt-auto flex justify-center pt-5">{children}</div>;
}

/* The site's own notch, taken off SectionCutout and bitten into the frame
   itself, top and bottom (Kirill, round 11b). It is the page colour laid over
   the photograph, exactly as the section transition is drawn - so it survives
   the DOM-to-Figma export, which a CSS mask would not. */
function FrameNotch({ side }: { side: "top" | "bottom" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-10 flex justify-center ${
        side === "top" ? "top-0" : "bottom-0 rotate-180"
      }`}
    >
      <svg className="block h-auto w-[46%]" viewBox="0 0 248 30" fill="none" preserveAspectRatio="xMidYMin meet">
        <path d="M44 0 C74 0 74 30 104 30 H144 C174 30 174 0 204 0 Z" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

function SceneMeeting() {
  return (
    <>
      <Meta>Weekly product sync · Google Meet</Meta>
      <div className="mt-4 space-y-2.5">
        <Say who="Anna">Let's lock the launch date today.</Say>
        <Say who="Leo">Marketing is ready for Monday, assets are done.</Say>
        <Say who="Anna">Then we ship Monday and tell support on Friday.</Say>
        <Say who="Leo">I'll send the release note tomorrow morning.</Say>
        <Say who="Anna">Perfect. Priya, can you brief the support team?</Say>
      </div>
      <div className="mt-7">
        <div className={CARD}>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-accent">
            <Sparkles size={12} /> AI Summary
          </p>
          <p className="mt-1.5 text-[12.5px] leading-[1.45] text-ink-2">
            Launch set for Monday. Marketing assets are ready; support is briefed Friday.
          </p>
        </div>
      </div>
      <Foot>
        <StatusPill live>Recording 24:18</StatusPill>
      </Foot>
    </>
  );
}

function SceneAudio() {
  const bars = [7, 15, 10, 22, 13, 27, 9, 18, 24, 12, 30, 16, 21, 8, 26, 14, 19, 11, 28, 15, 23, 9, 17, 25, 12, 20, 8, 16, 22, 10, 27, 13, 18, 24, 11, 15];
  return (
    <>
      <Meta>Founder interview.mp3 · 1 hr 08 min</Meta>
      {/* The waveform is drawn ON the photograph, not inside a panel - it is
          the sound in the room, so it belongs to the picture. */}
      <div className="mt-5 flex h-12 items-center gap-[3px]" aria-hidden>
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[3px] shrink-0 rounded-full"
            style={{ height: h, background: i < 22 ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.34)" }}
          />
        ))}
      </div>
      <div className="mt-5 space-y-3">
        <Say who="Interviewer">What made you start the company?</Say>
        <Say who="Guest">We were losing a day a week writing things up.</Say>
      </div>
      <div className="mt-7">
        <div className={CARD}>
          <p className="text-[11px] font-semibold text-ink-2">Speakers found</p>
          <div className="mt-2 flex items-center gap-3">
            {[
              { n: "Interviewer", s: "34%", t: "bg-accent-soft text-accent" },
              { n: "Guest", s: "66%", t: "bg-trust-soft text-trust" },
            ].map((p) => (
              <span key={p.n} className="flex items-center gap-1.5">
                <span className={`flex size-6 items-center justify-center rounded-full text-[9.5px] font-bold ${p.t}`}>
                  {p.n[0]}
                </span>
                <span className="text-[12px] font-semibold text-ink">{p.n}</span>
                <span className="text-[11px] tabular-nums text-muted">{p.s}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <Foot>
        <StatusPill>Transcribing 98%</StatusPill>
      </Foot>
    </>
  );
}

function SceneVideo() {
  return (
    <>
      <Meta>Growth interview.mp4</Meta>
      {/* Subtitles genuinely live on the frame, so this is the one state where
          the naked type sits centred at the bottom, exactly as a viewer meets it. */}
      <div className="mt-auto">
        <p className="text-center text-[15px] font-semibold leading-[1.4] text-[#F2F6FF] sm:text-[16px]">
          Our first hire changed everything about how we sell.
        </p>
        <div className="mt-5 flex items-center gap-2.5">
          <span className="text-[11px] font-medium tabular-nums text-white/70">04:12</span>
          <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/20">
            <span className="block h-full w-[38%] rounded-full bg-white" />
          </span>
          <span className="text-[11px] font-medium tabular-nums text-white/70">11:02</span>
        </div>
        <div className={`${CARD} mt-5 flex items-center gap-3`}>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <Download size={16} />
          </span>
          <p className="min-w-0 flex-1 text-[12.5px] font-semibold text-ink">Subtitle files</p>
          {["SRT", "VTT"].map((f) => (
            <span key={f} className="rounded-lg bg-surface-soft px-2.5 py-1.5 text-[11px] font-bold text-ink-2">
              {f}
            </span>
          ))}
        </div>
        <div className="flex justify-center pt-5">
          <StatusPill>Subtitles ready</StatusPill>
        </div>
      </div>
    </>
  );
}

const CLOUD_MARKS = ["YouTube", "Google Drive", "Dropbox"];

function SceneCloud() {
  return (
    <>
      {/* No meta line here: the marks themselves say where the content comes
          from, and a sentence saying it again is rule 9 on one frame. Each mark
          keeps its own colour on a small white coin, the only way a brand mark
          survives on a dark photograph. */}
      <div className="flex items-center gap-2.5">
        {CLOUD_MARKS.map((n) => (
          <span key={n} className="flex size-[34px] items-center justify-center rounded-xl bg-white">
            <img src={platform[n]} alt={n} className="h-[15px] w-auto" />
          </span>
        ))}
        <span className="text-[11px] font-semibold text-white/55">and more</span>
      </div>
      <div className="mt-5">
        <div className={CARD}>
          <div className="flex items-center gap-2">
            <CloudUpload size={13} className="shrink-0 text-accent" />
            <p className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-ink">Q3 strategy call.mp4</p>
            <span className="shrink-0 text-[11px] font-medium tabular-nums text-muted">72%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-soft">
            <span className="block h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#3B82F6,#2563EB)]" />
          </div>
          <div className="mt-3 space-y-2 border-t border-border-soft pt-3">
            {["Board meeting.mp4", "Customer call 12 Aug.m4a"].map((f) => (
              <p key={f} className="flex items-center gap-2 text-[11.5px] font-medium text-ink-2">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-trust text-white">
                  <Check size={9} strokeWidth={3.5} />
                </span>
                <span className="min-w-0 flex-1 truncate">{f}</span>
                <span className="shrink-0 text-[10.5px] text-muted">Transcript ready</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <Foot>
        <StatusPill>3 files imported</StatusPill>
      </Foot>
    </>
  );
}

const SCENES: Record<string, () => React.ReactElement> = {
  meeting: SceneMeeting,
  audio: SceneAudio,
  video: SceneVideo,
  cloud: SceneCloud,
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
  const Scene = SCENES[s.key];

  return (
    <section id="features" className="border-t border-border-soft bg-white py-16 md:py-24">
      <Container>
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <motion.h2
            variants={fadeUp}
            className="text-center font-display text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl md:text-[40px]"
          >
            {services.title}
          </motion.h2>

          {/* Two even columns on a phone: four pills wrapping 2-1-1 is the
              ragged grid the law forbids. */}
          <motion.div
            variants={fadeUp}
            className="mt-8 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-3"
          >
            {services.items.map((it, i) => {
              const Ico = TAB_ICON[it.key];
              const on = i === active;
              return (
                <button
                  key={it.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-[12.5px] font-semibold transition sm:px-5 sm:text-[13px] ${
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
              <h3 className="text-balance font-display text-[28px] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[32px]">
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

            {/* The photograph IS the card. Everything above lives inside it. */}
            <div
              data-shot="feature-frame"
              className="relative aspect-[4/5] overflow-hidden rounded-tile bg-dark shadow-window ring-1 ring-black/[0.06]"
            >
              <img src={s.photo} alt="" aria-hidden className="absolute inset-0 size-full object-cover" />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: FOOT_WASH }} />
              <FrameNotch side="top" />
              <FrameNotch side="bottom" />
              <div className="absolute inset-0 z-20 flex flex-col px-6 pb-12 pt-11 sm:px-7">
                <Scene />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
