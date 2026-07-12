import { Waveform } from "./Waveform";

// One shared top waveform so the hero and the subscribe page look identical
// (same size, position, opacity) and nothing shifts when navigating between them.
const FADE = "linear-gradient(to bottom, black 0%, black 52%, transparent 100%)";

export function TopWave() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center overflow-hidden" style={{ WebkitMaskImage: FADE, maskImage: FADE }}>
      <div className="relative mt-2 w-full max-w-[1240px] px-6">
        <div className="opacity-[0.10]"><Waveform bars={210} height={150} color="accent" className="w-full" /></div>
      </div>
    </div>
  );
}
