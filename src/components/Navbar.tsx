import { Menu, X, Globe, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const navKeys = ["home", "about", "products", "serviceAreas", "whyUs", "brands", "contact"] as const;

export default function Navbar() {
  const { t, toggle } = useLanguage();
  const [open, setOpen] = useState(false);
  const go = (key: string) => { document.getElementById(key === "home" ? "hero" : key)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return <header className="nav-new">
    <button className="wordmark" onClick={() => go("home")}><i>KA</i><span>KARTHIKESAN<br />AGENCIES</span></button>
    <nav className="nav-links">{navKeys.map(k => <button key={k} onClick={() => go(k)}>{t.nav[k]}<sup>0{navKeys.indexOf(k) + 1}</sup></button>)}</nav>
    <div className="nav-actions"><button className="lang" onClick={toggle}><Globe size={15} /> {t.language}</button><button className="nav-contact" onClick={() => go("contact")}>Enquire <ArrowUpRight size={16} /></button><button className="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    {open && <div className="mobile-drawer">{navKeys.map(k => <button key={k} onClick={() => go(k)}>{t.nav[k]} <span>0{navKeys.indexOf(k) + 1}</span></button>)}</div>}
  </header>;
}
