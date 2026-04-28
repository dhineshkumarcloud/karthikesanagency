import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PHONE = "8973373770";
const WHATSAPP_NUMBER = "918973373770";

const ContactSection = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    const text = `Name: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    toast.success(t.contact.success);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full uppercase tracking-wider mb-4">Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">{t.contact.title}</h2>
          <p className="text-muted-foreground mt-3">{t.contact.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Enquiry Form */}
          <form onSubmit={handleSubmit} className="space-y-5 card-premium p-8">
            <Input
              placeholder={t.contact.name}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="h-12 rounded-xl"
            />
            <Input
              placeholder={t.contact.phone}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              type="tel"
              className="h-12 rounded-xl"
            />
            <Textarea
              placeholder={t.contact.message}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              required
              className="rounded-xl"
            />
            <Button type="submit" className="w-full gap-2 h-12 rounded-xl text-base font-semibold">
              <Send className="w-4 h-4" />
              {t.contact.send}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="space-y-5">
            <div className="card-premium p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-accent-foreground" />
              </div>
              <p className="text-sm leading-relaxed pt-2">{t.contact.address}</p>
            </div>
            <div className="card-premium p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-accent-foreground" />
              </div>
              <a href={`tel:+91${PHONE}`} className="text-lg font-bold hover:text-primary transition-colors">
                +91 {PHONE}
              </a>
            </div>
            <div className="card-premium p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-base">{t.contact.hours}</p>
                <p className="text-muted-foreground">{t.contact.hoursDetail}</p>
                <p className="text-muted-foreground">{t.contact.lunchBreak}</p>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full gap-2 rounded-full text-base font-semibold shadow-lg bg-whatsapp hover:bg-whatsapp/90 text-primary-foreground hover:scale-105 transition-all"
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
    </section>
  );
};

export default ContactSection;
