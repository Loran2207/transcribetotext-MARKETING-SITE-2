import { ChevronRight, Zap, Check } from "lucide-react";
import promoSvgPaths from "../../imports/svg-panhyaoz26";

const imgGiftBox = "/images/gift-box.png";

export function PromoCard() {
  return (
    <div className="relative w-full shrink-0 overflow-hidden rounded-[12px]" style={{ height: 63, minHeight: 63 }}>
      <svg className="absolute inset-0 h-full w-full" fill="none" viewBox="0 0 324 63" preserveAspectRatio="none"><path d={promoSvgPaths.p19ebcd71} fill="#FEF2EB" /></svg>
      <p className="absolute left-[19px] top-[12px] whitespace-nowrap text-ink" style={{ fontWeight: 600, fontSize: "13px", lineHeight: "19.5px" }}>Your 10% off code: <span className="text-[#EE1A1A]" style={{ fontWeight: 700 }}>onbd21</span></p>
      <p className="absolute left-[19px] top-[34px] flex items-center gap-[2px] whitespace-nowrap text-[#EE1A1A]" style={{ fontWeight: 400, fontSize: "11px", lineHeight: "16.5px" }}>Buy now <ChevronRight size={11} strokeWidth={2} /></p>
      <div className="absolute flex items-center justify-center" style={{ right: 0, top: -20, width: 113, height: 113 }}>
        <div className="rotate-[-4.31deg]"><div className="relative" style={{ width: 105.378, height: 105.378 }}><img src={imgGiftBox} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-contain" /></div></div>
      </div>
      <div className="absolute" style={{ right: 87.23, top: 14.57, width: 5.092, height: 4.613, animation: "sparkle 2.8s ease-in-out infinite 0s" }}><div className="rotate-[-5.01deg]"><svg style={{ width: 3.952, height: 3.513 }} fill="none" viewBox="0 0 3.95169 3.51261"><path clipRule="evenodd" d={promoSvgPaths.p2720d600} fill="#EE1A1A" fillRule="evenodd" /></svg></div></div>
      <div className="absolute" style={{ right: 20.51, top: 13, width: 3.97, height: 3.757, animation: "sparkle 2.2s ease-in-out infinite 0.9s" }}><div className="rotate-[19.8deg]"><svg style={{ width: 2.664, height: 2.368 }} fill="none" viewBox="0 0 2.66416 2.36814"><path clipRule="evenodd" d={promoSvgPaths.pc72f600} fill="#EE1A1A" fillRule="evenodd" /></svg></div></div>
      <div className="absolute" style={{ right: 16.59, top: 16.26, width: 5.889, height: 5.572, animation: "sparkle 3s ease-in-out infinite 0.5s" }}><div className="rotate-[19.8deg]"><svg style={{ width: 3.952, height: 3.513 }} fill="none" viewBox="0 0 3.95169 3.51261"><path clipRule="evenodd" d={promoSvgPaths.p2720d600} fill="#EE1A1A" fillRule="evenodd" /></svg></div></div>
    </div>
  );
}

export function FreePlanCard() {
  const features = ["AI Notes", "Recordings and transcripts export", "Transcript translation", "Up to 5 hours per transcription"];
  return (
    <div className="overflow-hidden rounded-[14px] border border-border bg-white shadow-soft">
      <div className="px-[18px] pb-[14px] pt-[16px]"><span className="text-ink" style={{ fontWeight: 700, fontSize: "18px", letterSpacing: "-0.3px" }}>You on Free Plan</span></div>
      <div className="px-[18px] pb-[16px]">
        <div className="mb-[6px] flex items-baseline justify-between">
          <span className="text-ink" style={{ fontWeight: 600, fontSize: "13px" }}>3 <span className="text-muted" style={{ fontWeight: 400 }}>of 10 files</span></span>
          <span className="text-muted" style={{ fontWeight: 500, fontSize: "11px" }}>30%</span>
        </div>
        <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#EEF1F7]"><div className="h-full rounded-full bg-accent" style={{ width: "30%" }} /></div>
        <p className="mt-[6px] text-muted" style={{ fontWeight: 400, fontSize: "10.5px" }}>Resets on 04/10/2026 20:09</p>
      </div>
      <div className="mx-[18px] h-px bg-border" />
      <div className="flex flex-col items-center gap-[10px] px-[18px] py-[16px]">
        <span className="flex h-[38px] w-full items-center justify-center gap-[6px] rounded-full bg-accent shadow-blue"><Zap size={14} className="text-white" fill="currentColor" /><span className="text-white" style={{ fontWeight: 600, fontSize: "13px" }}>Upgrade to Pro</span></span>
        <span className="flex items-center gap-[2px] text-accent" style={{ fontWeight: 500, fontSize: "12px" }}>Start my trial now <ChevronRight size={14} /></span>
      </div>
      <div className="mx-[10px] mb-[10px] rounded-[10px] bg-[#F1F3F7] px-[14px] py-[12px]">
        <p className="text-muted" style={{ fontWeight: 600, fontSize: "10.5px", marginBottom: "8px", letterSpacing: "0.5px" }}>Unlock with Pro</p>
        <div className="flex flex-col gap-[6px]">
          {features.map((f) => (<div key={f} className="flex items-start gap-[8px]"><Check size={11} strokeWidth={2.5} className="mt-[1px] shrink-0 text-accent" /><span className="text-ink-2" style={{ fontWeight: 400, fontSize: "12px" }}>{f}</span></div>))}
        </div>
      </div>
    </div>
  );
}
