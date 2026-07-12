import { useEffect, useRef } from "react";

// Major cities (lat, lng) used as highlighted "coverage" markers.
const CITIES: [number, number][] = [
  [40.71, -74.01], [51.51, -0.13], [48.86, 2.35], [52.52, 13.4],
  [35.68, 139.65], [37.57, 126.98], [1.35, 103.82], [19.08, 72.88],
  [-23.55, -46.63], [-33.87, 151.21], [55.76, 37.62], [30.04, 31.24],
  [34.05, -118.24], [25.2, 55.27],
];

const DOT_COUNT = 1100;
const TILT = -0.42; // axial tilt (radians)
const SPEED = 0.0032; // radians per frame

type V3 = { x: number; y: number; z: number };

// Fibonacci sphere for an even dot distribution, pre-tilted around X.
function sphereDots(): V3[] {
  const pts: V3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const cosT = Math.cos(TILT);
  const sinT = Math.sin(TILT);
  for (let i = 0; i < DOT_COUNT; i++) {
    const y0 = 1 - (i / (DOT_COUNT - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y0 * y0));
    const theta = i * golden;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    pts.push({ x, y: y0 * cosT - z * sinT, z: y0 * sinT + z * cosT });
  }
  return pts;
}

function cityDots(): V3[] {
  const cosT = Math.cos(TILT);
  const sinT = Math.sin(TILT);
  return CITIES.map(([lat, lng]) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -Math.sin(phi) * Math.cos(theta);
    const y0 = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    return { x, y: y0 * cosT - z * sinT, z: y0 * sinT + z * cosT };
  });
}

export function Globe3D({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = sphereDots();
    const cities = cityDots();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = 0;
    let raf = 0;
    let angle = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      size = canvas.offsetWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const cx = size / 2;
      const cy = size / 2;
      const R = size * 0.46;
      ctx.clearRect(0, 0, size, size);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];
        const x = p.x * cosA + p.z * sinA;
        const z = -p.x * sinA + p.z * cosA;
        const depth = (z + 1) / 2;
        const px = cx + x * R;
        const py = cy - p.y * R;
        ctx.beginPath();
        ctx.fillStyle = `rgba(59,88,150,${0.06 + depth * depth * 0.42})`;
        ctx.arc(px, py, 0.5 + depth * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < cities.length; i++) {
        const p = cities[i];
        const x = p.x * cosA + p.z * sinA;
        const z = -p.x * sinA + p.z * cosA;
        if (z < 0.05) continue;
        const px = cx + x * R;
        const py = cy - p.y * R;
        const depth = (z + 1) / 2;
        ctx.beginPath();
        ctx.fillStyle = `rgba(37,99,235,${0.18 * depth})`;
        ctx.arc(px, py, 6 * depth, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(37,99,235,${0.55 + depth * 0.4})`;
        ctx.arc(px, py, 2.4 * depth, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) angle += SPEED;
      raf = requestAnimationFrame(render);
    };
    render();
    const fade = setTimeout(() => { canvas.style.opacity = "1"; }, 60);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fade);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", aspectRatio: "1", opacity: 0, transition: "opacity 0.9s ease" }}
      aria-hidden="true"
    />
  );
}
