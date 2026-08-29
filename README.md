# 🛒 Karthikesan Agencies — FMCG Wholesale Distribution Platform

Official website and product catalog for **Karthikesan Agencies** ([https://karthikesanagency.in/](https://karthikesanagency.in/)), a leading FMCG wholesale distribution agency located in TR Pattinam & Karaikal, Puducherry.

---

## 📌 Project Overview

Karthikesan Agencies supplies a comprehensive range of fast-moving consumer goods (FMCG) to over 300+ retailers across the Karaikal region. Key distributed categories include:
- **Soft Drinks & Beverages**: Bovonto, Campa Energy, Vibro Drink, Kalimark Badam, Ruby Badam Drink (Super Stockist), RichYaaa, Tizzo.
- **Packaged Drinking Water**: MERIBA Water, Campa Sure Water.
- **Snacks & Chips**: Bingo Yumitos, Kurkure, Mad Angles, Podaran Snacks, Alan's Chips.
- **Sweets & Peanuts**: Mani Mark Peanuts, Burfi, Chikki, Jar Packs.
- **Ghee & Beverage Blends**: Tamil Pure Cow Ghee, Chakra Gold Tea & Ghee, Levista Coffee.
- **Household Essentials**: Ponvandu Detergent Powder, Dishwash, Liquid Cleaner, Power Soaps.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Design Tokens (`index.css`)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitive components & [Lucide Icons](https://lucide.dev/)
- **Carousel & Animations**: [Embla Carousel](https://www.embla-carousel.com/) + Autoplay
- **State & Multilingual**: React Context (`LanguageContext`) supporting English & Tamil (`ta`)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Deployment**: [GitHub Pages (`gh-pages`)](https://pages.github.com/) with custom CNAME domain `karthikesanagency.in`

---

## 📁 Repository Structure

```
karthikesanagency/
├── public/
│   ├── CNAME                # Custom domain definition (karthikesanagency.in)
│   ├── favicon.ico          # Browser icon
│   ├── favicon.svg          # SVG icon
│   ├── og-image.jpg         # Open Graph preview image (1200x630)
│   ├── robots.txt           # Crawling instructions & sitemap link
│   └── sitemap.xml          # Search engine XML sitemap
├── scripts/
│   └── copy-404.mjs         # GitHub Pages SPA redirect script
├── src/
│   ├── assets/              # Product & hero image assets
│   ├── components/          # Application section components
│   │   ├── AboutSection.tsx
│   │   ├── BrandsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MeribaSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCatalog.tsx
│   │   ├── ServiceAreasSection.tsx
│   │   └── WhyUsSection.tsx
│   ├── contexts/
│   │   └── LanguageContext.tsx  # Multi-language provider & dynamic <html> lang switcher
│   ├── lib/
│   │   └── translations.ts      # English & Tamil dictionary strings
│   ├── pages/
│   │   ├── Index.tsx            # Main landing page
│   │   └── NotFound.tsx         # 404 Error page
│   ├── App.tsx                  # Core app router & query provider
│   ├── main.tsx                 # Entrypoint
│   └── index.css                # Base design system & Tailwind layers
├── index.html               # Head tags, canonical link, geo metadata & JSON-LD Schema
├── package.json             # NPM dependencies & scripts
├── README.md                # Main repository documentation
└── SEO_GUIDE.md             # Complete SEO architecture & maintenance guide
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm or bun

### Local Development
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

### Production Build & Preview
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Linting & Testing
```bash
# Run ESLint check
npm run lint

# Run Vitest test suite
npm run test
```

---

## 🔍 SEO & Metadata Architecture

The platform is optimized for local search engine visibility in **Karaikal**, **TR Pattinam**, and surrounding Puducherry areas:

- **JSON-LD Schema**: Includes `WholesaleStore`, `LocalBusiness`, `Organization`, `ItemList` / `Product`, `WebSite`, and `BreadcrumbList` schemas.
- **XML Sitemap**: `public/sitemap.xml` with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` attributes.
- **Robots.txt**: `public/robots.txt` referencing `https://karthikesanagency.in/sitemap.xml`.
- **Canonical URL**: `<link rel="canonical" href="https://karthikesanagency.in/" />`.
- **Geotargeting Metadata**: `geo.region`, `geo.placename`, `geo.position`, `ICBM`.
- **Social Previews**: Open Graph and Twitter Card tags pointing to `https://karthikesanagency.in/og-image.jpg`.
- **Accessibility & Alt Attributes**: All product images contain descriptive, keyword-enriched `alt` tags and `decoding="async"`.

For details on maintaining and extending SEO capabilities, see [SEO_GUIDE.md](file:///c:/Users/DELL/OneDrive/Desktop/karthikesanagency/SEO_GUIDE.md).

---

## 📞 Business Contact Information

- **Business Name**: Karthikesan Agencies
- **Address**: 129/236 Pandaga Salai Street, TR Pattinam, Karaikal - 609606, Puducherry
- **Phone**: +91 8973373770 / +91 9487215608
- **GSTIN**: 34FQHPK2299M1Z7
- **Business Hours**: 9:00 AM – 9:00 PM (Monday – Sunday)
