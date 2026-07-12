// Dub-style transition tab: a centered notch that dips from the section above
// into the top edge of a full-width panel, with smooth concave shoulders.
// `fill` should match the color of the section directly above this one.
export function SectionCutout({ fill = "#FFFFFF" }: { fill?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center">
      <svg
        className="block h-auto w-[212px] sm:w-[248px]"
        viewBox="0 0 248 30"
        fill="none"
        preserveAspectRatio="xMidYMin meet"
      >
        <path d="M44 0 C74 0 74 30 104 30 H144 C174 30 174 0 204 0 Z" fill={fill} />
      </svg>
    </div>
  );
}
