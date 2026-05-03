import { useEffect, useState } from "react";
import { Droplets, X } from "lucide-react";
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
  { name: "300 ml", src: case300 },
  { name: "500 ml", src: case500 },
  { name: "1 Litre", src: case1l },
  { name: "2 Litre", src: case2l },
];

const campaSureImage: ProductImage = { name: "Campa Sure Water", src: campaSureWater };

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

const WaterShowcaseCard = ({
  title,
  images,
  onPreview,
}: {
  title: string;
  images: ProductImage[];
  onPreview: (image: ProductImage) => void;
}) => {
  const [active, setActive] = useState(0);
  const current = images[active];

  useEffect(() => {
    if (images.length < 2) return;
    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % images.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div className="group bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col max-w-4xl w-full mx-auto">
      <button
        type="button"
        aria-label={`Preview ${current.name}`}
        onClick={() => onPreview(current)}
        className="relative aspect-[16/9] bg-white overflow-hidden w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <img
          src={current.src}
          alt={current.name}
          width={900}
          height={506}
          loading="lazy"
          className="w-full h-full object-contain p-5 md:p-7 group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute left-1/2 bottom-5 -translate-x-1/2 rounded-full bg-foreground/80 px-4 py-1.5 text-sm font-bold text-background opacity-0 group-hover:opacity-100 transition-opacity">
          {current.name}
        </span>
      </button>
      <div className="p-5 text-center border-t bg-card">
        <p className="text-lg md:text-xl font-bold leading-tight">{title}</p>
        {images.length > 1 && (
          <div className="flex justify-center gap-2 pt-3">
            {images.map((img, i) => (
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

const MeribaSection = () => {
  const [preview, setPreview] = useState<Preview>(null);

  return (
    <section id="meriba" className="section-padding bg-background">
      <div className="container">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
            <Droplets className="w-7 h-7 text-accent-foreground" />
          </div>
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            MERIBA Water
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Packaged Drinking Water — Bulk Cases</h2>
          <p className="text-muted-foreground mt-3">
            Shrink-wrapped MERIBA cases supplied in bulk across all sizes for retailers, hotels, and offices.
          </p>
        </div>

        <WaterShowcaseCard title="MERIBA Water Products" images={meribaImages} onPreview={setPreview} />

        <div id="campa-sure-water" className="mt-24">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-7 h-7 text-accent-foreground" />
            </div>
            <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
              Campa Sure Water
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Campa Sure Water Products</h2>
            <p className="text-muted-foreground mt-3">
              Campa Sure packaged drinking water supplied for retail and bulk orders.
            </p>
          </div>

          <WaterShowcaseCard title="Campa Sure Water" images={[campaSureImage]} onPreview={setPreview} />
        </div>
      </div>
      <ProductPreview preview={preview} onClose={() => setPreview(null)} />
    </section>
  );
};

export default MeribaSection;
