import { GlassWater, Cookie, Nut, SprayCan, Star, X, Flame } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Soft drinks — Bovonto now includes vibro & kalimark-badam
import bovontoNewImg from "@/assets/Bovonto.webp";
import vibroImg from "@/assets/vibro-gemini.png";
import kalimarkBadamImg from "@/assets/Kalimark-badam-gemini.jpg";
import campaFlavourImg from "@/assets/Campa-flavour-gemini-1.jpg";
import campaEnergyNewImg from "@/assets/campa-energy-2.jpeg";
import campaEnergyBlastImg from "@/assets/campa-energy-blast.png";
import rubyMainImg from "@/assets/Ruby-main-gemini.jpg";
import rubyJuiceImg from "@/assets/ruby-juice.jpeg";
import rubyFlavourImg from "@/assets/flavour.jpeg";
import rubyMilkeeRoseImg from "@/assets/milkee-gemini.jpg";

// Other soft drinks
import richyaaaImg from "@/assets/product-richyaaa.jpg";
import tizzoImg from "@/assets/product-tizzo.jpg";

// Snacks
import podaranImg from "@/assets/product-podaran.jpg";
import bingoImg from "@/assets/product-bingo-yumitos.webp";
import kurkureImg from "@/assets/product-bingo-kurkure.webp";
import madAnglesImg from "@/assets/product-bingo-mad-angles.webp";
import alansImg from "@/assets/product-alans-chips.jpg";

// Peanut
import maniMarkImg from "@/assets/product-manimark-peanuts.jpg";
import maniMarkBurfiImg from "@/assets/product-manimark-burfi.jpg";
import peanutChikkiImg from "@/assets/product-peanut-chikki.jpg";
import maniMarkJarImg from "@/assets/product-manimark-jar.webp";

// Chakra Gold (Tea / Ghee product)
import teaGeminiImg from "@/assets/tea-gemini.jpg";

// Household
import ponvanduImg from "@/assets/product-ponvandu.jpg";
import ponvanduDishwashImg from "@/assets/product-ponvandu-dishwash.jpg";
import ponvanduFabricImg from "@/assets/product-ponvandu-fabric.jpg";
import powerSoapsImg from "@/assets/product-power-soaps.png";

type ProductImage = { name: string; src: string };

/* ─── Product Preview Modal ─── */
const ProductPreview = ({ preview, onClose }: { preview: ProductImage | null; onClose: () => void }) => {
  useEffect(() => {
    if (!preview) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [preview, onClose]);

  if (!preview) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur-sm p-4 flex items-center justify-center"
      role="dialog" aria-modal="true" aria-label={preview.name} onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl shadow-2xl overflow-hidden border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button" aria-label="Close preview" onClick={onClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-background/90 border flex items-center justify-center hover:bg-background transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="bg-white h-[70vh] max-h-[720px] min-h-[320px]">
          <img src={preview.src} alt={preview.name} className="w-full h-full object-contain p-5" />
        </div>
        <div className="p-5 text-center border-t bg-card">
          <p className="text-lg font-bold">{preview.name}</p>
        </div>
      </div>
    </div>
  );
};

/* ─── Simple Slide Card ─── */
const SimpleCard = ({
  name,
  images,
  index,
  onPreview,
  aspectClass = "aspect-[4/3]",
}: {
  name: string;
  images: ProductImage[];
  index: number;
  onPreview: (img: ProductImage) => void;
  aspectClass?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const current = images[active];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (images.length < 2) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % images.length), 2200);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div
      ref={ref}
      className="group bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
      style={{
        transitionDelay: `${(index % 4) * 120}ms`,
        transform: visible ? "translateX(0) rotateY(0deg)" : "translateX(-80px) rotateY(-25deg)",
        opacity: visible ? 1 : 0,
        transition: "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease-out, box-shadow 300ms",
        transformStyle: "preserve-3d",
        perspective: "1200px",
      }}
    >
      <button
        type="button"
        aria-label={`Preview ${current.name}`}
        onClick={() => onPreview(current)}
        className={`${aspectClass} bg-white overflow-hidden w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
      >
        <img
          src={current.src} alt={current.name} loading="lazy"
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </button>
      <div className="p-4 text-center border-t bg-card">
        <p className="text-base font-bold leading-tight">{name}</p>
        {images.length > 1 && (
          <div className="flex justify-center gap-2 pt-2">
            {images.map((img, i) => (
              <button
                key={img.name} type="button" aria-label={`Show ${img.name}`} onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${active === i ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Featured Beverages Section ─── */
const FeaturedBeveragesSection = ({ onPreview }: { onPreview: (img: ProductImage) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div id="featured-beverages" ref={ref}>
      {/* Section header */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
          <GlassWater className="w-7 h-7 text-accent-foreground" />
        </div>
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-bold uppercase tracking-widest"
          style={{ background: "linear-gradient(135deg, hsl(152 44% 28%), hsl(160 38% 18%))", color: "white" }}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          Featured Beverages
          <Star className="w-3.5 h-3.5 fill-current" />
        </div>
        <h3
          className="text-2xl md:text-4xl font-bold"
          style={{
            background: "linear-gradient(135deg, hsl(152 44% 28%), hsl(160 38% 18%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Featured Beverages: Bovonto, Campa &amp; Ruby
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mt-2">
          Premium Soft Drinks &amp; Badam Drink
        </p>
        <p className="text-sm font-semibold mt-1" style={{ color: "hsl(152 44% 28%)" }}>
          We are the Super Stockiest (SS) for Ruby Badam Products.
        </p>
      </div>

      {/* Bovonto + Campa — side by side */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 700ms ease-out, transform 700ms ease-out",
        }}
      >
        {/* Bovonto card — slides through Bovonto, Vibro, Kalimark Badam */}
        <SimpleCard
          name="Bovonto Range"
          images={[
            { name: "Bovonto", src: bovontoNewImg },
            { name: "Vibro Drink", src: vibroImg },
            { name: "Kalimark Badam", src: kalimarkBadamImg },
          ]}
          index={0}
          onPreview={onPreview}
          aspectClass="aspect-[4/3]"
        />

        {/* Campa card — slides Flavour + Energy */}
        <SimpleCard
          name="Campa Series"
          images={[
            { name: "Campa Flavour", src: campaFlavourImg },
            { name: "Campa Energy", src: campaEnergyNewImg },
            { name: "Campa Energy Blast", src: campaEnergyBlastImg },
          ]}
          index={1}
          onPreview={onPreview}
          aspectClass="aspect-[4/3]"
        />
      </div>

      {/* Ruby — below, highlighted */}
      <div
        className="max-w-4xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(50px)",
          transition: "opacity 800ms 200ms ease-out, transform 800ms 200ms ease-out",
        }}
      >
        <div
          className="rounded-3xl overflow-hidden border-2"
          style={{
            borderColor: "hsl(152 44% 32%)",
            boxShadow: "0 0 0 4px hsl(152 30% 94%), 0 8px 32px hsl(152 44% 32% / 0.18)",
          }}
        >
          {/* Ruby highlight banner */}
          <div
            className="px-6 py-4 text-center"
            style={{ background: "linear-gradient(135deg, hsl(152 44% 28%), hsl(160 38% 18%))" }}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-white font-bold text-sm uppercase tracking-widest">Super Stockiest (SS)</span>
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            </div>
            <h4 className="text-white text-xl md:text-2xl font-extrabold">Ruby Badam Drink</h4>
            <p className="text-white/80 text-xs mt-1">Premium Soft Drinks &amp; Badam Drink</p>
          </div>

          {/* Ruby images */}
          <div className="bg-card p-6">
            <SimpleCard
              name="Ruby Badam Drink"
              images={[
                { name: "Ruby Main", src: rubyMainImg },
                { name: "Ruby Juice", src: rubyJuiceImg },
                { name: "Ruby Flavour Range", src: rubyFlavourImg },
                { name: "Milkee Rose", src: rubyMilkeeRoseImg },
              ]}
              index={0}
              onPreview={onPreview}
              aspectClass="aspect-[16/7]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Other Soft Drinks Section ─── */
const OtherSoftDrinksSection = ({ onPreview }: { onPreview: (img: ProductImage) => void }) => (
  <div id="soft-drinks">
    <div className="text-center mb-10 max-w-2xl mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
        <GlassWater className="w-7 h-7 text-accent-foreground" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold">Other Soft Drinks</h3>
      <p className="text-sm md:text-base text-muted-foreground mt-2">Refreshing beverages from India's most loved brands</p>
    </div>
    <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
      {[
        { name: "RichYaaa Dairy Drink", images: [{ name: "RichYaaa Dairy Drink", src: richyaaaImg }] },
        { name: "Tizzo Beverages", images: [{ name: "Tizzo Beverages", src: tizzoImg }] },
      ].map((item, i) => (
        <div key={item.name} className="w-56 border rounded-2xl overflow-hidden shadow-sm">
          <SimpleCard name={item.name} images={item.images} index={i} onPreview={onPreview} aspectClass="aspect-square" />
        </div>
      ))}
    </div>
  </div>
);

/* ─── Snacks Section ─── */
const SnacksSection = ({ onPreview }: { onPreview: (img: ProductImage) => void }) => (
  <div id="snacks">
    <div className="text-center mb-10 max-w-2xl mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
        <Cookie className="w-7 h-7 text-accent-foreground" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold">Snacks &amp; Chips</h3>
      <p className="text-sm md:text-base text-muted-foreground mt-2">Popular chips and snack brands across the region</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
      {[
        { name: "Podaran Snacks", images: [{ name: "Podaran Snacks", src: podaranImg }] },
        { name: "Bingo Range", images: [{ name: "Bingo Yumitos", src: bingoImg }, { name: "Bingo Kurkure", src: kurkureImg }, { name: "Bingo Mad Angles", src: madAnglesImg }] },
        { name: "Alan's Chips", images: [{ name: "Alan's Chips", src: alansImg }] },
      ].map((item, i) => (
        <SimpleCard key={item.name} name={item.name} images={item.images} index={i} onPreview={onPreview} aspectClass="aspect-[4/3]" />
      ))}
    </div>
  </div>
);

/* ─── Peanut Products + Chakra Gold (side by side) ─── */
const PeanutAndChakraSection = ({ onPreview }: { onPreview: (img: ProductImage) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div id="peanut" ref={ref}>
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
          <Nut className="w-7 h-7 text-accent-foreground" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold">Peanut Products, Sweets &amp; More</h3>
        <p className="text-sm md:text-base text-muted-foreground mt-2">
          Mani Mark peanuts, premium sweets, burfi &amp; chikki — plus Chakra Gold premium products
        </p>
      </div>

      {/* Manimark + Chakra Gold side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Manimark */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-60px)",
            transition: "opacity 700ms ease-out, transform 700ms ease-out",
          }}
        >
          <div
            className="rounded-2xl overflow-hidden border-2 h-full flex flex-col"
            style={{
              borderColor: "hsl(35 84% 45%)",
              boxShadow: "0 0 0 3px hsl(35 84% 92%), 0 8px 32px hsl(35 84% 45% / 0.18)",
            }}
          >
            <div
              className="px-5 py-3 text-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(35 84% 38%), hsl(43 96% 50%))" }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-0.5">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
                <span className="text-white font-bold text-xs uppercase tracking-widest">Premium Snacks</span>
                <Star className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <h4 className="text-white text-lg font-extrabold leading-tight">Manimark Products</h4>
              <p className="text-white/85 text-xs mt-0.5">Peanuts, Sweets, Burfi &amp; Chikki</p>
            </div>

            <div className="flex-1 bg-card p-0">
              <SimpleCard
                name="Manimark Products"
                images={[
                  { name: "Manimark Products", src: maniMarkImg },
                  { name: "Manimark Burfi", src: maniMarkBurfiImg },
                  { name: "Manimark Chikki", src: peanutChikkiImg },
                  { name: "Manimark Jar Pack", src: maniMarkJarImg },
                ]}
                index={0}
                onPreview={onPreview}
                aspectClass="aspect-[4/3]"
              />
            </div>
          </div>
        </div>

        {/* Chakra Gold — highlighted card */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(60px)",
            transition: "opacity 700ms 150ms ease-out, transform 700ms 150ms ease-out",
          }}
        >
          <div
            className="rounded-2xl overflow-hidden border-2 h-full flex flex-col"
            style={{
              borderColor: "hsl(43 96% 56%)",
              boxShadow: "0 0 0 3px hsl(43 96% 92%), 0 8px 32px hsl(43 96% 56% / 0.20)",
            }}
          >
            {/* Chakra Gold header banner */}
            <div
              className="px-5 py-3 text-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(43 96% 46%), hsl(36 100% 50%))" }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-0.5">
                <Flame className="w-3.5 h-3.5 text-white fill-white" />
                <span className="text-white font-bold text-xs uppercase tracking-widest">Premium Quality</span>
                <Flame className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <h4 className="text-white text-lg font-extrabold leading-tight">Chakra Gold</h4>
              <p className="text-white/85 text-xs mt-0.5">Pure &amp; Aromatic Ghee &amp; Tea Blends</p>
            </div>

            {/* Card body */}
            <div className="flex-1 bg-card">
              <button
                type="button"
                aria-label="Preview Chakra Gold"
                onClick={() => onPreview({ name: "Chakra Gold", src: teaGeminiImg })}
                className="aspect-[4/3] bg-white overflow-hidden w-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 block"
              >
                <img
                  src={teaGeminiImg} alt="Chakra Gold"
                  loading="lazy"
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </button>
              <div className="p-4 text-center border-t bg-card">
                <p className="text-base font-bold leading-tight">Chakra Gold</p>
                <p className="text-xs text-muted-foreground mt-1">Premium Ghee &amp; Tea Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Household Section ─── */
const HouseholdSection = ({ onPreview }: { onPreview: (img: ProductImage) => void }) => (
  <div id="household">
    <div className="text-center mb-10 max-w-2xl mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
        <SprayCan className="w-7 h-7 text-accent-foreground" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold">Household Essentials</h3>
      <p className="text-sm md:text-base text-muted-foreground mt-2">
        Ponvandu &amp; Power cleaning range — detergent, dishwash &amp; liquid cleaners
      </p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {[
        { name: "Ponvandu Detergent Powder", images: [{ name: "Ponvandu Detergent Powder", src: ponvanduImg }] },
        { name: "Ponvandu Dishwash", images: [{ name: "Ponvandu Dishwash", src: ponvanduDishwashImg }] },
        { name: "Ponvandu Liquid Cleaner", images: [{ name: "Ponvandu Liquid Cleaner", src: ponvanduFabricImg }] },
        { name: "Power Soaps", images: [{ name: "Power Soaps", src: powerSoapsImg }] },
      ].map((item, i) => (
        <SimpleCard key={item.name} name={item.name} images={item.images} index={i} onPreview={onPreview} aspectClass="aspect-[4/3]" />
      ))}
    </div>
  </div>
);

/* ─── Main ProductCatalog ─── */
const ProductCatalog = () => {
  const [preview, setPreview] = useState<ProductImage | null>(null);

  return (
    <section id="products" className="section-padding bg-background overflow-x-hidden w-full">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">Product Categories</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            We distribute a comprehensive range of FMCG products across multiple categories
          </p>
        </div>

        <div className="space-y-24">
          <FeaturedBeveragesSection onPreview={setPreview} />
          <OtherSoftDrinksSection onPreview={setPreview} />
          <SnacksSection onPreview={setPreview} />
          <PeanutAndChakraSection onPreview={setPreview} />
          <HouseholdSection onPreview={setPreview} />
        </div>
      </div>

      <ProductPreview preview={preview} onClose={() => setPreview(null)} />
    </section>
  );
};

export default ProductCatalog;
