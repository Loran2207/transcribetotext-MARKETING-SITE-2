/* Shoot one element of the marketing site at one width.
 *   node shot-el.mjs <route> <width> <selector> <out.png> [queryString]
 * Reveals every whileInView block by growing the viewport, exactly as mkt-cap does. */
import { chromium } from "playwright";

const [routeArg, widthArg, sel, out, qs] = process.argv.slice(2);
const PORT = process.env.MKT_PORT || "4600";
const width = +widthArg;
const route = (routeArg || "").replace(/^\/+/, "");
const DEVICE_H = width >= 1024 ? 900 : width >= 700 ? 1024 : 844;

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width, height: DEVICE_H }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.emulateMedia({ reducedMotion: "reduce" });
await p.addInitScript(() => {
  try {
    localStorage.setItem("ttt_cookie_consent", JSON.stringify({ necessary: true, functional: true, analytics: true, marketing: true }));
  } catch {}
});
await p.goto(`http://localhost:${PORT}/${route}${qs || ""}`, { waitUntil: "networkidle" });
await p.waitForTimeout(1000);
const full = await p.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight));
await p.setViewportSize({ width, height: Math.min(24000, Math.max(DEVICE_H, full + 200)) });
await p.reload({ waitUntil: "networkidle" });
await p.waitForTimeout(3200);
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p.waitForTimeout(700);
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(700);
await p.evaluate(() => {
  document.querySelectorAll("main *, footer *, header *").forEach((el) => {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 0.05 && el.getBoundingClientRect().height > 24) {
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
    }
  });
});
await p.waitForTimeout(300);
const shell = await p.evaluate(() => ({
  mounted: !!document.getElementById("root")?.children.length,
  nodes: document.querySelectorAll("*").length,
  overlay: document.querySelectorAll("vite-error-overlay").length,
}));
if (!shell.mounted || shell.nodes < 40 || shell.overlay > 0) {
  console.log("bad page:", JSON.stringify(shell));
  await b.close();
  process.exit(1);
}
const el = await p.$(sel);
if (!el) { console.log("selector not found:", sel); await b.close(); process.exit(1); }
await el.screenshot({ path: out });
const box = await el.boundingBox();
console.log("saved", out, JSON.stringify(box));
await b.close();
process.exit(0);
