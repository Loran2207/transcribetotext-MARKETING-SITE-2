import { brand } from "../../data/assets";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center ${className}`} aria-label="TranscribeToText.AI">
      <img src={brand.logo} alt="TranscribeToText.AI" className="h-7 w-auto" />
    </a>
  );
}
