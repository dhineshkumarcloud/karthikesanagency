import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, Truck, IndianRupee, Users } from "lucide-react";

const icons = [ShieldCheck, Truck, IndianRupee, Users];
const keys = ["trusted", "delivery", "pricing", "network"] as const;

const WhyUsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="whyUs" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent/50 text-accent-foreground text-sm font-bold rounded-full uppercase tracking-widest mb-5 backdrop-blur-sm border border-accent">Our Services & Strengths</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">{t.whyUs.title}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">{t.whyUs.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          {keys.map((key, i) => {
            const Icon = icons[i];
            const descKey = `${key}Desc` as keyof typeof t.whyUs;
            return (
              <div key={key} className="group relative bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col items-center text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">{t.whyUs[key]}</h3>
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
