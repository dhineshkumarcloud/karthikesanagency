import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      {/* Map */}
      <a
        href="https://maps.app.goo.gl/qXP5Y1Tecxi9DLgw8"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Karthikesan Agencies location in Google Maps"
        className="block overflow-hidden"
      >
        <iframe
          title="Karthikesan Agencies Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0!2d79.838!3d10.925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVlJGSitXTUg!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="220"
          style={{ border: 0, pointerEvents: "none" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </a>

      <div className="container py-12 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div>
            <p className="font-extrabold text-xl mb-2">Karthikesan Agencies</p>
            <p className="text-sm opacity-70 leading-relaxed">{t.footer.tagline}</p>
            <p className="text-sm opacity-70 leading-relaxed mt-2">GST NO: 34FQHPK2299M1Z7</p>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-3">
            <div className="flex items-start gap-2.5 text-sm opacity-80">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>129/236 Pandaga Salai Street, TR Pattinam, Karaikal - 609606</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Phone className="w-4 h-4 shrink-0" />
              <a href="tel:+919487215608" className="font-semibold hover:opacity-80 transition-opacity">+91 9487215608</a>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-start gap-2.5 text-sm opacity-80">
              <Clock className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold opacity-100">{t.footer.hours}</p>
                <p>{t.footer.hoursDetail}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end justify-center">
            <a
              href="https://maps.app.goo.gl/qXP5Y1Tecxi9DLgw8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm opacity-80 hover:opacity-100 underline transition-opacity"
            >
              {t.footer.viewMap}
            </a>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6">
          <p className="text-xs opacity-50 text-center">© {new Date().getFullYear()} Karthikesan Agencies. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
