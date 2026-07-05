import { useEffect, useRef, useState } from "react";
import { Droplets, X, ChevronLeft, ChevronRight } from "lucide-react";
import meribaBottles from "@/assets/product-meriba-bottles.webp";
import case300 from "@/assets/meriba-case-300ml.png";
import case500 from "@/assets/meriba-case-500ml.png";
import case1l from "@/assets/meriba-case-1l.png";
import case2l from "@/assets/meriba-case-2l.png";
import campaSureWater from "@/assets/product-campa-sure-water.png";

type ProductImage = { name: string; src: string };
type Preview = ProductImage | null;

const meribaImages: ProductImage[] = [
  { name: "MERIBA Water", src: meribaBottles },
  { name: "300 ml Case", src: case300 },
  { name: "500 ml Case", src: case500 },
  { name: "1 Litre Case", src: case1l },
  { name: "2 Litre Case", src: case2l },
];

const campaSureImage: ProductImage = { name: "Campa Sure Water", src: campaSureWater };

/* ─── Preview Modal ─── */
const ProductPreview = ({ preview, onClose }: { preview: Preview; onClose: () => void }) => {
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

/* ─── Meriba Slide Card ─── */
const MeribaSlideCard = ({ onPreview }: { onPreview: (img: ProductImage) => void }) => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive((idx + meribaImages.length) % meribaImages.length);
      setAnimating(false);
    }, 300);
  };

  const startAuto = () => {
    intervalRef.current = setInterval(() => {
      setActive((v) => (v + 1) % meribaImages.length);
    }, 2500);
  };

  const stopAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, []);

  const current = meribaImages[active];

  return (
    <div
      className="group bg-card rounded-2xl border-2 border-border shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      {/* Image area with slide animation */}
      <div className="relative bg-white overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {/* Slide wrapper */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateX(30px)" : "translateX(0)" }}
        >
          <button
            type="button"
            aria-label={`Preview ${current.name}`}
            onClick={() => onPreview(current)}
            className="w-full h-full focus-visible:outline-none"
          >
            <img
              src={current.src} alt={current.name} loading="lazy"
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          </button>
        </div>

        {/* Prev / Next arrows */}
        <button
          type="button" aria-label="Previous image"
          onClick={() => goTo(active - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 border shadow flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button" aria-label="Next image"
          onClick={() => goTo(active + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 border shadow flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-4 h-4" />
        </button>


      </div>

      {/* Footer */}
      <div className="p-4 text-center border-t bg-card flex-1 flex flex-col justify-between">
        <div>
          <p className="text-lg font-bold">MERIBA Packaged Water</p>
          <p className="text-xs text-muted-foreground mt-1">{current.name}</p>
        </div>
        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 pt-3">
          {meribaImages.map((_, i) => (
            <button
              key={i} type="button" aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${active === i ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Campa Sure Card ─── */
const CampaSureCard = ({ onPreview }: { onPreview: (img: ProductImage) => void }) => (
  <div className="group bg-card rounded-2xl border-2 border-border shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
    <button
      type="button" aria-label="Preview Campa Sure Water"
      onClick={() => onPreview(campaSureImage)}
      className="bg-white overflow-hidden w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex-1"
      style={{ aspectRatio: "4/3" }}
    >
      <img
        src={campaSureImage.src} alt={campaSureImage.name} loading="lazy"
        className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
      />
    </button>
    <div className="p-4 text-center border-t bg-card">
      <p className="text-lg font-bold">Campa Sure Water</p>
      <p className="text-xs text-muted-foreground mt-1">Packaged Drinking Water</p>
    </div>
  </div>
);

/* ─── Main Section ─── */
const MeribaSection = () => {
  const [preview, setPreview] = useState<Preview>(null);

  return (
    <section id="meriba" className="py-16 bg-background overflow-x-hidden w-full">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-3">
            <Droplets className="w-6 h-6 text-accent-foreground" />
          </div>
          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Water Products
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">Packaged Drinking Water</h2>
          <p className="text-sm text-muted-foreground mt-2">
            MERIBA &amp; Campa Sure Water supplied in bulk across all sizes.
          </p>
        </div>

        {/* Two side-by-side cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <MeribaSlideCard onPreview={setPreview} />
          <CampaSureCard onPreview={setPreview} />
        </div>
      </div>

      <ProductPreview preview={preview} onClose={() => setPreview(null)} />
    </section>
  );
};

export default MeribaSection;
