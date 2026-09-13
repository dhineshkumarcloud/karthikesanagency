import { useLanguage } from "@/contexts/LanguageContext";
import { Package, Truck, Users, Handshake } from "lucide-react";
const keys = ["reliable", "fast", "network", "relationships"] as const;
const icons = [Package, Truck, Users, Handshake];
export default function AboutSection() { const { t } = useLanguage(); return <section id="about" className="about-new"><div className="section-label">01 / OUR STORY</div><div className="about-title"><p>Built around<br />the local<br /><i>market.</i></p></div><div className="about-body"><h2>{t.about.title}</h2><p>{t.about.p1}</p><p>{t.about.p2}</p><p>{t.about.p3}</p></div><div className="about-metrics">{keys.map((key, i) => { const Icon = icons[i]; return <article key={key}><Icon /><h3>{t.about.highlights[key]}</h3><p>{t.about.highlights[`${key}Desc` as keyof typeof t.about.highlights]}</p></article>; })}</div></section>; }
