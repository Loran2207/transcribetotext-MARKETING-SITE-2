import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { BenefitList, FileFlowMock, MeetingResultMock, PlatformGrid } from "../mocks/FeatureMocks";
import { featureFiles, featureImport, featureMeeting } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

function Label({ children }: { children: ReactNode }) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold tracking-[0.01em] text-accent shadow-soft"
    >
      {children}
    </motion.span>
  );
}

export function FeatureBlocks() {
  return (
    <section id="features" className="bg-white">
      {/* 1. Meeting transcription. The largest block on the page: it gets its own
          tinted surface and the widest visual, because it is the use case the
          whole landing is now built around. */}
      <Container className="pb-14 pt-4 md:pb-20 md:pt-6">
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid items-center gap-10 rounded-[28px] border border-border-soft bg-tint-sky px-6 py-10 sm:px-8 md:px-10 md:py-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-14 lg:px-12 lg:py-14"
        >
          <div>
            <Label>{featureMeeting.label}</Label>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-balance font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[34px] lg:text-[40px]"
            >
              {featureMeeting.title}
            </motion.h2>
            {featureMeeting.body.map((b) => (
              <motion.p key={b} variants={fadeUp} className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-2 md:text-base">
                {b}
              </motion.p>
            ))}
            <motion.div variants={fadeUp}>
              <BenefitList items={featureMeeting.benefits} />
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8">
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

      {/* 2. Any audio or video file. The visual leads on the left, so the two
          feature blocks do not read as the same slide twice. */}
      <Container className="py-14 md:py-20">
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
        >
          <motion.div variants={fadeUp} className="order-2 min-w-0 lg:order-1">
            <FileFlowMock />
          </motion.div>
          <div className="order-1 lg:order-2">
            <Label>{featureFiles.label}</Label>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-balance font-display text-[26px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[32px] lg:text-[36px]"
            >
              {featureFiles.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-2 md:text-base">
              {featureFiles.body}
            </motion.p>
            <motion.div variants={fadeUp}>
              <BenefitList items={featureFiles.benefits} />
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8">
              <Button href="/subscribe" size="lg" variant="outline">
                {featureFiles.cta} <ArrowRight size={18} />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* 3. Where the file comes from. The smallest of the three: it answers one
          question and the logos are the answer. */}
      <Container className="pb-14 md:pb-20">
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid items-center gap-8 rounded-[28px] border border-border-soft bg-surface-soft px-6 py-10 sm:px-8 md:px-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 lg:px-12"
        >
          <div>
            <Label>{featureImport.label}</Label>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-balance font-display text-[26px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[30px] lg:text-[34px]"
            >
              {featureImport.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-2 md:text-base">
              {featureImport.body}
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="min-w-0">
            <PlatformGrid />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
