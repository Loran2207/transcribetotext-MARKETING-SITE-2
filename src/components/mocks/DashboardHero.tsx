import { Search, HelpCircle, ChevronDown } from "lucide-react";
import { DashSidebar } from "./DashSidebar";
import { DashMain } from "./DashMain";
import { DashPanel } from "./DashPanel";
import { brand } from "../../data/assets";

export function DashboardHero() {
  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-border bg-white text-left shadow-lift">
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <img src={brand.logo} alt="Transcribe To Text" className="h-6 w-auto shrink-0 object-contain" style={{ maxWidth: 160 }} />
        <div className="flex w-full max-w-sm items-center gap-2 rounded-full border border-border bg-surface-soft px-3 py-1.5 text-[12px] text-muted">
          <Search size={13} /> Quick Find
          <span className="ml-auto rounded bg-white px-1.5 py-0.5 font-mono text-[10px] text-muted shadow-soft">Ctrl K</span>
        </div>
        <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] text-muted">
          <HelpCircle size={14} /> support@transcribetotext.ai
        </span>
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent ring-1 ring-inset ring-accent/15">K</span>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold text-ink">Kirill</p>
            <p className="text-[10px] text-muted">Pro Plan</p>
          </div>
          <ChevronDown size={13} className="text-muted" />
        </div>
      </div>
      <div className="flex">
        <DashSidebar />
        <DashMain />
        <DashPanel />
      </div>
    </div>
  );
}
