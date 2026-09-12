import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Globe } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { key: "home", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "products", href: "#products" },
  { key: "serviceAreas", href: "#serviceAreas" },
  { key: "whyUs", href: "#whyUs" },
  { key: "brands", href: "#brands" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#contact" },
] as const;

const Navbar = () => {
  const { t, toggle } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b" : "bg-background/80 backdrop-blur-sm"
      }`}
      aria-label="Main navigation"
    >
      <div className="container flex items-center justify-between h-16">
        <a href="#hero" className="text-lg font-extrabold text-gradient">
          Karthikesan Agencies
        </a>
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t.nav[key]}
            </a>
          ))}
          <Button size="sm" variant="outline" onClick={toggle} className="gap-1.5 rounded-full">
            <Globe className="w-4 h-4" />
            {t.language}
          </Button>
        </div>
        <div className="flex lg:hidden items-center gap-2">
          <Button size="icon" variant="ghost" onClick={toggle} aria-label="Toggle language">
            <Globe className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div id="mobile-navigation" className="lg:hidden border-t bg-background p-4 space-y-3 shadow-lg">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={closeMenu}
            className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-primary py-1.5"
            >
              {t.nav[key]}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
