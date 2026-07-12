import { Waveform } from "../primitives/Waveform";

export function WaveViz() {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-accent-glow" />
        <span className="font-mono text-[11px] text-muted-invert">recording.mp3 · 10:00:00</span>
        <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-medium text-accent-glow">99% accuracy</span>
      </div>
      <Waveform bars={46} height={40} className="mt-3" />
    </div>
  );
}
