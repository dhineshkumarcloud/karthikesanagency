import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Language } from "@/lib/translations";

type TranslationType = (typeof translations)[Language];

interface LanguageContextType {
  lang: Language;
  t: TranslationType;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");
  const toggle = () => setLang((l) => (l === "en" ? "ta" : "en"));
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
