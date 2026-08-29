# 📈 Karthikesan Agencies — SEO Architecture & Maintenance Guide

This document explains the Search Engine Optimization (SEO) strategies implemented across the **Karthikesan Agencies** codebase ([https://karthikesanagency.in/](https://karthikesanagency.in/)), detailing structured data schemas, sitemaps, metadata management, geotargeting, and best practices for future updates.

---

## 🎯 1. Core SEO Goals

1. **Local Search Dominance**: Rank #1 for queries related to FMCG distribution, wholesale beverages, packaged drinking water, detergent, ghee, and snack supply in **Karaikal**, **TR Pattinam**, **Polagam**, **Vanjore**, **Kottucherry**, and surrounding Puducherry areas.
2. **Brand & Product Indexing**: Ensure high visibility for key distributed brand keywords (e.g. *Bovonto wholesale Karaikal*, *Campa energy distributor TR Pattinam*, *Meriba packaged water supply*, *Ponvandu detergent wholesale*, *Ruby Badam drink super stockist*).
3. **Structured Data Eligibility**: Qualify for Google Rich Results (Local Business knowledge graph, product lists, breadcrumbs, opening hours, area served).

---

## 🏷️ 2. HTML Head & Metadata Configuration (`index.html`)

The [`index.html`](file:///c:/Users/DELL/OneDrive/Desktop/karthikesanagency/index.html) file contains pre-rendered, crawlable meta tags ensuring immediate indexing even before React hydration completes:

### Key Meta Tags Included:
- **Title Tag**: `Karthikesan Agencies - FMCG Distribution • Karaikal & TR Pattinam Surroundings`
- **Meta Description**: Concise summary targeting FMCG wholesale distributors, soft drinks, water, snacks, ghee, and detergent supply.
- **Canonical Link**: `<link rel="canonical" href="https://karthikesanagency.in/" />` (Prevents duplicate content penalties).
- **Robots Directive**: `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`.

### Local Geotargeting Meta Tags:
- `geo.region`: `IN-PY` (India - Puducherry)
- `geo.placename`: `TR Pattinam, Karaikal, Puducherry`
- `geo.position`: `10.825;79.838`
- `ICBM`: `10.825, 79.838`

### Open Graph & Twitter Cards:
- `og:type`: `website`
- `og:url`: `https://karthikesanagency.in/`
- `og:image`: `https://karthikesanagency.in/og-image.jpg` (1200x630px hosted banner)
- `twitter:card`: `summary_large_image`

---

## 🏗️ 3. Schema.org JSON-LD Structured Data

Located within `<script type="application/ld+json">` in [`index.html`](file:///c:/Users/DELL/OneDrive/Desktop/karthikesanagency/index.html).

### 3.1. `WholesaleStore` / `LocalBusiness` Schema
Defines the business entity:
- **`name`**: Karthikesan Agencies
- **`telephone`**: `+91-8973373770`
- **`address`**: 129/236 Pandaga Salai Street, TR Pattinam, Karaikal - 609606, Puducherry, India
- **`geo`**: Latitude `10.825`, Longitude `79.838`
- **`vatID`**: `34FQHPK2299M1Z7` (GSTIN)
- **`openingHoursSpecification`**: Monday through Sunday 09:00 - 21:00
- **`areaServed`**: 9 target service zones (TR Pattinam, Polagam, Vanjore, Karaikal, Kottucherry, Poovam, Thirunallar, Ambagarathur, Nedungadu)

### 3.2. `WebSite` Schema
Identifies the website structure and multilingual capabilities (`en`, `ta`).

### 3.3. `ItemList` Schema
Lists all key distributed brands (Bovonto, Campa, Meriba, Ponvandu, Power Soaps, Ruby, Mani Mark, Tamil Ghee, Chakra Gold, Levista) to enrich search snippets.

---

## 🗺️ 4. XML Sitemap & Robots.txt

### 4.1. `sitemap.xml`
File path: [`public/sitemap.xml`](file:///c:/Users/DELL/OneDrive/Desktop/karthikesanagency/public/sitemap.xml)
- Formatted according to the Sitemaps.org 0.9 protocol.
- Lists the primary domain and section anchors (`#about`, `#products`, `#meriba`, `#serviceAreas`, `#brands`, `#contact`) with priority weightings up to `1.0`.

### 4.2. `robots.txt`
File path: [`public/robots.txt`](file:///c:/Users/DELL/OneDrive/Desktop/karthikesanagency/public/robots.txt)
- Grants unrestricted indexing access to search bots (`User-agent: *`, `Allow: /`).
- Specifies direct location of the sitemap:
  `Sitemap: https://karthikesanagency.in/sitemap.xml`

---

## 🌐 5. Dynamic Language Tag Sync (`LanguageContext.tsx`)

Search engines recommend syncing the HTML `lang` attribute with user language changes. In [`src/contexts/LanguageContext.tsx`](file:///c:/Users/DELL/OneDrive/Desktop/karthikesanagency/src/contexts/LanguageContext.tsx):

```tsx
useEffect(() => {
  document.documentElement.lang = lang; // Switches between 'en' and 'ta'
}, [lang]);
```

---

## 🖼️ 6. Image Optimization & Accessibility Guidelines

When adding new product images or banners to the project:
1. **Descriptive `alt` Attributes**: Always provide keyword-rich alt descriptions (e.g. `alt="Bovonto Soft Drink Wholesale Distribution Karaikal"` instead of `alt="product"`).
2. **Asynchronous Decoding**: Include `decoding="async"` on product images to prevent UI thread blocking.
3. **Lazy Loading**: Use `loading="lazy"` on below-the-fold product cards and `loading="eager"` only on the hero carousel image.
4. **Dimensions & Aspect Ratio**: Specify CSS `aspect-ratio` or container dimensions to prevent Cumulative Layout Shift (CLS).

---

## 📋 7. Checklist for Adding New Brands / Products

When introducing a new product or brand into the catalog:

1. **Update `src/lib/translations.ts`**: Add brand name to both English and Tamil dictionaries.
2. **Update `ProductCatalog.tsx` or `MeribaSection.tsx`**: Add product image asset with a descriptive `alt` string containing location keywords (*Karaikal / TR Pattinam*).
3. **Update `index.html` JSON-LD**: Add the new brand item to the `ItemList` array inside the structured data script.
4. **Re-build & Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```
