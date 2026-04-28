import { useLanguage } from "@/contexts/LanguageContext";
import { Handshake } from "lucide-react";

const BrandsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="brands" className="section-padding bg-background">
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full uppercase tracking-wider mb-4">Our Partners</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.brands.title}</h2>
          <p className="text-muted-foreground mt-3">{t.brands.subtitle}</p>
        </div>

        {/* Brand pill cloud */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-16">
          {t.brands.list.map((brand: string) => (
            <span
              key={brand}
              className="px-6 py-3 bg-muted/60 border border-transparent rounded-full text-sm font-semibold text-foreground/80 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="max-w-2xl mx-auto text-center card-premium p-10">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5">
            <Handshake className="w-7 h-7 text-accent-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-3">{t.partnership.title}</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">{t.partnership.description}</p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 hover:scale-105 transition-all shadow-lg"
          >
            {t.partnership.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
