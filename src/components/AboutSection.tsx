import { useLanguage } from "@/contexts/LanguageContext";
import { Package, Truck, Users, Handshake } from "lucide-react";

const highlightKeys = ["reliable", "fast", "network", "relationships"] as const;
const highlightIcons = [Package, Truck, Users, Handshake];

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding bg-muted/40">
      <div className="container">
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full uppercase tracking-wider mb-4">About Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">
            {t.about.title}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg mb-16">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {highlightKeys.map((key, i) => {
            const Icon = highlightIcons[i];
            return (
              <div key={key} className="card-premium p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="font-bold mb-2">{t.about.highlights[key]}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.highlights[`${key}Desc` as keyof typeof t.about.highlights]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
