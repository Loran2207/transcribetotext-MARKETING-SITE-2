import { Folder, Video, Plus, ChevronDown } from "lucide-react";
import { DashActions } from "./DashActions";
import { brand } from "../../data/assets";

const TABS: [string, string][] = [["Recent", "13"], ["Starred", "0"], ["Shared with me", "3"], ["Trash", "0"]];
const FOLDERS: [string, string][] = [
  ["Sprint Planning", "#7C5CD6"], ["Client Calls", "#2563EB"], ["Design Reviews", "#16A34A"],
  ["Team Retros", "#F59E0B"], ["Marketing Reviews", "#EC4899"],
];
type Row = { color: string; bg: string; t: string; shared?: boolean; tpl: string; d: string; date: string };
const FILES: Row[] = [
  { color: "#00AC47", bg: "#E6F4EA", t: "Weekly product sync - Q3", shared: true, tpl: "Meeting Notes", d: "32 min", date: "03/13/2026, 15:06" },
  { color: "#2563EB", bg: "#E7F1FF", t: "Customer feedback session", tpl: "Meeting Notes", d: "28 min", date: "03/12/2026, 14:30" },
];

export function DashMain() {
  return (
    <main className="min-w-0 flex-1 p-5">
      <h3 className="font-display text-2xl font-semibold text-ink">Good morning, Kirill</h3>
      <DashActions />
      <div className="mt-7 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-ink">My Records</h4>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink-2 shadow-soft"><Plus size={13} /> Add Folder</span>
      </div>
      <div className="mt-3 flex items-center gap-5 border-b border-border">
        {TABS.map(([l, n], i) => (
          <span key={l} className={`-mb-px flex items-center gap-1.5 border-b-2 pb-2.5 text-[13px] font-medium ${i === 0 ? "border-accent text-accent" : "border-transparent text-muted"}`}>
            {l} <span className={`rounded-full px-1.5 text-[10px] ${i === 0 ? "bg-accent text-white" : "bg-black/5 text-muted"}`}>{n}</span>
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 border-b border-border px-2 py-2 text-[11px] font-medium text-muted">
        <span className="h-3.5 w-3.5 shrink-0 rounded border border-border" />
        <span className="flex flex-1 items-center gap-1">Type <ChevronDown size={11} /></span>
        <span className="flex w-28 items-center gap-1">Template <ChevronDown size={11} /></span>
        <span className="block w-8">Lang</span>
        <span className="block w-16">Duration</span>
        <span className="flex w-32 items-center gap-1">Date <ChevronDown size={11} /></span>
      </div>
      {FOLDERS.map(([name, c]) => (
        <div key={name} className="flex items-center gap-3 border-b border-border px-2 py-2.5 text-[13px]">
          <span className="h-3.5 w-3.5 shrink-0 rounded border border-border" />
          <Folder size={16} strokeWidth={0} fill={c} className="shrink-0" />
          <span className="flex-1 font-medium text-ink">{name}</span>
        </div>
      ))}
      {FILES.map((f) => (
        <div key={f.t} className="flex items-center gap-3 border-b border-border px-2 py-2.5 text-[13px]">
          <span className="h-3.5 w-3.5 shrink-0 rounded border border-border" />
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md" style={{ background: f.bg }}><Video size={13} style={{ color: f.color }} /></span>
          <span className="flex min-w-0 flex-1 items-center gap-2"><span className="truncate font-medium text-ink">{f.t}</span>{f.shared ? <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent">Shared</span> : null}</span>
          <span className="block w-28"><span className="rounded-md bg-surface-soft px-2 py-0.5 text-[11px] text-ink-2">{f.tpl}</span></span>
          <span className="block w-8"><img src={brand.langFlags.English} alt="EN" className="h-4 w-4 rounded-full object-cover" /></span>
          <span className="block w-16 font-mono text-[11px] text-muted">{f.d}</span>
          <span className="block w-32 font-mono text-[11px] text-muted">{f.date}</span>
        </div>
      ))}
    </main>
  );
}
