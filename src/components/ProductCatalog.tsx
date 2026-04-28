import { GlassWater, Cookie, Nut, SprayCan } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Soft drinks
import bovonto300 from "@/assets/product-bovonto-300ml.jpg";
import bovonto500 from "@/assets/product-bovonto-500ml.jpg";
import bovonto1500 from "@/assets/product-bovonto-1500ml.jpg";
import richyaaaImg from "@/assets/product-richyaaa.jpg";
import tizzoImg from "@/assets/product-tizzo.jpg";
import rubyImg from "@/assets/product-ruby-milk.jpg";
import campaEnergyImg from "@/assets/product-campa-energy.png";

// Snacks
import podaranImg from "@/assets/product-podaran.jpg";
import podaranBananaImg from "@/assets/product-podaran-banana.jpg";
import yumitosImg from "@/assets/product-yumitos.jpg";
import yumitosMasalaImg from "@/assets/product-yumitos-masala.jpg";
import yumitosTomatoImg from "@/assets/product-yumitos-tomato.jpg";

// Peanut
import maniMarkImg from "@/assets/product-manimark-peanuts.jpg";
import maniMarkMasalaImg from "@/assets/product-manimark-masala.jpg";
import peanutBurfiImg from "@/assets/product-peanut-burfi.jpg";
import peanutChikkiImg from "@/assets/product-peanut-chikki.jpg";
import peanutBurfiJarImg from "@/assets/product-peanut-burfi-jar.jpg";

// Household
import ponvanduImg from "@/assets/product-ponvandu.jpg";
import ponvanduDishwashImg from "@/assets/product-ponvandu-dishwash.jpg";
import ponvanduFabricImg from "@/assets/product-ponvandu-fabric.jpg";

type Item = { name: string; image: string };
type Category = {
  id: string;
  title: string;
  description: string;
  icon: typeof GlassWater;
  items: Item[];
};

const categories: Category[] = [
  {
    id: "soft-drinks",
    title: "Soft Drinks",
    description: "Refreshing beverages from India's most loved brands",
    icon: GlassWater,
    items: [
      { name: "Bovonto 300ml", image: bovonto300 },
      { name: "Bovonto 500ml", image: bovonto500 },
      { name: "Bovonto 1.5L", image: bovonto1500 },
      { name: "RichYaaa Dairy Drink", image: richyaaaImg },
      { name: "Tizzo Beverages", image: tizzoImg },
      { name: "Ruby Badam Drink", image: rubyImg },
      { name: "Campa Energy", image: campaEnergyImg },
    ],
  },  
  {
    id: "snacks",
    title: "Snacks & Chips",
    description: "Popular chips and snack brands across the region",
    icon: Cookie,
    items: [
      { name: "Podaran Chips", image: podaranImg },
      { name: "Podaran Banana Chips", image: podaranBananaImg },
      { name: "Bingo Yumitos Classic", image: yumitosImg },
      { name: "Bingo Yumitos Masala", image: yumitosMasalaImg },
      { name: "Bingo Yumitos Tomato", image: yumitosTomatoImg },
    ],
  },
  {
    id: "peanut",
    title: "Peanut Products & Sweets",
    description: "Mani Mark peanuts, premium ghee sweets, burfi & chikki",
    icon: Nut,
    items: [
      { name: "Mani Mark Peanuts", image: maniMarkImg },
      { name: "Mani Mark Masala Peanuts", image: maniMarkMasalaImg },
      { name: "Peanut Burfi", image: peanutBurfiImg },
      { name: "Peanut Chikki", image: peanutChikkiImg },
      { name: "Burfi Jar Pack", image: peanutBurfiJarImg },
    ],
  },
  {
    id: "household",
    title: "Household Essentials",
    description: "Ponvandu cleaning range — detergent, dishwash & liquid cleaners",
    icon: SprayCan,
    items: [
      { name: "Ponvandu Detergent Powder", image: ponvanduImg },
      { name: "Ponvandu Dishwash", image: ponvanduDishwashImg },
      { name: "Ponvandu Liquid Cleaner", image: ponvanduFabricImg },
    ],
  },
];

const AnimatedProductCard = ({ name, image, index }: { name: string; image: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
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
      <div className="aspect-square bg-white overflow-hidden">
        <img
          src={image}
          alt={name}
          width={400}
          height={400}
          loading="lazy"
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 text-center border-t bg-card">
        <p className="text-sm font-semibold leading-tight">{name}</p>
      </div>
    </div>
  );
};

const ProductCatalog = () => {
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
          {categories.map(({ id, title, description, icon: Icon, items }) => (
            <div key={id} id={id}>
              <div className="text-center mb-10 max-w-2xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
                <p className="text-sm md:text-base text-muted-foreground mt-2">{description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {items.map((item, i) => (
                  <AnimatedProductCard key={item.name} {...item} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
