import { useLanguage } from "@/contexts/LanguageContext";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    qEn: "What FMCG products and brands are distributed by Karthikesan Agencies?",
    qTa: "கார்திகேசன் ஏஜென்சிஸ் எந்த FMCG தயாரிப்புகள் மற்றும் பிராண்டுகளை விநியோகம் செய்கிறது?",
    aEn: "Karthikesan Agencies is an authorized wholesale distributor in Karaikal and TR Pattinam for Bovonto Soft Drinks, Campa Energy & Beverages, MERIBA Packaged Water, Ruby Badam Drink (Super Stockist), Ponvandu Detergents, Power Soaps, Bingo Snacks, Podaran Snacks, Mani Mark Peanuts & Chikki, Tamil Pure Cow Ghee, Chakra Gold Tea, and Levista Coffee.",
    aTa: "கார்திகேசன் ஏஜென்சிஸ் காரைக்கால் மற்றும் டி.ஆர் பட்டினத்தில் போவோண்டோ, கேம்பா, மெரிபா குடிநீர், ரூபி பாதாம் (சூப்பர் ஸ்டாக்கிஸ்ட்), பொன்வண்டு சலவை பவுடர், பவர் சோப்புகள், பிங்கோ ஸ்நாக்ஸ், மணி மார்க் கடலை மிட்டாய், தமிழ் நெய் மற்றும் லெவிஸ்டா காபி ஆகியவற்றின் மொத்த விநியோகஸ்தர் ஆவார்.",
  },
  {
    qEn: "Which areas in Puducherry and Karaikal do you deliver to?",
    qTa: "காரைக்கால் மற்றும் சுற்றியுள்ள எந்த பகுதிகளுக்கு டெலிவரி செய்யப்படுகிறது?",
    aEn: "We provide direct wholesale delivery to over 300+ retail stores in TR Pattinam, Polagam, Vanjore, Karaikal town, Kottucherry, Poovam, Thirunallar, Ambagarathur, and Nedungadu.",
    aTa: "டி.ஆர்.பட்டினம், போலகம், வாஞ்சூர், காரைக்கால் நகரம், கோட்டுச்சேரி, பூவம், திருநள்ளாறு, அம்பகரத்தூர் மற்றும் நெடுங்காடு ஆகிய பகுதிகளில் உள்ள 300-க்கும் மேற்பட்ட சில்லறை கடைகளுக்கு நேரடியாக விநியோகிக்கிறோம்.",
  },
  {
    qEn: "How can retail store owners place a bulk wholesale order?",
    qTa: "சில்லறை கடை உரிமையாளர்கள் மொத்த ஆர்டர் செய்வது எப்படி?",
    aEn: "Retailers can call +91-8973373770 or +91-9487215608, or send a WhatsApp enquiry directly from our website contact form.",
    aTa: "கடமையாளர்கள் +91-8973373770 அல்லது +91-9487215608 என்ற எண்களை அழைக்கலாம், அல்லது எங்கள் வாட்ஸ்அப் மூலம் உடனடியாக தொடர்பு கொள்ளலாம்.",
  },
  {
    qEn: "Do you offer minimum order flexibility for small retail shops?",
    qTa: "சிறிய கடைகளுக்கான குறைந்தபட்ச ஆர்டர் வசதி உள்ளதா?",
    aEn: "Yes! We support retail stores of all sizes with flexible minimum order limits and fast same-day or next-day delivery.",
    aTa: "ஆம்! அனைத்து அளவு சில்லறை கடைகளுக்கும் ஏற்ற குறைந்தபட்ச ஆர்டர் அளவுகள் மற்றும் விரைவான டெலிவரி வசதி உள்ளது.",
  },
];

const FAQSection = () => {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="section-padding bg-muted/30">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4 shadow-sm">
            <HelpCircle className="w-7 h-7 text-primary" />
          </div>
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            {lang === "ta" ? "அடிக்கடி கேட்கப்படும் கேள்விகள்" : "Frequently Asked Questions"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">
            {lang === "ta" ? "பொதுவான சந்தேகங்கள் & பதில்கள்" : "Got Questions? We Have Answers"}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const q = lang === "ta" ? faq.qTa : faq.qEn;
            const a = lang === "ta" ? faq.aTa : faq.aEn;

            return (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border/80 shadow-sm transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-expanded={isOpen}
                >
                  <span>{q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/40 bg-accent/20">
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
