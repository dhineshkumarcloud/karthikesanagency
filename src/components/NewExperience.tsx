import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, Globe2, Instagram, MapPin, Menu, Package, Phone, Plus, ShieldCheck, Truck, Users, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import meriba from "@/assets/product-meriba-bottles.webp";
import campaWater from "@/assets/product-campa-sure-water.png";
import ghee from "@/assets/tamizh-gemini-main.jpg";
import gheeCollection from "@/assets/tamil-2-gemini.jpg";
import bovonto from "@/assets/Bovonto.webp";
import bovonto300 from "@/assets/product-bovonto-300ml.jpg";
import bovonto500 from "@/assets/product-bovonto-500ml.jpg";
import bovonto1500 from "@/assets/product-bovonto-1500ml.jpg";
import campa from "@/assets/Campa-flavour-gemini-1.jpg";
import campaEnergy from "@/assets/product-campa-energy.jpg";
import campaEnergyPack from "@/assets/campa-energy-2.jpeg";
import campaBlast from "@/assets/campa-energy-blast.png";
import ruby from "@/assets/Ruby-main-gemini.jpg";
import rubyMilk from "@/assets/product-ruby-milk.jpg";
import rubyJuice from "@/assets/ruby-juice.jpeg";
import vibro from "@/assets/vibro-gemini.png";
import bingo from "@/assets/product-bingo-yumitos.webp";
import podaran from "@/assets/product-podaran.jpg";
import mani from "@/assets/product-manimark-peanuts.jpg";
import tea from "@/assets/tea-gemini.jpg";
import coffee from "@/assets/l1.jpeg";
import ponvandu from "@/assets/product-ponvandu.jpg";
import power from "@/assets/product-power-soaps.png";
import meriba300 from "@/assets/300-ml.jpg";
import meriba500 from "@/assets/500 ml.jpg";
import meriba1l from "@/assets/Meriba-1l.webp";
import meribaRange from "@/assets/meriba - range.jpg";
import kalimarkRange from "@/assets/kalimark-range.webp";
import richyaaa from "@/assets/product-richyaaa.jpg";
import tizzo from "@/assets/product-tizzo.jpg";

const PHONE = "8973373770";
const navKeys = ["about", "products", "serviceAreas", "whyUs", "brands", "contact"] as const;
type Category = "BEVERAGES" | "SNACKS" | "WATER" | "DETERGENT" | "PANTRY";
type Product = { name: string; type: string; category: Category; src: string; description?: string };

const products: Product[] = [
  { name: "Bovonto Range", type: "ICONIC SOFT DRINKS", category: "BEVERAGES", src: bovonto },
  { name: "Campa Series", type: "BEVERAGES", category: "BEVERAGES", src: campa },
  { name: "Ruby Badam", type: "SUPER STOCKIST", category: "BEVERAGES", src: ruby },
  { name: "Vibro Drink", type: "BEVERAGES", category: "BEVERAGES", src: vibro },
  { name: "Bingo & Snacks", type: "SNACKS", category: "SNACKS", src: bingo },
  { name: "Podaran", type: "SNACKS", category: "SNACKS", src: podaran },
  { name: "Mani Mark", type: "PEANUTS & SWEETS", category: "PANTRY", src: mani },
  { name: "Chakra Gold", type: "PREMIUM TEA", category: "PANTRY", src: tea },
  { name: "Levista", type: "COFFEE", category: "PANTRY", src: coffee },
  { name: "Ponvandu", type: "DISHWASH & CARE", category: "DETERGENT", src: ponvandu },
  { name: "Power", type: "HOUSEHOLD ESSENTIALS", category: "DETERGENT", src: power },
];
const bovontoProducts: Product[] = [
  { name: "Bovonto Range", type: "BOVONTO / KALIMARK", category: "BEVERAGES", src: bovonto },
  { name: "Bovonto 300 ML", type: "BOVONTO / KALIMARK", category: "BEVERAGES", src: bovonto300 },
  { name: "Bovonto 500 ML", type: "BOVONTO / KALIMARK", category: "BEVERAGES", src: bovonto500 },
  { name: "Bovonto 1.5 L", type: "BOVONTO / KALIMARK", category: "BEVERAGES", src: bovonto1500 },
  { name: "Kalimark Range", type: "BOVONTO / KALIMARK", category: "BEVERAGES", src: kalimarkRange },
];
const campaProducts: Product[] = [
  { name: "Campa Energy", type: "CAMPA / RELIANCE CONSUMER PRODUCTS", category: "BEVERAGES", src: campaEnergy },
  { name: "Campa Sure Water", type: "CAMPA / PACKAGED WATER", category: "WATER", src: campaWater },
  { name: "Campa Energy Pack", type: "CAMPA / RELIANCE CONSUMER PRODUCTS", category: "BEVERAGES", src: campaEnergyPack },
  { name: "Campa Energy Blast", type: "CAMPA / RELIANCE CONSUMER PRODUCTS", category: "BEVERAGES", src: campaBlast },
];
const rubyProducts: Product[] = [
  { name: "Ruby Badam Milk", type: "RUBY / SUPER STOCKIST", category: "BEVERAGES", src: ruby },
  { name: "Ruby Milk", type: "RUBY / SUPER STOCKIST", category: "BEVERAGES", src: rubyMilk },
  { name: "Ruby Juice", type: "RUBY / SUPER STOCKIST", category: "BEVERAGES", src: rubyJuice },
];
const meribaProducts: Product[] = [
  { name: "Meriba 1 L", type: "MERIBA / PACKAGED WATER", category: "WATER", src: meriba1l },
  { name: "Meriba 300 ML", type: "MERIBA / PACKAGED WATER", category: "WATER", src: meriba300 },
  { name: "Meriba 500 ML", type: "MERIBA / PACKAGED WATER", category: "WATER", src: meriba500 },
  { name: "Meriba Range", type: "MERIBA / PACKAGED WATER", category: "WATER", src: meribaRange },
];
const gheeProducts: Product[] = [
  { name: "Tamil Ghee", type: "TAMIL GHEE / PANTRY", category: "PANTRY", src: ghee },
  { name: "Tamil Ghee Collection", type: "TAMIL GHEE / PANTRY", category: "PANTRY", src: gheeCollection },
];
const heroProducts = products;
const benefitKeys = ["reliable", "fast", "network", "relationships"] as const;
const benefitIcons = [Package, Truck, Users, ShieldCheck];
const whyKeys = ["trusted", "delivery", "pricing", "network"] as const;
const whyIcons = [ShieldCheck, Truck, Check, Users];
const brandVisuals: Record<string, string> = { Bovonto: bovonto, "Campa Energy": campa, "Campa Sure Water": campaWater, RichYaaa: richyaaa, Tizzo: tizzo, MERIBA: meriba, "Bingo Yumitos": bingo, Podaran: podaran, Ponvandu: ponvandu, "Power Soaps": power, Ruby: ruby, "Mani Mark": mani, "தமிழ் Ghee": ghee, "Chakra Gold": tea, Levista: coffee };
const brandGroups: Record<string, string> = { Bovonto: "KALIMARK", "Campa Energy": "RELIANCE CONSUMER PRODUCTS", "Campa Sure Water": "CAMPA", MERIBA: "MERIBA", "Bingo Yumitos": "BINGO", Podaran: "PODARAN", Ponvandu: "PONVANDU", "Power Soaps": "POWER", Ruby: "RUBY", "Mani Mark": "MANI MARK", "தமிழ் Ghee": "TAMIL GHEE", "Chakra Gold": "TATA CONSUMER PRODUCTS", Levista: "LEVISTA" };

function jump(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

function ProductModal({ product, close }: { product: Product; close: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { closeButton.current?.focus(); }, []);
  return <div className="lightbox" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}><div className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title"><button ref={closeButton} className="modal-close" onClick={close} aria-label="Close product preview"><X /></button><div className="modal-image-wrap"><img src={product.src} alt={product.name} /></div><div className="modal-copy"><span className="section-marker">{product.category}</span><h2 id="product-modal-title">{product.name}</h2><p>{product.description ?? `Available through Karthikesan Agencies for retailers and business partners across Karaikal and TR Pattinam.`}</p><small>{product.type}</small><a href={`tel:+91${PHONE}`} className="solid-link">Enquire about this product <ArrowUpRight size={16} /></a></div></div></div>;
}

function DepthCarousel({ products: carouselProducts, onSelect, className = "" }: { products: Product[]; onSelect: (product: Product) => void; className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef<number | null>(null);
  useEffect(() => { const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % carouselProducts.length), 2000); return () => window.clearInterval(timer); }, [carouselProducts.length]);
  const move = (direction: number) => setActiveIndex((index) => (index + direction + carouselProducts.length) % carouselProducts.length);
  const dragStart = (event: React.PointerEvent) => { startX.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); };
  const dragEnd = (event: React.PointerEvent) => { if (startX.current === null) return; const delta = event.clientX - startX.current; if (Math.abs(delta) > 35) move(delta < 0 ? 1 : -1); startX.current = null; };
  return <div className={`depth-carousel ${className}`} onPointerDown={dragStart} onPointerUp={dragEnd} onPointerCancel={() => { startX.current = null; }}><div className="depth-glow" />{carouselProducts.map((product, index) => { const distance = ((index - activeIndex + carouselProducts.length + Math.floor(carouselProducts.length / 2)) % carouselProducts.length) - Math.floor(carouselProducts.length / 2); const absolute = Math.abs(distance); return <button className={`depth-card ${distance === 0 ? "is-center" : ""}`} key={product.name} style={{ transform: `translateX(calc(-50% + ${distance * 54}%)) translateZ(${(2 - absolute) * 80}px) rotateY(${distance * -16}deg) scale(${1 - absolute * .12})`, opacity: 1 - absolute * .2, zIndex: 10 - absolute }} onClick={() => distance === 0 ? onSelect(product) : setActiveIndex(index)}><img src={product.src} alt={product.name} /><span>{product.name}</span><small>{product.type}</small></button>; })}<button className="depth-arrow depth-arrow-left" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Previous brand image"><ChevronLeft /></button><button className="depth-arrow depth-arrow-right" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Next brand image"><ChevronRight /></button><div className="depth-dots">{carouselProducts.map((product, index) => <button key={product.name} className={index === activeIndex ? "active" : ""} onClick={() => setActiveIndex(index)} aria-label={`Show ${product.name}`} />)}</div></div>;
}

function ProductRail({ products: railProducts, className = "" , onSelect }: { products: Product[]; className?: string; onSelect: (product: Product) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => { if (railProducts.length < 2) return undefined; const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % railProducts.length), 2000); return () => window.clearInterval(timer); }, [railProducts.length]);
  if (className.includes("ruby-rail")) return <DepthCarousel products={railProducts} onSelect={onSelect} className={className} />;
  const product = railProducts[activeIndex % railProducts.length];
  return <div className={`showcase-rail ${className}`}><button className="showcase-product showcase-product-single" onClick={() => onSelect(product)}><span>{String(activeIndex + 1).padStart(2, "0")} / {String(railProducts.length).padStart(2, "0")}</span><img src={product.src} alt={product.name} key={product.name} /><strong>{product.name}</strong><small>{product.type}</small></button></div>;
}

function BentoShowcase({ products: bentoProducts, onSelect }: { products: Product[]; onSelect: (product: Product) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % bentoProducts.length), 2000); return () => window.clearInterval(timer); }, [bentoProducts.length]);
  return <div className="bovonto-bento">{bentoProducts.map((product, index) => <button key={product.name} className={`bento-tile bento-tile-${index} ${activeIndex === index ? "is-active" : ""}`} onClick={() => { setActiveIndex(index); onSelect(product); }}><img src={product.src} alt={product.name} /><span>{product.name}</span><small>{product.type}</small></button>)}</div>;
}

export default function NewExperience() {
  const { t, toggle } = useLanguage();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<Product | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    const move = (event: PointerEvent) => { if (cursor.current) cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`; };
    const keydown = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("pointermove", move); window.addEventListener("keydown", keydown);
    return () => { observer.disconnect(); window.removeEventListener("pointermove", move); window.removeEventListener("keydown", keydown); };
  }, []);
  useEffect(() => { const timer = window.setInterval(() => setHeroIndex((index) => (index + 1) % heroProducts.length), 2000); return () => window.clearInterval(timer); }, []);
  const submit = (event: FormEvent) => { event.preventDefault(); window.open(`https://wa.me/918973373770?text=${encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`)}`, "_blank"); };
  const currentHero = heroProducts[heroIndex];

  return <div className="experience"><div ref={cursor} className="cursor-orb" />
    <header className="site-nav"><button className="brand-lockup" onClick={() => jump("hero")}><span>KA</span><b>KARTHIKESAN<br />AGENCIES</b></button><nav>{navKeys.map((key, index) => <button key={key} onClick={() => { jump(key); setMenu(false); }}>{t.nav[key]} <sup>0{index + 1}</sup></button>)}</nav><div className="nav-tools"><button className="language" onClick={toggle}><Globe2 size={14} /> {t.language}</button><button className="nav-cta" onClick={() => jump("contact")}>Start a conversation <ArrowUpRight size={15} /></button><button className="menu-button" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div>{menu && <div className="mobile-nav">{navKeys.map((key, index) => <button key={key} onClick={() => { jump(key); setMenu(false); }}>{t.nav[key]} <span>0{index + 1}</span></button>)}</div>}</header>
    <main>
      <section id="hero" className="new-hero"><div className="hero-noise" /><div className="hero-grid-line" /><div className="hero-topline"><span>KA / 2026</span><span>TRUSTED DISTRIBUTION NETWORK</span><span>01 — 11</span></div><div className="hero-layout"><div className="hero-words reveal"><p className="kicker">KARTHIKESAN AGENCIES</p><h1>KARTHIKESAN<br /><em>AGENCIES</em></h1><p className="hero-hero-category">FMCG DISTRIBUTION</p><p className="hero-description">Trusted brands. Reliable distribution. Stronger reach.</p><div className="hero-actions"><button onClick={() => jump("products")}><ArrowDown size={16} /> Explore Products</button><a href={`tel:+91${PHONE}`}><Phone size={16} /> Enquire Now</a></div></div><div className="hero-collage reveal"><div className="sun-disc" /><img className="hero-bottle hero-bottle-main" src={currentHero.src} alt={`${currentHero.name} product`} key={currentHero.name} /></div></div><div className="hero-bottom"><span>SCROLL TO EXPLORE</span><div /><span>300+ RETAIL PARTNERS</span><span>KARAIKAL / INDIA</span></div></section>
      <section id="about" className="story-section reveal"><div className="section-marker">02 / THE STORY</div><div className="story-statement">A local network<br />with <i>wide reach.</i></div><div className="story-copy"><p className="lead">{t.about.p1}</p><p>{t.about.p2}</p><p>{t.about.p3}</p><button className="text-link" onClick={() => jump("whyUs")}>What makes us different <ArrowUpRight size={16} /></button></div><div className="benefit-strip">{benefitKeys.map((key, index) => { const Icon = benefitIcons[index]; return <article key={key}><Icon /><small>0{index + 1}</small><h3>{t.about.highlights[key]}</h3><p>{t.about.highlights[`${key}Desc` as keyof typeof t.about.highlights]}</p></article>; })}</div></section>
      <section id="products" className="catalog-section"><div className="catalog-heading reveal"><div><span className="section-marker">03 / THE SHELF</span><h2>Products that<br /><i>move people.</i></h2></div><p>{t.products.subtitle}</p><span className="catalog-count">11<br /><small>CORE LINES</small></span></div><div className="shelf-nav">{["beverages", "bovonto", "campa", "snacks", "home-care", "water", "ghee", "other"].map((id) => <button key={id} onClick={() => jump(`shelf-${id}`)}>{id.replace("-", " ")}</button>)}</div><div className="shelf-intro"><span className="section-marker">01 — BEVERAGES</span><p>Refreshment for every occasion.</p></div><div className="shelf-feature-grid"><ShowcaseBlock id="shelf-beverages" title="Beverages" accent="Refreshment for every occasion." products={products.filter((product) => product.name === "Vibro Drink")} onSelect={setActive} /><ShowcaseBlock id="shelf-bovonto" title="Bovonto" accent="Kalimark's unmistakable local classic." products={bovontoProducts} className="bovonto-showcase" onSelect={setActive} /><ShowcaseBlock id="shelf-campa" title="Campa" accent="A familiar energy range, made for everyday movement." products={campaProducts} className="campa-showcase" onSelect={setActive} /><ShowcaseBlock id="shelf-snacks" title="Snacks" accent="Small packs. Big movement." products={products.filter((product) => product.category === "SNACKS")} onSelect={setActive} /><ShowcaseBlock id="shelf-home-care" title="Detergents / Home Care" accent="Everyday essentials, always within reach." products={products.filter((product) => product.category === "DETERGENT")} onSelect={setActive} /><ShowcaseBlock id="shelf-water" title="Meriba" accent="Pure water for every route." products={meribaProducts} className="meriba-showcase" onSelect={setActive} /><ShowcaseBlock id="shelf-ghee" title="Ghee" accent="Made for the table." products={gheeProducts} className="ghee-showcase" onSelect={setActive} /><ShowcaseBlock id="shelf-other" title="Other FMCG" accent="Trusted pantry partners for local shelves." products={products.filter((product) => product.category === "PANTRY")} onSelect={setActive} /><section className="ruby-showcase" id="shelf-ruby"><div><span className="section-marker">SPECIAL DISTRIBUTION RELATIONSHIP</span><h3>RUBY</h3><strong>SUPER STOCKIST</strong><p>Ruby is carried as a dedicated distribution relationship for the Karaikal region.</p><button className="solid-link" onClick={() => jump("contact")}>Enquire about Ruby <ArrowUpRight size={16} /></button></div><ProductRail products={rubyProducts} className="ruby-rail" onSelect={setActive} /></section></div></section>
      <section id="whyUs" className="why-section"><div className="why-intro reveal"><span className="section-marker">THE DIFFERENCE</span><h2>The work<br />behind a<br /><i>reliable shelf.</i></h2><p>{t.whyUs.subtitle}</p></div><div className="why-list">{whyKeys.map((key, index) => { const Icon = whyIcons[index]; const desc = `${key}Desc` as keyof typeof t.whyUs; return <article className="reveal" key={key}><span>0{index + 1}</span><Icon /><div><h3>{t.whyUs[key]}</h3><p>{t.whyUs[desc]}</p></div><ArrowUpRight /></article>; })}</div></section>
      <section id="brands" className="brand-section reveal"><div className="brand-heading"><span className="section-marker">THE BRAND WALL</span><h2>Trusted brands.<br /><i>Stronger reach.</i></h2><p>{t.brands.subtitle}</p></div><div className="brand-wall">{t.brands.list.map((brand, index) => <div key={brand} className={`brand-cell brand-cell-${index % 5}`}><span>0{index + 1}</span>{brandVisuals[brand] ? <img src={brandVisuals[brand]} alt={`${brand} visual mark`} /> : <b className="brand-wordmark">{brand}</b>}<b>{brand}</b>{brandGroups[brand] && <small>{brandGroups[brand]}</small>}</div>)}</div><div className="partnership"><p><b>{t.partnership.title}</b><br />{t.partnership.description}</p><button className="text-link" onClick={() => jump("contact")}>{t.partnership.cta} <ArrowUpRight size={16} /></button></div></section>
      <section id="serviceAreas" className="network-section"><div className="network-visual reveal"><div className="network-grid" /><div className="network-circle circle-one" /><div className="network-circle circle-two" /><div className="network-center"><Truck size={25} /><span>TR<br />PATTINAM</span></div>{t.serviceAreas.areas.map((area, index) => <span key={area} className={`network-pin network-pin-${index}`}><i />{area}</span>)}</div><div className="network-copy reveal"><span className="section-marker">THE NETWORK</span><h2>Close to where<br /><i>business happens.</i></h2><p>{t.serviceAreas.subtitle}</p><div className="network-note"><MapPin size={17} /> {t.serviceAreas.footer}</div></div></section>
      <section id="contact" className="contact-section"><div className="contact-title reveal"><span className="section-marker">LET'S TALK STOCK</span><h2>Ready when<br /><i>you are.</i></h2><p>{t.contact.subtitle}</p><a href={`tel:+91${PHONE}`}><Phone size={18} /> +91 {PHONE}</a></div><form className="contact-form reveal" onSubmit={submit}><label>{t.contact.name}<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>{t.contact.phone}<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label><label>{t.contact.message}<textarea required value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label><button className="send-button">Send on WhatsApp <ArrowUpRight size={17} /></button></form><aside className="contact-aside"><p><MapPin size={18} />{t.contact.address}</p><p><Clock3 size={18} />{t.contact.hours}<br />{t.contact.hoursDetail}</p></aside></section>
    </main><footer className="new-footer"><div className="footer-top"><p className="footer-logo">KARTHIKESAN<br /><i>AGENCIES</i><sup>®</sup></p><p>{t.footer.tagline}<br />GST NO: 34FQHPK2299M1Z7</p><div><a href="https://www.instagram.com/karthikesanagencies?igsh=dGlzdXZwZHdiOTZi" target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram <ArrowUpRight size={14} /></a><a href="https://maps.app.goo.gl/qXP5Y1Tecxi9DLgw8" target="_blank" rel="noreferrer"><MapPin size={16} /> View location <ArrowUpRight size={14} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Karthikesan Agencies</span><span>KARAIKAL / TR PATTINAM / INDIA</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO TOP ↑</button></div></footer>{active && <ProductModal product={active} close={() => setActive(null)} />}</div>;
}

function ShowcaseBlock({ id, title, accent, products: railProducts, className = "", onSelect }: { id: string; title: string; accent: string; products: Product[]; className?: string; onSelect: (product: Product) => void }) {
  const displayTitle = title === "Bovonto" ? "Kalimark-Bovonto" : title === "Campa" ? "Campa Energy" : title === "Other FMCG" ? "Levista · Tata Chakra Gold · Mani Mark" : title;
  if (title === "Other FMCG") {
    const topics: Record<string, string> = { Levista: "COFFEE / DAILY BREW", "Chakra Gold": "TEA / EVERYDAY REFRESHMENT", "Mani Mark": "PEANUTS & SWEETS / PANTRY" };
    const displayNames: Record<string, string> = { Levista: "Levista", "Chakra Gold": "Tata Chakra Gold", "Mani Mark": "Mani Mark" };
    return <section id={id} className="shelf-showcase pantry-showcase"><div className="showcase-heading"><span className="section-marker">PANTRY EDIT</span><h3>Everyday pantry partners</h3><p>Distinct products for familiar daily rituals.</p></div><div className="pantry-product-grid">{railProducts.map((product) => <article className="pantry-product-card" key={product.name}><div><span className="section-marker">{topics[product.name] ?? product.type}</span><h4>{displayNames[product.name] ?? product.name}</h4></div><ProductRail products={[product]} onSelect={onSelect} /></article>)}</div></section>;
  }
  return <section id={id} className={`shelf-showcase ${className}`}><div className="showcase-heading"><span className="section-marker">{title === "Bovonto" ? "02 — DEDICATED BRAND" : displayTitle.toUpperCase()}</span><h3>{displayTitle}</h3><p>{accent}</p></div>{title === "Bovonto" ? <BentoShowcase products={railProducts} onSelect={onSelect} /> : <ProductRail products={railProducts} onSelect={onSelect} />}</section>;
}
