import type { ReactNode } from "react";
import { Container } from "./Container";
import { SectionCutout } from "./SectionCutout";

type Tone = "white" | "sky" | "mint" | "soft";

const toneClass: Record<Tone, string> = {
  white: "bg-canvas",
  sky: "bg-tint-sky",
  mint: "bg-tint-mint",
  soft: "bg-surface-soft",
};

export function Section({
  id,
  tone = "white",
  className = "",
  containerClassName = "",
  cutout,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  cutout?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${toneClass[tone]} ${className}`}>
      {cutout ? <SectionCutout fill={cutout} /> : null}
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
