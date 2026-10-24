import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";

const browserPath =
  process.env.CHROME_PATH ||
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find(existsSync);
if (!browserPath) throw new Error("Set CHROME_PATH to an installed Chrome or Edge browser.");
const tempRoot = resolve(tmpdir());
const profile = await mkdtemp(join(tempRoot, "agency-responsive-"));
const browser = spawn(
  browserPath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { windowsHide: true, stdio: "ignore" },
);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
try {
  let port;
  for (let i = 0; i < 50; i++) {
    try {
      port = (await readFile(join(profile, "DevToolsActivePort"), "utf8")).split("\n")[0];
      break;
    } catch {
      await delay(200);
    }
  }
  if (!port) throw new Error("Browser did not start");
  const tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  socket = new WebSocket(tabs.find((tab) => tab.type === "page").webSocketDebuggerUrl);
  await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
  let sequence = 0;
  const pending = new Map();
  const errors = [];
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === "Runtime.exceptionThrown")
      errors.push(
        message.params.exceptionDetails.text +
          ": " +
          message.params.exceptionDetails.exception?.description,
      );
    if (message.id) {
      const item = pending.get(message.id);
      pending.delete(message.id);
      message.error ? item.reject(message.error) : item.resolve(message.result);
    }
  });
  const cdp = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++sequence;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) => {
    const result = await cdp("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (result.exceptionDetails)
      throw new Error(
        result.exceptionDetails.exception?.description || "Browser expression failed",
      );
    return result.result.value;
  };
  await cdp("Page.enable");
  await cdp("Runtime.enable");
  await cdp("Page.navigate", { url: process.env.PREVIEW_URL || "http://127.0.0.1:8080/" });
  for (let i = 0; i < 80; i++) {
    if (await evaluate("!!document.querySelector('#contact')")) break;
    await delay(250);
  }
  const reports = [];
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1366, 1440]) {
    await cdp("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('visible'))");
    await delay(900);
    const report = await evaluate(`(()=>{
      const overflow=[...document.querySelectorAll('h1,h2,h3,h4,.hero-description,.showcase-heading p,.contact-aside p,.footer-logo')].filter(e=>!e.closest('.brand-showcase,.lightbox')).filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left < -2 || r.right>document.documentElement.clientWidth+2 || e.scrollWidth>e.clientWidth+3)}).map(e=>({text:e.textContent.slice(0,60),width:e.clientWidth,scroll:e.scrollWidth,left:Math.round(e.getBoundingClientRect().left),right:Math.round(e.getBoundingClientRect().right)}));
      const broken=[...document.querySelectorAll('img')].filter(i=>!i.closest('.leaflet-container')&&i.complete&&i.naturalWidth===0).map(i=>i.src);
      return {width:innerWidth,page:document.documentElement.scrollWidth,overflow,broken};
    })()`);
    reports.push(report);
    console.log(JSON.stringify(report));
    if ([375, 1366].includes(width)) {
      for (const section of [
        "hero",
        "shelf-bovonto",
        "shelf-nabati",
        "brands",
        "serviceAreas",
        "contact",
      ]) {
        await evaluate(
          `document.getElementById('${section}').scrollIntoView({behavior:'instant',block:'start'})`,
        );
        await delay(250);
        const screenshot = await cdp("Page.captureScreenshot", {
          format: "png",
          captureBeyondViewport: false,
        });
        await writeFile(
          join(tempRoot, `agency-${width}-${section}.png`),
          Buffer.from(screenshot.data, "base64"),
        );
      }
    }
    if (width === 375) {
      await evaluate("document.querySelector('.menu-button').click()");
      if (!(await evaluate("!!document.querySelector('.mobile-nav')")))
        throw new Error("Mobile menu did not open");
      await evaluate("document.querySelector('.mobile-nav button').click()");
      if (await evaluate("!!document.querySelector('.mobile-nav')"))
        throw new Error("Mobile menu did not close");
      await evaluate("document.querySelector('.showcase-product-single').click()");
      if (!(await evaluate("!!document.querySelector('[role=dialog]')")))
        throw new Error("Product preview did not open");
      await evaluate("document.querySelector('.modal-close').click()");
    }
  }
  console.log("Screenshots: " + tempRoot);
  if (errors.length) throw new Error(errors.join("\n"));
  if (
    reports.some(
      (report) => report.page > report.width || report.overflow.length || report.broken.length,
    )
  )
    process.exitCode = 1;
  await cdp("Browser.close");
} finally {
  socket?.close();
  browser.kill();
  await delay(400);
  if (resolve(profile).startsWith(tempRoot + sep)) {
    try {
      await rm(profile, { recursive: true, force: true });
    } catch {}
  }
}
