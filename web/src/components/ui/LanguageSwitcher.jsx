import { useLanguage } from "../../i18n/LanguageContext";

const CONTAINER_VARIANTS = {
  light: "border border-border bg-surface shadow-sm",
  overlay: "border border-white/30 bg-white/10 backdrop-blur",
};

const ACTIVE_VARIANTS = {
  light: "bg-ink text-white",
  overlay: "bg-white text-ink",
};

const INACTIVE_VARIANTS = {
  light: "text-ink-soft hover:text-ink",
  overlay: "text-white/80 hover:text-white",
};

export default function LanguageSwitcher({ className = "", variant = "light" }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full p-1 text-sm font-semibold ${CONTAINER_VARIANTS[variant]} ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      {["uz", "ru"].map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`px-4 py-1.5 rounded-full uppercase transition-colors ${
            language === lang ? ACTIVE_VARIANTS[variant] : INACTIVE_VARIANTS[variant]
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
