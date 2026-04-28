import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Phone, Package, Truck, PhoneCall } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import slide1 from "@/assets/carousal_campa.png";
import slide2 from "@/assets/carousal_ponvandu.png";
import slide3 from "@/assets/carousal_bingo.png";
import slide4 from "@/assets/carousal_bovonto.png";
import slide5 from "@/assets/carousal_meriba.png";

const PHONE = "8973373770";
const WHATSAPP_NUMBER = "918973373770";
const SLIDES = [slide1, slide2, slide3, slide4, slide5];

const HeroSection = () => {
  const { t } = useLanguage();
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 22 }, [autoplay.current]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
  }, [embla]);

  return (
    <section id="hero" className="pt-16 bg-background">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 lg:items-stretch pt-0 pb-16 md:pb-20 lg:pb-24">
        <div className="flex flex-col min-w-0">
          <div
            ref={emblaRef}
            className="overflow-hidden relative w-full min-h-[300px] sm:min-h-[380px] lg:min-h-[560px] flex-1 rounded-2xl border border-border/60 bg-muted/30 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] ring-1 ring-border/40"
          >
            <div className="flex h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[560px]">
              {SLIDES.map((src, i) => (
                <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
                  <img
                    src={src}
                    alt="Karthikesan Agencies FMCG distribution"
                    className={`w-full h-full object-contain lg:object-cover transition-transform duration-[5000ms] ease-out ${
                      selected === i ? "scale-100 lg:scale-110" : "scale-100"
                    }`}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-2.5 pt-5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => embla?.scrollTo(i)}
                className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  selected === i
                    ? "h-2.5 w-9 bg-primary shadow-sm"
                    : "h-2.5 w-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/45"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center text-center lg:text-left min-w-0">
          <div className="max-w-5xl mx-auto lg:mx-0 space-y-7 animate-fade-in">
            <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
              FMCG Distribution • Karaikal & TR Pattinam
            </span>

            <h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground leading-[1.05] tracking-tight"
              style={{
                WebkitTextStroke: "1px hsl(var(--foreground))",
                textShadow: "0 2px 6px hsl(var(--background) / 0.9), 0 0 24px hsl(var(--background) / 0.6)",
              }}
            >
              KARTHIKESAN <span className="text-primary">AGENCIES</span>
            </h1>

            <p
              className="text-base md:text-xl font-semibold text-foreground max-w-3xl mx-auto lg:mx-0 leading-relaxed"
              style={{ textShadow: "0 1px 4px hsl(var(--background) / 0.95), 0 0 18px hsl(var(--background) / 0.7)" }}
            >
              {t.hero.title}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-3 pt-3">
              <span className="flex items-center gap-2 text-primary font-bold text-sm md:text-base uppercase tracking-wide">
                <Package className="w-5 h-5" /> Bulk Supply
              </span>
              <span className="hidden sm:block w-px h-5 bg-border" />
              <span className="flex items-center gap-2 text-primary font-bold text-sm md:text-base uppercase tracking-wide">
                <Truck className="w-5 h-5" /> Fast Delivery
              </span>
              <span className="hidden sm:block w-px h-5 bg-border" />
              <span className="flex items-center gap-2 text-primary font-bold text-sm md:text-base uppercase tracking-wide">
                <PhoneCall className="w-5 h-5" /> Quick Response
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <Button
                size="lg"
                className="gap-2 text-base rounded-full px-8 shadow-lg hover:scale-105 transition-transform"
                onClick={() => window.open(`tel:+91${PHONE}`)}
              >
                <Phone className="w-5 h-5" />
                Call Now: +91 {PHONE}
              </Button>
              <Button
                size="lg"
                className="gap-2 text-base rounded-full px-8 font-semibold shadow-lg bg-whatsapp hover:bg-whatsapp/90 text-primary-foreground hover:scale-105 transition-all"
                onClick={() =>
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I want to enquire about FMCG distribution")}`,
                    "_blank"
                  )
                }
              >
                <Phone className="w-5 h-5" />
                {t.contact.whatsapp}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary py-4">
        <p className="text-center text-sm md:text-base font-bold text-primary-foreground tracking-wide">
          ✅ {t.trust.line}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
