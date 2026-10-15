import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, t as translate } from "./translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "ks_language";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "uz" || stored === "ru") return stored;
    } catch {
      /* ignore */
    }
    return "uz";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    const dict = translations[language];
    return {
      language,
      setLanguage,
      t: (key, vars) => translate(dict, key, vars),
      // Returns the step/options dictionary's raw object (for lists like FAQ items).
      raw: (key) => key.split(".").reduce((acc, part) => acc?.[part], dict),
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
