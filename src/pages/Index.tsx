import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServiceAreasSection from "@/components/ServiceAreasSection";
import ProductCatalog from "@/components/ProductCatalog";
import MeribaSection from "@/components/MeribaSection";
import WhyUsSection from "@/components/WhyUsSection";
import BrandsSection from "@/components/BrandsSection";
import ContactSection from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductCatalog />
      <MeribaSection />
      <ServiceAreasSection />
      <WhyUsSection />
      <BrandsSection />
      <ContactSection />
      <Footer />
    </div>
  </LanguageProvider>
);

export default Index;
