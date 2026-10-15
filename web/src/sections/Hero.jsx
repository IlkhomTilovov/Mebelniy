import { Calculator, ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { useCalculator } from "../context/CalculatorContext";
import heroFurniture from "../assets/hero-furniture.jpg";

export default function Hero() {
  const { t } = useLanguage();
  const { open } = useCalculator();

  return (
    <section id="top" className="relative min-h-screen snap-start flex items-start overflow-hidden">
      <img
        src={heroFurniture}
        alt="Premium custom furniture interior"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 lg:px-8 pt-28 pb-32 lg:pt-32 lg:pb-40 text-center">
        <div className="flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-sand">
          <span className="h-px w-8 bg-white/30" />
          {t("hero.eyebrow")}
          <span className="h-px w-8 bg-white/30" />
        </div>

        <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.12]">
          {t("hero.title")}
        </h1>
        <p className="mt-6 text-lg text-white/80 max-w-lg mx-auto">{t("hero.subtitle")}</p>
      </div>

      <div className="absolute inset-x-5 bottom-32 z-10 flex justify-center sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-36">
        <button
          type="button"
          onClick={open}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-accent-dark sm:w-auto"
        >
          <Calculator size={18} />
          {t("hero.ctaPrimary")}
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
