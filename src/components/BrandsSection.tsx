import { useLanguage } from "@/contexts/LanguageContext";
import { Handshake } from "lucide-react";

const BrandsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="brands" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent/50 text-accent-foreground text-sm font-bold rounded-full uppercase tracking-widest mb-5 backdrop-blur-sm border border-accent">Our Partners</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">{t.brands.title}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">{t.brands.subtitle}</p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20 px-4">
          {t.brands.list.map((brand: string, i: number) => {
            const hasTamil = /[\u0B80-\u0BFF]/.test(brand);
            return (
              <div
                key={brand}
                className="group flex items-center justify-center h-28 bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-default overflow-hidden relative"
                style={{ transitionDelay: `${(i % 4) * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span
                  className="font-extrabold text-lg md:text-xl text-foreground/80 group-hover:text-primary transition-colors tracking-wide z-10 text-center px-4"
                  lang={hasTamil ? "ta" : "en"}
                  style={hasTamil ? { fontFamily: "'Noto Sans Tamil', 'Latha', 'Vijaya', sans-serif" } : {}}
                >
                  {brand}
                </span>
              </div>
            );
          })}
        </div>

        {/* Partnership CTA */}
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 via-background to-primary/5 p-12 rounded-[2.5rem] border shadow-lg relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 shadow-inner relative z-10">
            <Handshake className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-foreground relative z-10">{t.partnership.title}</h3>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed relative z-10 max-w-xl mx-auto">{t.partnership.description}</p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 hover:shadow-xl hover:scale-105 transition-all duration-300 relative z-10"
          >
            {t.partnership.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
