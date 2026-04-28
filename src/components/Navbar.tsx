import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navKeys = ["home", "about", "products", "serviceAreas", "whyUs", "brands", "contact"] as const;

const Navbar = () => {
  const { t, toggle } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b" : "bg-background/80 backdrop-blur-sm"}`}>
      <div className="container flex items-center justify-between h-16">
        <button onClick={() => scrollTo("hero")} className="text-lg font-extrabold text-gradient">
          Karthikesan Agencies
        </button>
        <div className="hidden lg:flex items-center gap-5">
          {navKeys.map(key => (
            <button
              key={key}
              onClick={() => scrollTo(key === "home" ? "hero" : key)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t.nav[key]}
            </button>
          ))}
          <Button size="sm" variant="outline" onClick={toggle} className="gap-1.5 rounded-full">
            <Globe className="w-4 h-4" />
            {t.language}
          </Button>
        </div>
        <div className="flex lg:hidden items-center gap-2">
          <Button size="icon" variant="ghost" onClick={toggle}><Globe className="w-4 h-4" /></Button>
          <Button size="icon" variant="ghost" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t bg-background p-4 space-y-3 shadow-lg">
          {navKeys.map(key => (
            <button
              key={key}
              onClick={() => scrollTo(key === "home" ? "hero" : key)}
              className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-primary py-1.5"
            >
              {t.nav[key]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
