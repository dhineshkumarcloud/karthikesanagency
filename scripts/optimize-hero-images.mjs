/**
 * Converts hero carousel source images to WebP at max 960px width.
 * Run: node scripts/optimize-hero-images.mjs
 *
 * Improves: LCP — hero assets drop from ~2 MB PNGs to ~80–150 KB WebP.
 */
import { resolve, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = resolve(__dirname, "../src/assets");

/** Source files used by HeroSection carousel (largest LCP offenders first). */
const HERO_SOURCES = [
  "carousal_bingo.png",
  "carousal_ponvandu.png",
  "carousal_campa.png",
  "Gemini_Generated_Image_5sy1yv5sy1yv5sy1.png",
  "carousal_meriba.png",
  "carousal_bovonto.png",
  "power-soap1.png",
  "hero-campa-purple.jpg",
  "all-juice.jpeg",
  "sure-water.webp",
];

const MAX_WIDTH = 960;
const WEBP_QUALITY = 80;

async function optimizeOne(filename) {
  const inputPath = resolve(assetsDir, filename);
  const stem = basename(filename, extname(filename));
  const outputPath = resolve(assetsDir, `${stem}.webp`);

  const info = await sharp(inputPath)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(outputPath);

  const savedKb = Math.round(info.size / 1024);
  console.log(`  ✓ ${filename} → ${stem}.webp (${info.width}×${info.height}, ${savedKb} KB)`);
  return { stem, savedKb };
}

console.log("Optimizing hero carousel images to WebP (max width 960px)…\n");

const results = [];
for (const file of HERO_SOURCES) {
  try {
    results.push(await optimizeOne(file));
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
  }
}

const totalKb = results.reduce((sum, r) => sum + r.savedKb, 0);
console.log(`\nDone — ${results.length} WebP files written (~${totalKb} KB total).`);
