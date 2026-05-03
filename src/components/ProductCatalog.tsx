import { GlassWater, Cookie, Nut, SprayCan, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Soft drinks
import bovonto300 from "@/assets/product-bovonto-300ml.jpg";
import bovonto500 from "@/assets/product-bovonto-500ml.jpg";
import bovonto1500 from "@/assets/product-bovonto-1500ml.jpg";
import richyaaaImg from "@/assets/product-richyaaa.jpg";
import tizzoImg from "@/assets/product-tizzo.jpg";
import rubyImg from "@/assets/product-ruby-milk.jpg";
import campaEnergyImg from "@/assets/product-campa-energy.jpg";

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

// Household
import ponvanduImg from "@/assets/product-ponvandu.jpg";
import ponvanduDishwashImg from "@/assets/product-ponvandu-dishwash.jpg";
import ponvanduFabricImg from "@/assets/product-ponvandu-fabric.jpg";
import powerSoapsImg from "@/assets/product-power-soaps.png";

type ProductImage = { name: string; src: string };
type Item = {
  name: string;
  images: ProductImage[];
  featured?: boolean;
};
type Category = {
  id: string;
  title: string;
  description: string;
  icon: typeof GlassWater;
  layout: "standard" | "three-up" | "featured";
  items: Item[];
};
type Preview = ProductImage | null;

const image = (name: string, src: string): ProductImage => ({ name, src });

const categories: Category[] = [
  {
    id: "soft-drinks",
    title: "Soft Drinks",
    description: "Refreshing beverages from India's most loved brands",
    icon: GlassWater,
    layout: "standard",
    items: [
      { name: "Bovonto 300ml", images: [image("Bovonto 300ml", bovonto300)] },
      { name: "Bovonto 500ml", images: [image("Bovonto 500ml", bovonto500)] },
      { name: "Bovonto 1.5L", images: [image("Bovonto 1.5L", bovonto1500)] },
      { name: "RichYaaa Dairy Drink", images: [image("RichYaaa Dairy Drink", richyaaaImg)] },
      { name: "Tizzo Beverages", images: [image("Tizzo Beverages", tizzoImg)] },
      { name: "Ruby Badam Drink", images: [image("Ruby Badam Drink", rubyImg)] },
      { name: "Campa Energy", images: [image("Campa Energy", campaEnergyImg)] },
    ],
  },
  {
    id: "snacks",
    title: "Snacks & Chips",
    description: "Popular chips and snack brands across the region",
    icon: Cookie,
    layout: "three-up",
    items: [
      { name: "Podaran Snacks", images: [image("Podaran Snacks", podaranImg)] },
      {
        name: "Bingo Yumitos",
        images: [
          image("Bingo Yumitos", bingoImg),
          image("Bingo Kurkure", kurkureImg),
          image("Bingo Mad Angles", madAnglesImg),
        ],
      },
      { name: "Alan's Chips", images: [image("Alan's Chips", alansImg)] },
    ],
  },
  {
    id: "peanut",
    title: "Peanut Products & Sweets",
    description: "Mani Mark peanuts, premium sweets, burfi & chikki",
    icon: Nut,
    layout: "featured",
    items: [
      {
        name: "Manimark Products",
        featured: true,
        images: [
          image("Manimark Products", maniMarkImg),
          image("Manimark Burfi", maniMarkBurfiImg),
          image("Manimark Chikki", peanutChikkiImg),
          image("Manimark Jar Pack", maniMarkJarImg),
        ],
      },
    ],
  },
  {
    id: "household",
    title: "Household Essentials",
    description: "Ponvandu & Power cleaning range — detergent, dishwash & liquid cleaners",
    icon: SprayCan,
    layout: "standard",
    items: [
      { name: "Ponvandu Detergent Powder", images: [image("Ponvandu Detergent Powder", ponvanduImg)] },
      { name: "Ponvandu Dishwash", images: [image("Ponvandu Dishwash", ponvanduDishwashImg)] },
      { name: "Ponvandu Liquid Cleaner", images: [image("Ponvandu Liquid Cleaner", ponvanduFabricImg)] },
      { name: "Power Soaps", images: [image("Power Soaps", powerSoapsImg)] },
    ],
  },
];

const gridClassByLayout: Record<Category["layout"], string> = {
  standard: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto",
  "three-up": "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto",
  featured: "grid grid-cols-1 gap-6 max-w-4xl mx-auto",
};

const ProductPreview = ({ preview, onClose }: { preview: Preview; onClose: () => void }) => {
  useEffect(() => {
    if (!preview) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [preview, onClose]);

  if (!preview) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur-sm p-4 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={preview.name}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl shadow-2xl overflow-hidden border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close preview"
          onClick={onClose}
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

const ProductCard = ({
  item,
  index,
  layout,
  onPreview,
}: {
  item: Item;
  index: number;
  layout: Category["layout"];
  onPreview: (image: ProductImage) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const current = item.images[active];
  const isFeatured = layout === "featured" || item.featured;
  const imageAreaClass = isFeatured ? "aspect-[16/9]" : layout === "three-up" ? "aspect-[4/3]" : "aspect-square";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (item.images.length < 2) return;
    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % item.images.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [item.images.length]);

  return (
    <div
      ref={ref}
      className={`group bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col ${
        isFeatured ? "max-w-4xl w-full mx-auto" : ""
      }`}
      style={{
        transitionDelay: `${(index % 4) * 120}ms`,
        transform: visible ? "translateX(0) rotateY(0deg)" : "translateX(-80px) rotateY(-25deg)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease-out, box-shadow 300ms",
        transformStyle: "preserve-3d",
        perspective: "1200px",
      }}
    >
      <button
        type="button"
        aria-label={`Preview ${current.name}`}
        onClick={() => onPreview(current)}
        className={`${imageAreaClass} bg-white overflow-hidden w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
      >
        <img
          src={current.src}
          alt={current.name}
          width={isFeatured ? 900 : 500}
          height={isFeatured ? 506 : 500}
          loading="lazy"
          className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ${
            isFeatured ? "p-5 md:p-7" : "p-4"
          }`}
        />
      </button>
      <div className={`${isFeatured ? "p-5" : "p-4"} text-center border-t bg-card`}>
        <p className={`${layout === "three-up" || isFeatured ? "text-lg md:text-xl" : "text-sm"} font-bold leading-tight`}>
          {item.name}
        </p>
        {item.images.length > 1 && (
          <div className="flex justify-center gap-2 pt-3">
            {item.images.map((img, i) => (
              <button
                key={img.name}
                type="button"
                aria-label={`Show ${img.name}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  active === i ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCatalog = () => {
  const [preview, setPreview] = useState<Preview>(null);

  return (
    <section id="products" className="section-padding bg-background">
      <div className="container">
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
          {categories.map(({ id, title, description, icon: Icon, items, layout }) => (
            <div key={id} id={id}>
              <div className="text-center mb-10 max-w-2xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
                <p className="text-sm md:text-base text-muted-foreground mt-2">{description}</p>
              </div>

              <div className={gridClassByLayout[layout]}>
                {items.map((item, i) => (
                  <ProductCard key={item.name} item={item} index={i} layout={layout} onPreview={setPreview} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductPreview preview={preview} onClose={() => setPreview(null)} />
    </section>
  );
};

export default ProductCatalog;
