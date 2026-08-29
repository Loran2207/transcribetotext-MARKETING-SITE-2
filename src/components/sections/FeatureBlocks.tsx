import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { SectionCutout } from "../primitives/SectionCutout";
import { StarField } from "../mocks/StarField";
import { CosmicGlow } from "../mocks/CosmicGlow";
import { BenefitList, FileFlowMock, MeetingResultMock, PlatformPills } from "../mocks/FeatureMocks";
import { featureFiles, featureImport, featureMeeting } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <motion.span
      variants={fadeUp}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.08em] ${
        dark ? "border-white/15 bg-white/5 text-accent-glow" : "border-border bg-white text-accent shadow-soft"
      }`}
    >
      {children}
    </motion.span>
  );
}

export function FeatureBlocks() {
  return (
    <section id="features">
      {/* 1. Meeting transcription - the largest block on the page, so it gets
          V1's strongest surface: the dark band with the starfield and the
          light shaft, framed by the curved cutouts. */}
      <div className="relative overflow-hidden bg-dark-atmosphere py-20 md:py-28">
        <SectionCutout />
        <StarField />
        <CosmicGlow className="opacity-80" />
        <Container className="relative">
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14"
          >
            <div>
              <Label dark>{featureMeeting.label}</Label>
              <motion.h2
                variants={fadeUp}
                className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-ink-invert sm:text-4xl lg:text-[44px]"
              >
                {featureMeeting.title}
              </motion.h2>
              {featureMeeting.body.map((b) => (
                <motion.p key={b} variants={fadeUp} className="mt-4 text-pretty text-[15px] leading-relaxed text-muted-invert md:text-base">
                  {b}
                </motion.p>
              ))}
              <motion.div variants={fadeUp}>
                <BenefitList items={featureMeeting.benefits} dark />
              </motion.div>
              <motion.div variants={fadeUp} className="mt-9">
                <Button href="/subscribe" size="lg">
                  {featureMeeting.cta} <ArrowRight size={18} />
                </Button>
              </motion.div>
            </div>
            <motion.div variants={fadeUp} className="min-w-0">
              <MeetingResultMock />
            </motion.div>
          </motion.div>
        </Container>
      </div>

      {/* 2. Any audio or video file. Back on white; the visual is an app window
          with a real shadow, not a panel on a plate. */}
      <div className="relative bg-white py-16 md:py-24">
        <SectionCutout fill="#0A0F1E" />
        <Container>
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14"
          >
            <motion.div variants={fadeUp} className="order-2 min-w-0 lg:order-1">
              <FileFlowMock />
            </motion.div>
            <div className="order-1 lg:order-2">
              <Label>{featureFiles.label}</Label>
              <motion.h2
                variants={fadeUp}
                className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[40px]"
              >
                {featureFiles.title}
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-pretty text-[15px] leading-relaxed text-ink-2 md:text-base">
                {featureFiles.body}
              </motion.p>
              <motion.div variants={fadeUp}>
                <BenefitList items={featureFiles.benefits} />
              </motion.div>
              <motion.div variants={fadeUp} className="mt-9">
                <Button href="/subscribe" size="lg" variant="outline">
                  {featureFiles.cta} <ArrowRight size={18} />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* 3. Where the file comes from: the smallest of the three. The logos ARE
          the answer, so they stand as V1's pill row at native proportions. */}
      <div className="bg-white pb-16 md:pb-24">
        <Container>
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid items-center gap-10 border-t border-border-soft pt-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14 md:pt-20"
          >
            <div>
              <Label>{featureImport.label}</Label>
              <motion.h2
                variants={fadeUp}
                className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[34px]"
              >
                <span className="block">{featureImport.titleLine1}</span>
                {featureImport.titleLine2}
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-pretty text-[15px] leading-relaxed text-ink-2 md:text-base">
                {featureImport.body}
              </motion.p>
            </div>
            <motion.div variants={fadeUp} className="min-w-0">
              <PlatformPills />
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
