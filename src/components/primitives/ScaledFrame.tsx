import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Renders children at a fixed design `width` and scales the whole thing down to
// fit the available container width (never scales up past 1). Used to drop the
// real product dashboard in at desktop proportions, shrunk to fit the hero.
export function ScaledFrame({
  width,
  maxHeight,
  children,
  className = "",
}: {
  width: number;
  maxHeight?: number;
  children: ReactNode;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ scale: 1, height: 0 });

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const scale = Math.min(1, o.offsetWidth / width);
      const contentH = i.offsetHeight * scale;
      const height = maxHeight ? Math.min(contentH, maxHeight) : contentH;
      setState({ scale, height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [width, maxHeight]);

  // re-measure once fonts settle
  useEffect(() => {
    const t = setTimeout(() => {
      const o = outer.current;
      const i = inner.current;
      if (!o || !i) return;
      const scale = Math.min(1, o.offsetWidth / width);
      const contentH = i.offsetHeight * scale;
      setState({ scale, height: maxHeight ? Math.min(contentH, maxHeight) : contentH });
    }, 300);
    return () => clearTimeout(t);
  }, [width, maxHeight]);

  return (
    <div ref={outer} className={`relative w-full overflow-hidden ${className}`} style={{ height: state.height || undefined }}>
      <div ref={inner} style={{ width, transformOrigin: "top left", transform: `scale(${state.scale})`, position: "absolute", top: 0, left: 0 }}>
        {children}
      </div>
    </div>
  );
}
