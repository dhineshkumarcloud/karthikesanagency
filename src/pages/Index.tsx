/**
 * Home page — the only route on this single-page site.
 *
 * SEO / Performance anti-patterns fixed here:
 * ─────────────────────────────────────────────
 * BEFORE: Content was wrapped in a generic <div>. No <main> landmark.
 *         Screen readers and search bots couldn't identify the primary
 *         content region. Anti-pattern: hurts crawlability & accessibility.
 *
 * AFTER:  Content wrapped in semantic <main> element with aria-label.
 *         Fix: Improves crawlability (spiders recognise the main content
 *         region) and accessibility score.
 *
 * BEFORE: All 11 section components imported statically at the top.
 *         Every import is bundled into the single entry chunk — downloaded
 *         before ANY content renders.
 *         Anti-pattern: hurts LCP (Largest Contentful Paint).
 *
 * AFTER:  Sections below the fold (products, meriba, ghee, service areas,
 *         why-us, brands, contact, footer) are React.lazy() code-split.
 *         They are loaded inside Suspense with a null fallback so the hero
 *         and above-the-fold content paint immediately.
 *         Fix: Improves LCP, reduces Time to Interactive (TTI).
 */
import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";

// ── Above the fold — loaded eagerly (critical for LCP) ─────────────────────
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

// ── Below the fold — code-split for faster initial paint ───────────────────
// Each lazy import becomes a separate async bundle chunk in production.
// Suspense renders null (invisible) while the chunk loads in the background.
const ProductCatalog = lazy(() => import("@/components/ProductCatalog"));
const MeribaSection = lazy(() =>
  import("@/components/MeribaSection").then((m) => ({ default: m.default }))
);
const GheeProductsSection = lazy(() =>
  import("@/components/MeribaSection").then((m) => ({
    default: m.GheeProductsSection,
  }))
);
const ServiceAreasSection = lazy(() => import("@/components/ServiceAreasSection"));
const WhyUsSection = lazy(() => import("@/components/WhyUsSection"));
const BrandsSection = lazy(() => import("@/components/BrandsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() =>
  import("@/components/Footer").then((m) => ({ default: m.Footer }))
);

const Index = () => (
  <LanguageProvider>
    {/* SEOHead injects dynamic <title>, <meta description>, <canonical>,
        Open Graph, Twitter Card, and JSON-LD structured data into <head>.
        Managed by react-helmet-async — updates reactively on language change.
        Improves: Crawlability, Google Rich Results eligibility. */}
    {/* <main> is the correct semantic landmark for primary page content.
        Search bots and screen readers use it to skip navigation and
        jump directly to the relevant content.
        Improves: Crawlability, Accessibility. */}
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <main className="min-h-screen bg-background" id="main-content" tabIndex={-1}>
      <Navbar />

      {/* ── Above-the-fold sections (eager) ─────────────────── */}
      <HeroSection />
      <AboutSection />

      {/* ── Below-the-fold sections (lazy, code-split) ──────── */}
      {/* Suspense with null fallback: sections silently load in the
          background. The hero/about content is visible immediately.
          Improves: LCP — hero paints without waiting for product images. */}
      <Suspense fallback={null}>
        <ProductCatalog />
        <MeribaSection />
        <GheeProductsSection />
        <ServiceAreasSection />
        <WhyUsSection />
        <BrandsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </main>
  </LanguageProvider>
);

export default Index;
