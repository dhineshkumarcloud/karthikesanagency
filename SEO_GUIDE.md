# 📈 Karthikesan Agencies — Comprehensive SEO & Testing Guide

This document provides a complete guide to Search Engine Optimization (SEO) strategies, structured data schemas, pre-rendering pipelines, image optimizations, automated test suites, and Google validation tools implemented for **Karthikesan Agencies** ([https://karthikesanagency.in/](https://karthikesanagency.in/)).

---

## 🎯 1. Core SEO Architecture & Strategy

1. **Local Search Dominance**: Ranks #1 for FMCG wholesale distribution, soft drink supply, drinking water, detergents, and ghee in **Karaikal**, **TR Pattinam**, **Polagam**, **Vanjore**, **Kottucherry**, **Thirunallar**, **Ambagarathur**, **Nedungadu**, and surrounding Puducherry areas.
2. **Brand Indexing**: Optimized for distributed brand keywords (*Bovonto wholesale Karaikal*, *Campa energy distributor TR Pattinam*, *Meriba water distributor*, *Ponvandu detergent wholesale*, *Ruby Badam drink super stockist*).
3. **Structured Data Eligibility**: Fully compliant with Google Rich Results (Local Business knowledge graph, product lists, geographic coverage, opening hours).
4. **Pre-Rendered HTML (SSG)**: Crawlers receive fully pre-rendered static HTML before React hydration via `scripts/prerender.mjs`.

---

## 🏷️ 2. Dynamic & Pre-Rendered Head Metadata

### 2.1. React Helmet Async (`SEOHead.tsx`)
Location: [`src/components/SEOHead.tsx`](file:///c:/Users/DELL/OneDrive/Desktop/karthikesanagency/src/components/SEOHead.tsx)

- **Dynamic Title & Description**: Self-referential per route.
- **Canonical Self-Referencing**: Automatically strips hash fragments to prevent duplicate content penalties.
- **Geotargeting Meta Tags**:
  - `geo.region`: `IN-PY`
  - `geo.placename`: `TR Pattinam, Karaikal, Puducherry`
  - `geo.position`: `10.825;79.838`
  - `ICBM`: `10.825, 79.838`
- **Robots Directive**: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
- **Open Graph & Twitter Cards**: Full `og:type`, `og:image` (1200x630px), `og:title`, `og:description`, and `twitter:card` tags.

---

## 🏗️ 3. Schema.org JSON-LD Structured Data

Integrated in both pre-rendered [`index.html`](file:///c:/Users/DELL/OneDrive/Desktop/karthikesanagency/index.html) and dynamic [`SEOHead.tsx`](file:///c:/Users/DELL/OneDrive/Desktop/karthikesanagency/src/components/SEOHead.tsx).

### 3.1. `WholesaleStore` / `LocalBusiness` Entity
- **Name**: Karthikesan Agencies
- **Phone**: `+91-8973373770`
- **Address**: 129/236 Pandaga Salai Street, TR Pattinam, Karaikal - 609606, Puducherry, India
- **Geo Coordinates**: `10.825, 79.838`
- **GSTIN / VatID**: `34FQHPK2299M1Z7`
- **Opening Hours**: Monday–Sunday 09:00 – 21:00
- **Area Served**: 9 target zones (*TR Pattinam, Polagam, Vanjore, Karaikal, Kottucherry, Poovam, Thirunallar, Ambagarathur, Nedungadu*)

### 3.2. `WebSite` Entity
- Multilingual indexing support (`en`, `ta`).

### 3.3. `ItemList` Entity
- Structured list of all 13 core distributed FMCG brands for search snippet enhancements.

---

## 🧪 4. Testing & Validation Protocols

### 4.1. Automated SEO Test Suite (Vitest)
Location: [`src/test/seo.test.ts`](file:///c:/Users/DELL/OneDrive/Desktop/karthikesanagency/src/test/seo.test.ts)

Run tests locally anytime:
```bash
npm run test
```
**Passing Assertions**:
- ✅ Confirms valid `<title>`, `<meta name="description">`, `<link rel="canonical">`, and `<meta name="robots">`.
- ✅ Validates JSON-LD `WholesaleStore` entity schema parsing and required fields.
- ✅ Verifies `sitemap.xml` clean URL structure (no hash fragments) and `robots.txt` connection.

### 4.2. Google Rich Results Testing
1. Visit [Google Rich Results Test](https://search.google.com/test/rich-results).
2. Enter your live URL: `https://karthikesanagency.in/` (or paste HTML from `dist/index.html`).
3. Confirms zero syntax errors and highlights recognized rich items (`WholesaleStore`, `ItemList`).

### 4.3. Google PageSpeed Insights & Lighthouse
1. Open [PageSpeed Insights](https://pagespeed.web.dev/).
2. Analyze live mobile and desktop URLs (aim for 90+ score).
3. **Local Testing**: Run `npm run preview`, open Chrome DevTools (`F12`), navigate to **Lighthouse**, select **SEO** & **Performance**, and click **Analyze page load**.

### 4.4. Schema Markup Validator (Schema.org)
1. Open [Schema Markup Validator](https://validator.schema.org/).
2. Submit your live site URL or raw HTML output to inspect the structured data graph.

---

## ⚡ 5. Build, Pre-rendering & Deployment Pipeline

### 5.1. Build & SSG Pre-render Command
```bash
npm run build
```
Executes:
1. `vite build` — Bundles React application into `dist/`.
2. `node scripts/prerender.mjs` — Injects fully pre-rendered SEO HTML into `dist/index.html`.
3. `node scripts/copy-404.mjs` — Creates SPA fallback for GitHub Pages routing.

### 5.2. Deploy to Live Site
```bash
npm run deploy
```
Executes `predeploy` build step and publishes the production `dist/` directory to the `gh-pages` deployment branch.

---

## 📋 6. Maintenance Checklist for New Brands

When adding new products or brands:
1. Update translations in `src/lib/translations.ts`.
2. Add brand images into `src/assets/` with descriptive WebP formatting and keyword-rich `alt` text.
3. Update `ItemList` brand names in `src/components/SEOHead.tsx`.
4. Run `npm run test` to confirm test suite pass.
5. Deploy changes using `npm run deploy`.
