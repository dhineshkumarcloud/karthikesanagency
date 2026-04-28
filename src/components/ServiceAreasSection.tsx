import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Truck } from "lucide-react";

const ServiceAreasSection = () => {
  const { t } = useLanguage();

  return (
    <section id="serviceAreas" className="section-padding bg-muted/30">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.serviceAreas.title}</h2>
          <p className="text-muted-foreground mt-3">{t.serviceAreas.subtitle}</p>
        </div>

        <div className="grid gap-4 mb-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,14rem),1fr))]">
          {t.serviceAreas.areas.map((area: string) => (
            <div
              key={area}
              className="group flex items-center gap-3 px-5 py-4 bg-card rounded-2xl border border-border/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:bg-primary hover:border-primary hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0 group-hover:bg-primary-foreground/15 transition-colors">
                <MapPin className="w-5 h-5 text-accent-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="min-w-0 break-words font-semibold text-sm md:text-base group-hover:text-primary-foreground transition-colors">{area}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground font-medium text-lg">
          {t.serviceAreas.footer}
        </p>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
