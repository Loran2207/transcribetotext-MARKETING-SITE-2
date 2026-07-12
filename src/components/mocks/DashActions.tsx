import { AudioVideoFilesCard, InstantSpeachCard, MeetingRecorderCard, TranscribeFromLinkCard } from "./DashCards";

const CARDS = [
  { C: AudioVideoFilesCard, k: "1" },
  { C: InstantSpeachCard, k: "2" },
  { C: MeetingRecorderCard, k: "3" },
  { C: TranscribeFromLinkCard, k: "4" },
];

export function DashActions() {
  return (
    <div className="mt-5 grid grid-cols-4 gap-3">
      {CARDS.map(({ C, k }) => (
        <div key={k} className="relative min-w-0">
          <span className="absolute right-2.5 top-2.5 z-10 flex items-center gap-[3px] rounded-md border border-black/[0.08] bg-white px-1.5 py-0.5 font-mono text-[10px] text-muted shadow-soft">{"⌘"}{k}</span>
          <C />
        </div>
      ))}
    </div>
  );
}
