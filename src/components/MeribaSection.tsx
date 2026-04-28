import { useEffect, useRef, useState } from "react";
import { Droplets } from "lucide-react";
import case300 from "@/assets/meriba-case-300ml.png";
import case500 from "@/assets/meriba-case-500ml.png";
import case1l from "@/assets/meriba-case-1l.png";
import case2l from "@/assets/meriba-case-2l.png";

const cases = [
  { size: "300 ml", image: case300 },
  { size: "500 ml", image: case500 },
  { size: "1 Litre", image: case1l },
  { size: "2 Litre", image: case2l },
];

const MeribaCase = ({ image, size, index }: { image: string; size: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        transitionDelay: `${index * 120}ms`,
        transform: visible ? "translateX(0) rotateY(0deg)" : "translateX(-80px) rotateY(-25deg)",
        opacity: visible ? 1 : 0,
        transition: "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease-out",
        transformStyle: "preserve-3d",
        perspective: "1200px",
      }}
    >
      <div className="relative aspect-square bg-accent/40 rounded-[20px] border border-border/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
        <img
          src={image}
          alt={`MERIBA ${size} case`}
          width={1024}
          height={1024}
          loading="lazy"
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
        />
        {/* Reflection */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-foreground/10 blur-md rounded-full" />
      </div>
      <div className="text-center mt-5">
        <p className="text-lg font-bold text-foreground">{size}</p>
      </div>
    </div>
  );
};

const MeribaSection = () => {
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {cases.map((c, i) => (
            <MeribaCase key={c.size} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeribaSection;
