import { LanguageProvider } from "@/contexts/LanguageContext";
import NewExperience from "@/components/NewExperience";

const Index = () => (
  <LanguageProvider>
    <NewExperience />
  </LanguageProvider>
);

export default Index;
