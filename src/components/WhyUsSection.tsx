import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, Truck, IndianRupee, Users } from "lucide-react";

const icons = [ShieldCheck, Truck, IndianRupee, Users];
const keys = ["trusted", "delivery", "pricing", "network"] as const;

const WhyUsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="whyUs" className="section-padding">
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full uppercase tracking-wider mb-4">Why Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">{t.whyUs.title}</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{t.whyUs.subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {keys.map((key, i) => {
            const Icon = icons[i];
            const descKey = `${key}Desc` as keyof typeof t.whyUs;
            return (
              <div key={key} className="card-premium p-7 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t.whyUs[key]}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.whyUs[descKey]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
