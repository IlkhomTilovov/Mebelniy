import { Calculator, ArrowRight, Ruler, Gem, Settings } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { useCalculator } from "../context/CalculatorContext";
import heroKitchen from "../assets/hero-kitchen.jpg";

const FEATURE_ICONS = { ruler: Ruler, gem: Gem, settings: Settings };

export default function Hero() {
  const { t, raw } = useLanguage();
  const { open } = useCalculator();
  const features = raw("hero.features") || [];

  return (
    <section id="top" className="relative min-h-screen snap-start flex items-start overflow-hidden">
      <img
        src={heroKitchen}
        alt="Premium custom kitchen"
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

        <div className="mt-10 flex items-start justify-center divide-x divide-white/20">
          {features.map((feature, index) => {
            const Icon = FEATURE_ICONS[feature.icon];
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-3 px-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur text-white border border-white/20">
                  {Icon && <Icon size={22} strokeWidth={1.75} />}
                </div>
                <span className="text-sm font-medium text-white/90 leading-snug">
                  {feature.label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-sm text-white/70 border-l-2 border-accent pl-4 inline-block text-left">
          {t("hero.trust")}
        </p>
      </div>

      <div className="absolute inset-x-5 bottom-16 z-10 flex justify-center sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-20">
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
