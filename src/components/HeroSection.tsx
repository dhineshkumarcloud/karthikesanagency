import { ArrowDown, ArrowUpRight, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroMain from "@/assets/all-juice.jpeg";
import heroSide from "@/assets/carousal_campa.png";
import heroMini from "@/assets/carousal_bovonto.png";

const PHONE = "8973373770";
export default function HeroSection() {
  const { t } = useLanguage();
  return <section id="hero" className="hero-new">
    <div className="hero-grid" />
    <div className="hero-copy">
      <p className="eyebrow">EST. KARAiKAL / FMCG SUPPLY NETWORK</p>
      <h1><span>LOCAL</span><span>GOODS.</span><em>EXCEPTIONAL</em><span>REACH.</span></h1>
      <p className="hero-sub">{t.hero.title}</p>
      <div className="hero-ctas"><a href={`tel:+91${PHONE}`}><Phone size={17} /> +91 {PHONE}</a><button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>Explore range <ArrowUpRight size={17} /></button></div>
    </div>
    <div className="hero-art" aria-label="A selection of our FMCG products">
      <div className="hero-disc" /><img className="hero-main" src={heroMain} alt="FMCG beverages distributed by Karthikesan Agencies" /><img className="hero-side" src={heroSide} alt="Campa beverage range" /><img className="hero-mini" src={heroMini} alt="Bovonto product range" />
      <div className="hero-caption"><span>01</span><p>RETAIL-READY<br />PRODUCT PORTFOLIO</p></div>
    </div>
    <div className="hero-bottom"><span>SCROLL TO DISCOVER</span><ArrowDown size={18} /><span>300+ RETAIL PARTNERS</span><span>•</span><span>KARAIKAL REGION</span></div>
  </section>;
}
