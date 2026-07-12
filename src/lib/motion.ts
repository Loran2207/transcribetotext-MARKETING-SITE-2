import type { Variants } from "framer-motion";

// Cubic-bezier easings from the design brief.
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SWEEP: [number, number, number, number] = [0.77, 0, 0.175, 1];
export const SPRING = { type: "spring", stiffness: 300, damping: 24 } as const;

// Premium scroll-reveal set: elements focus in (blur -> sharp) while rising or
// scaling, giving each block an unhurried, high-end entrance as it enters view.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.72, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 44, filter: "blur(14px)" },
  show: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE_OUT } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -52, filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE_OUT } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 52, filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE_OUT } },
};

// Big, cinematic focus-in for section headings / hero-scale moments.
export const blurIn: Variants = {
  hidden: { opacity: 0, scale: 1.06, filter: "blur(18px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.95, ease: EASE_OUT } },
};

// Cards that hinge up into place - a subtle 3D flip for a tactile, premium entrance.
export const tiltUp: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -14, transformPerspective: 900, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE_OUT } },
};

export function stagger(staggerChildren = 0.09, delayChildren = 0): Variants {
  return { hidden: {}, show: { transition: { staggerChildren, delayChildren } } };
}

export const viewportOnce = { once: true, margin: "-90px" } as const;
