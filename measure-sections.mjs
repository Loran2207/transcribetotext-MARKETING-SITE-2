import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.emulateMedia({ reducedMotion: "reduce" });
await p.addInitScript(() => { try { localStorage.setItem("ttt_cookie_consent", JSON.stringify({ necessary:true, functional:true, analytics:true, marketing:true })); } catch {} });
await p.goto("http://localhost:4600/", { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
const full = await p.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight));
await p.setViewportSize({ width: 1440, height: Math.min(24000, full + 200) });
await p.reload({ waitUntil: "networkidle" });
await p.waitForTimeout(3000);
const rows = await p.evaluate(() => {
  const out = [];
  document.querySelectorAll("main > section, main > div > section, section").forEach((s) => {
    const r = s.getBoundingClientRect();
    if (r.height < 80) return;
    const h = s.querySelector("h1, h2");
    out.push({ y: Math.round(r.top + window.scrollY), h: Math.round(r.height), title: (h ? h.innerText : "").replace(/\s+/g, " ").slice(0, 60) });
  });
  return out;
});
console.log(JSON.stringify(rows, null, 0));
await b.close();
