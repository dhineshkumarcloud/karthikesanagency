/**
 * Post-build prerender: captures fully rendered React HTML via headless Chrome
 * and embeds it into dist/index.html for crawlers that don't execute JS.
 *
 * Run automatically after `vite build`. Requires dist/ to exist.
 *
 * Improves: Crawlability — bots receive real page content in initial HTML.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createServer } from "node:http";
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const ROOT = resolve(process.cwd());
const DIST = resolve(ROOT, "dist");
const WAIT_MS = 8000;
const CHROME_EXECUTABLE = process.env.CHROME_EXECUTABLE || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

function startPreviewServer() {
  return new Promise((resolvePromise, reject) => {
    const server = createServer((request, response) => {
      const pathname = decodeURIComponent(new URL(request.url || "/", "http://localhost").pathname);
      const requested = resolve(DIST, `.${pathname === "/" ? "/index.html" : pathname}`);
      const file = requested.startsWith(DIST) && existsSync(requested)
        ? requested
        : resolve(DIST, "index.html");
      const type = file.endsWith(".js") ? "text/javascript" : file.endsWith(".css") ? "text/css" : file.endsWith(".svg") ? "image/svg+xml" : file.endsWith(".webp") ? "image/webp" : file.endsWith(".png") ? "image/png" : file.endsWith(".jpg") || file.endsWith(".jpeg") ? "image/jpeg" : "text/html";
      response.writeHead(200, { "Content-Type": type });
      response.end(readFileSync(file));
    });
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolvePromise({ server, url: `http://127.0.0.1:${address.port}/` });
    });
  });
}

function stopServer(instance) {
  if (instance?.server) {
    instance.server.close();
  }
}

async function prerender() {
  console.log("Prerendering index.html for SEO…");

  let server;
  let browser;

  try {
    server = await startPreviewServer();
    await new Promise((r) => setTimeout(r, 1500));

    browser = await puppeteer.launch({
      headless: true,
      executablePath: CHROME_EXECUTABLE,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    await page.goto(server.url, { waitUntil: "networkidle0", timeout: 90_000 });

    await page.waitForSelector("#main-content", { timeout: 30_000 });
    await page.waitForSelector("#hero h1", { timeout: 30_000 });

    // Wait for lazy below-fold sections to hydrate
    await page
      .waitForSelector("#products", { timeout: WAIT_MS })
      .catch(() => undefined);
    await page
      .waitForSelector("#contact", { timeout: WAIT_MS })
      .catch(() => undefined);

    await new Promise((r) => setTimeout(r, 2000));

    const rootHtml = await page.evaluate(() => {
      const root = document.getElementById("root");
      return root ? root.innerHTML : "";
    });

    if (!rootHtml.trim()) {
      throw new Error("Prerender produced empty #root content");
    }

    const indexPath = resolve(DIST, "index.html");
    let html = readFileSync(indexPath, "utf8");

    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${rootHtml}</div>`
    );

    if (!html.includes('id="root"') || html.includes('<div id="root"></div>')) {
      html = html.replace(
        /<div id="root"><\/div>/,
        `<div id="root">${rootHtml}</div>`
      );
    }

    writeFileSync(indexPath, html, "utf8");

    const sizeKb = Math.round(Buffer.byteLength(html, "utf8") / 1024);
    console.log(`  ✓ Prerendered dist/index.html (~${sizeKb} KB with embedded content)`);
  } finally {
    if (browser) await browser.close();
    stopServer(server);
  }
}

prerender().catch((err) => {
  console.error("Prerender failed:", err.message);
  process.exit(1);
});
