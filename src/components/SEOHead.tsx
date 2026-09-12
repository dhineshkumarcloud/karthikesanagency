/**
 * SEOHead Component
 *
 * Dynamically manages the document <head> via react-helmet-async.
 * Canonical URL is derived from window.location.href (hash stripped) so
 * each route self-references correctly for crawlers.
 *
 * Improves: Crawlability, LCP (meta/title before hydration), Rich Results.
 */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  /** Fallback before hydration; overridden by window.location.href */
  canonical?: string;
  noindex?: boolean;
}

const SITE_NAME = "Karthikesan Agencies";
const DEFAULT_TITLE =
  "Karthikesan Agencies - FMCG Distribution Karaikal";
const DEFAULT_DESCRIPTION =
  "Trusted FMCG wholesale distributor in Karaikal & TR Pattinam. Bovonto, Campa, Meriba Water, Ponvandu, Power Soaps, Ruby Badam, Mani Mark, Tamil Ghee & Levista Coffee.";
const OG_IMAGE = "https://karthikesanagency.in/og-image.jpg";
const SITE_URL = "https://karthikesanagency.in/";

const JSON_LD = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    alternateName: "Karthikesan Agencies FMCG Distribution",
    url: SITE_URL,
    logo: OG_IMAGE,
    image: OG_IMAGE,
    description: DEFAULT_DESCRIPTION,
    telephone: "+91-8973373770",
    priceRange: "$$",
    vatID: "34FQHPK2299M1Z7",
    address: {
      "@type": "PostalAddress",
      streetAddress: "129/236 Pandaga Salai Street, TR Pattinam",
      addressLocality: "Karaikal",
      addressRegion: "Puducherry",
      postalCode: "609606",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.825,
      longitude: 79.838,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    areaServed: [
      "TR Pattinam",
      "Polagam",
      "Vanjore",
      "Karaikal",
      "Kottucherry",
      "Poovam",
      "Thirunallar",
      "Ambagarathur",
      "Nedungadu",
    ].map((name) => ({ "@type": "AdministrativeArea", name })),
    sameAs: [
      "https://www.instagram.com/karthikesanagencies?igsh=dGlzdXZwZHdiOTZi",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}#organization` },
    inLanguage: ["en", "ta"],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FMCG Brands Distributed by Karthikesan Agencies",
    itemListElement: [
      "Bovonto Soft Drinks",
      "Campa Energy & Beverages",
      "Campa Sure Packaged Drinking Water",
      "MERIBA Packaged Drinking Water",
      "Ruby Badam Drink (Super Stockist)",
      "Ponvandu Detergent & Fabric Care",
      "Power Soaps",
      "Bingo Snacks & Yumitos",
      "Podaran Snacks",
      "Mani Mark Peanuts, Burfi & Chikki",
      "Tamil Pure Cow Ghee",
      "Chakra Gold Tea & Ghee",
      "Levista Instant & Filter Coffee",
    ].map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "FMCG Brands Catalog", item: `${SITE_URL}#products` },
      { "@type": "ListItem", position: 3, name: "MERIBA Water Distribution", item: `${SITE_URL}#meriba` },
      { "@type": "ListItem", position: 4, name: "Contact & Service Areas", item: `${SITE_URL}#contact` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What FMCG products and brands are distributed by Karthikesan Agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Karthikesan Agencies is an authorized wholesale distributor in Karaikal and TR Pattinam for Bovonto, Campa Energy & Beverages, MERIBA Packaged Drinking Water, Ruby Badam Drink (Super Stockist), Ponvandu Detergent, Power Soaps, Bingo Snacks, Podaran Snacks, Mani Mark Peanuts & Chikki, Tamil Pure Cow Ghee, Chakra Gold Tea, and Levista Coffee.",
        },
      },
      {
        "@type": "Question",
        name: "Which areas in Puducherry and Karaikal do Karthikesan Agencies deliver to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide direct wholesale delivery to over 300+ retail stores in TR Pattinam, Polagam, Vanjore, Karaikal town, Kottucherry, Poovam, Thirunallar, Ambagarathur, and Nedungadu.",
        },
      },
      {
        "@type": "Question",
        name: "How can retail store owners place a bulk wholesale order?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Retailers can contact Karthikesan Agencies directly by calling +91-8973373770 or +91-9487215608, or visiting our distribution facility at 129/236 Pandaga Salai Street, TR Pattinam, Karaikal 609606.",
        },
      },
    ],
  },
]);

const SEOHead = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical: canonicalFallback = SITE_URL,
  noindex = false,
}: SEOHeadProps) => {
  const location = useLocation();
  const [canonical, setCanonical] = useState(canonicalFallback);

  useEffect(() => {
    // Self-referential canonical — required for correct index signals on each route.
    setCanonical(window.location.href.split("#")[0]);
  }, [location.pathname, location.search]);

  const robotsContent = noindex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta name="geo.region" content="IN-PY" />
      <meta name="geo.placename" content="TR Pattinam, Karaikal, Puducherry" />
      <meta name="geo.position" content="10.825;79.838" />
      <meta name="ICBM" content="10.825, 79.838" />
      <meta name="robots" content={robotsContent} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">{JSON_LD}</script>
    </Helmet>
  );
};

export default SEOHead;
