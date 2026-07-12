import { Home, FileText, Users, Calendar, LayoutTemplate, Plus, Puzzle, ChevronLeft, Folder } from "lucide-react";

const NAV = [
  { I: Home, l: "Home", a: true },
  { I: FileText, l: "My Records" },
  { I: Users, l: "Shared with me" },
  { I: Calendar, l: "Meetings" },
  { I: LayoutTemplate, l: "Templates" },
];
const FOLDERS: [string, string][] = [
  ["Sprint Planning", "#2563EB"], ["Client Calls", "#2563EB"], ["Design Reviews", "#16A34A"],
  ["Team Retros", "#F59E0B"], ["Marketing Reviews", "#EC4899"], ["Sales Calls", "#7C3AED"],
  ["User Research", "#0EA5E9"], ["Hiring Interviews", "#EF4444"],
];

export function DashSidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border p-3">
      <nav className="flex flex-col gap-0.5">
        {NAV.map((n) => (
          <span key={n.l} className={`flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] font-medium ${n.a ? "bg-accent-soft text-accent" : "text-ink-2"}`}>
            <n.I size={16} /> {n.l}
          </span>
        ))}
      </nav>
      <p className="mt-5 px-3 text-[11px] font-semibold text-muted">Starred</p>
      <p className="mt-2 px-3 text-[12px] italic text-muted">No starred files</p>
      <div className="mt-5 flex items-center justify-between px-3">
        <span className="text-[11px] font-semibold text-muted">Folders</span>
        <Plus size={13} className="text-muted" />
      </div>
      <div className="mt-2 flex flex-col gap-0.5">
        {FOLDERS.map(([l, c]) => (
          <span key={l} className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] text-ink-2">
            <Folder size={15} strokeWidth={0} fill={c} className="shrink-0" /> {l}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-0.5 pt-4">
        <span className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-ink-2"><Puzzle size={16} /> Integrations</span>
        <span className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-ink-2"><ChevronLeft size={16} /> Collapse</span>
      </div>
    </aside>
  );
}
