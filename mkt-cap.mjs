/* Marketing site capture, one route at one width.
 *
 *   node mkt-cap.mjs <route> <width> <cid|-> <endpoint|out.png>
 *
 * route is a path without the leading slash: "" for the landing, "subscribe",
 * "login", "skip". With cid "-" the last argument is a PNG path, so a frame can
 * be staged and read with eyes before a capture id is spent on it.
 *
 * The site reveals its blocks with framer-motion whileInView(once), so a capture
 * taken at a normal viewport arrives with everything below the fold still at
 * opacity 0 - an artifact that reads as a broken page. The fix that has always
 * worked here: grow the viewport to the whole document, reload, and let every
 * reveal fire at once.
 */
import { chromium } from "playwright";

const CAP = "https://mcp.figma.com/mcp/html-to-design/capture.js";

const [routeArg, widthArg, cid, target, selArg, tabArg] = process.argv.slice(2);
/* Optional 5th arg: a CSS selector to capture one section as its own frame
   (used for the feature-tab state frames). Defaults to the whole page. */
const SEL = selArg || "body";
const PORT = process.env.MKT_PORT || "4600";
const BASE = `http://localhost:${PORT}`;
const width = +widthArg;
const route = (routeArg || "").replace(/^\/+/, "");
const preview = cid === "-";
/* Real device heights, so a frame never shows space no one will ever see. */
const DEVICE_H = width >= 1024 ? 900 : width >= 700 ? 1024 : 844;

const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width, height: DEVICE_H },
  deviceScaleFactor: 2,
});
const p = await ctx.newPage();

/* The hero satellites drift a few px under framer-motion; reduced motion pins
 * them at their base position so the frame matches the code exactly. */
await p.emulateMedia({ reducedMotion: "reduce" });

/* The consent banner is its own frame elsewhere; on every other frame it is a
 * bar over the footer. Seeded before the first paint so it never flashes. */
await p.addInitScript(() => {
  try {
    localStorage.setItem(
      "ttt_cookie_consent",
      JSON.stringify({ necessary: true, functional: true, analytics: true, marketing: true })
    );
  } catch {}
});

await p.goto(`${BASE}/${route}`, { waitUntil: "networkidle" });
await p.waitForTimeout(1200);

/* Grow to the whole document and reload: every whileInView block is inside the
 * viewport from the first frame, so they all reveal. */
const full = await p.evaluate(() =>
  Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
);
const tall = Math.min(24000, Math.max(DEVICE_H, full + 200));
await p.setViewportSize({ width, height: tall });
await p.reload({ waitUntil: "networkidle" });
await p.waitForTimeout(3800);
/* A nudge down and back: a few blocks only arm their observer after a scroll
 * event, and this is cheaper than guessing which ones. */
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p.waitForTimeout(900);
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(900);

/* Anything still transparent would land in the frame as a hole. Report it, and
 * force it visible rather than shipping a page with gaps in it. */
const stuck = await p.evaluate(() => {
  let n = 0;
  document.querySelectorAll("main *, footer *, header *").forEach((el) => {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 0.05 && el.getBoundingClientRect().height > 24) {
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
      n++;
    }
  });
  return n;
});
if (stuck) console.log("forced visible:", stuck);

await p.addStyleTag({
  content: "*{animation:none!important;transition:none!important}",
}).catch(() => {});

/* html-to-design cannot serialise a canvas - it lands in Figma as an empty
 * box. Bake every painted canvas into an img wearing the same geometry. */
const baked = await p.evaluate(() => {
  let n = 0;
  document.querySelectorAll("canvas").forEach((c) => {
    try {
      const url = c.toDataURL("image/png");
      const img = document.createElement("img");
      img.src = url;
      const cs = getComputedStyle(c);
      img.style.cssText = c.style.cssText;
      img.style.width = cs.width;
      img.style.height = cs.height;
      img.style.opacity = "1";
      c.replaceWith(img);
      n++;
    } catch {}
  });
  return n;
});
if (baked) console.log("baked canvases:", baked);

/* html-to-design serialises the DOM without any scroll offset, so a carousel
 * centred by JS arrives showing its first card. Bake the offset into a margin. */
const flattened = await p.evaluate(() => {
  let n = 0;
  document.querySelectorAll("*").forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    const st = getComputedStyle(el);
    if (!/(auto|scroll)/.test(st.overflowX)) return;
    if (!el.scrollLeft) return;
    const first = el.firstElementChild;
    if (!(first instanceof HTMLElement)) return;
    first.style.marginLeft = `-${el.scrollLeft}px`;
    el.style.overflow = "hidden";
    el.scrollLeft = 0;
    n++;
  });
  return n;
});
if (flattened) console.log("flattened scrollers:", flattened);

/* The converter honours the clip but not the ellipsis: a truncated line lands
 * cut off mid-letter, which reads as a bug rather than as a long value. */
await p.evaluate(() => {
  const CUT = "...";
  const fits = (el) => el.scrollWidth <= el.clientWidth + 1;
  const lastText = (el) => {
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let last = null;
    let n = walk.nextNode();
    while (n) {
      if (n.nodeValue && n.nodeValue.trim()) last = n;
      n = walk.nextNode();
    }
    return last;
  };
  const targets = [];
  document.querySelectorAll("*").forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    if (getComputedStyle(el).textOverflow !== "ellipsis") return;
    if (fits(el)) { el.style.overflow = "visible"; return; }
    targets.push(el);
  });
  for (const el of targets) {
    const node = lastText(el);
    if (!node) continue;
    const fullText = node.nodeValue;
    let lo = 0;
    let hi = fullText.length;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      node.nodeValue = fullText.slice(0, mid) + CUT;
      if (fits(el)) lo = mid;
      else hi = mid - 1;
    }
    let head = fullText.slice(0, lo);
    while (head.length && head[head.length - 1] === " ") head = head.slice(0, -1);
    node.nodeValue = head + CUT;
  }
});

await p.mouse.move(2, 2);
await p.waitForTimeout(400);

/* The converter flattens position:fixed into flow, so a pinned bar would land
 * wherever its markup happens to sit. The viewport is the whole document here,
 * so a fixed element's on-screen box already IS its document box: freeze each
 * one at exactly those coordinates. An earlier version sent every fixed element
 * to the foot of the page, which parked the header on top of the footer. */
await p.evaluate(() => {
  document.querySelectorAll("body *").forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    if (getComputedStyle(el).position !== "fixed") return;
    const r = el.getBoundingClientRect();
    if (r.height < 8 || r.width < 8) return;
    el.style.position = "absolute";
    el.style.top = `${Math.round(r.top + window.scrollY)}px`;
    el.style.left = `${Math.round(r.left + window.scrollX)}px`;
    el.style.width = `${Math.round(r.width)}px`;
    el.style.right = "auto";
    el.style.bottom = "auto";
    el.style.transform = "none";
  });
});
await p.waitForTimeout(250);

/* Optional 6th arg: which feature tab to open before capturing, so each of the
   four states can be its own frame. The tabs are the buttons in the grid that
   opens the section; index 0 is the one the page loads with. */
if (tabArg !== undefined) {
  await p.evaluate((n) => {
    const tabs = document.querySelectorAll("#features button");
    if (tabs[n]) tabs[n].click();
  }, +tabArg);
  await p.waitForTimeout(700);
}

const shell = await p.evaluate(() => {
  const root = document.getElementById("root");
  return {
    mounted: !!root && root.children.length > 0,
    nodes: document.querySelectorAll("*").length,
    text: (document.body.innerText || "").trim().length,
    overlay: document.querySelectorAll("vite-error-overlay").length,
    w: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    h: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
  };
});
console.log("page:", JSON.stringify(shell));
if (!shell.mounted || shell.nodes < 40 || shell.overlay > 0) {
  console.log("bad page - refusing");
  await b.close();
  process.exit(1);
}
if (shell.w > width + 1) {
  console.log(`page is ${shell.w} wide at viewport ${width} - refusing`);
  await b.close();
  process.exit(1);
}

if (preview) {
  await p.screenshot({ path: target, fullPage: true });
  console.log("saved", target);
} else {
  await p.evaluate((t) => { document.title = t; }, `${route || "landing"} :: ${width}`);
  const src = await p.evaluate(async (u) => (await fetch(u)).text(), CAP);
  await p.evaluate(src);
  const posted = p
    .waitForResponse((r) => r.url().includes("/submit") && r.request().method() === "POST", { timeout: 240000 })
    .catch(() => null);
  await p.evaluate(
    ([c, ep, sel]) => { window.figma.captureForDesign({ captureId: c, endpoint: ep, selector: sel }); },
    [cid, target, SEL]
  );
  const res = await posted;
  console.log("submitted", res ? res.status() : "no POST seen in 240s");
}
await b.close();
process.exit(0);
