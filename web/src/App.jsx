import { useEffect } from "react";
import { LanguageProvider } from "./i18n/LanguageContext";
import { CalculatorProvider, useCalculator } from "./context/CalculatorContext";
import { initPixel, trackEvent } from "./lib/analytics";
import { captureAttribution } from "./lib/utm";

import Header from "./components/layout/Header";
import Hero from "./sections/Hero";
import FAQ from "./sections/FAQ";
import CalculatorModal from "./calculator/CalculatorModal";

function AppContent() {
  const { isOpen } = useCalculator();

  useEffect(() => {
    captureAttribution();
    initPixel();
    trackEvent("ViewContent", { content_name: "landing_page" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!isOpen && <Header />}

      <main>
        <Hero />
        <FAQ />
      </main>

      <CalculatorModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CalculatorProvider>
        <AppContent />
      </CalculatorProvider>
    </LanguageProvider>
  );
}
