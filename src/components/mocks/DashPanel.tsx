import { ChevronRight } from "lucide-react";
import svgPaths from "../../imports/svg-i3wf63n6gj";
import { imgGroup } from "../../imports/svg-rnxzz";
import { AnalyticsCard } from "./DashAnalytics";

function GoogleMeetIcon() {
  return (
    <div className="relative size-[18px] shrink-0 overflow-hidden" style={{ WebkitMaskImage: `url('${imgGroup}')`, maskImage: `url('${imgGroup}')`, WebkitMaskSize: "16px 14px", maskSize: "16px 14px", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "0px 0px", maskPosition: "0px 0px" }}>
      <div className="absolute inset-[11.11%_5.55%_11.11%_5.56%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0019 14.0009">
          <path d={svgPaths.p9cb4e00} fill="#00832D" /><path d={svgPaths.p2f589a00} fill="#0066DA" /><path d={svgPaths.p3051ddc0} fill="#E94235" /><path d={svgPaths.p3897d380} fill="#2684FC" /><path d={svgPaths.p1e609b00} fill="#00AC47" /><path d={svgPaths.p3f2567f0} fill="#FFBA00" />
        </svg>
      </div>
    </div>
  );
}

const EVENTS: { time: string; title: string; att: number }[] = [
  { time: "09:00 ~ 09:30", title: "Team standup", att: 8 },
  { time: "14:00 ~ 15:00", title: "Nexora - QL | Instance Daily Sync", att: 4 },
  { time: "16:30 ~ 17:15", title: "Product design critique", att: 6 },
];

function MeetingItem({ time, title, att }: { time: string; title: string; att: number }) {
  return (
    <div className="flex gap-[14px] rounded-[10px] px-[8px] py-[11px]">
      <div className="flex w-[104px] shrink-0 flex-col gap-[5px]">
        <div className="flex items-center gap-[6px]"><GoogleMeetIcon /><span className="text-ink" style={{ fontWeight: 500, fontSize: "12px" }}>{time.split(" ~ ")[0]}</span></div>
        <div className="ml-[22px] flex items-center gap-[5px]">
          <div className="relative h-[14px] w-[26px] rounded-full bg-[#E6E9F0]"><div className="absolute left-[2px] top-[2px] size-[10px] rounded-full bg-white shadow-sm" /></div>
          <span className="text-muted" style={{ fontWeight: 400, fontSize: "10px" }}>Auto-join</span>
        </div>
      </div>
      <div className="w-px shrink-0 self-stretch bg-border" />
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <p className="truncate text-ink" style={{ fontWeight: 500, fontSize: "13px" }}>{title}</p>
        <div className="flex items-center gap-[5px]">
          <svg className="size-[12px] shrink-0 text-muted" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" /><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
          <span className="truncate text-muted" style={{ fontWeight: 400, fontSize: "11px" }}>Attendees: {att}</span>
        </div>
      </div>
    </div>
  );
}

export function DashPanel() {
  return (
    <aside className="flex w-80 shrink-0 flex-col gap-[16px] border-l border-border p-[18px]">
      <AnalyticsCard />
      <div>
        <div className="mb-[4px] flex items-center gap-[4px]"><span className="text-ink" style={{ fontWeight: 600, fontSize: "14px" }}>Today's Events</span><ChevronRight size={14} className="text-ink/50" /></div>
        <div className="flex flex-col divide-y divide-border">
          {EVENTS.map((e) => (<MeetingItem key={e.time} {...e} />))}
        </div>
      </div>
    </aside>
  );
}
