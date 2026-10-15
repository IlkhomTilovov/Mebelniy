import { useLanguage } from "../../i18n/LanguageContext";
import { useCalculator } from "../../context/CalculatorContext";
import OptionCard from "../../components/ui/OptionCard";

const LAYOUTS = ["straight", "l_shaped", "u_shaped", "island", "unsure"];

const DIAGRAMS = {
  straight: (
    <svg viewBox="0 0 100 60" className="h-16 w-full">
      <rect x="10" y="25" width="80" height="12" rx="2" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  l_shaped: (
    <svg viewBox="0 0 100 60" className="h-16 w-full">
      <path d="M10 48 V15 H45 V27 H90 V48 Z" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  u_shaped: (
    <svg viewBox="0 0 100 60" className="h-16 w-full">
      <path d="M10 12 H30 V40 H70 V12 H90 V52 H10 Z" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  island: (
    <svg viewBox="0 0 100 60" className="h-16 w-full">
      <rect x="10" y="10" width="80" height="10" fill="currentColor" opacity="0.25" />
      <rect x="35" y="35" width="30" height="14" rx="2" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  unsure: (
    <svg viewBox="0 0 100 60" className="h-16 w-full">
      <text x="50" y="38" fontSize="24" textAnchor="middle" fill="currentColor" opacity="0.4">?</text>
    </svg>
  ),
};

export default function Step1Layout() {
  const { t } = useLanguage();
  const { answers, updateAnswers, goNext } = useCalculator();

  const select = (layout) => {
    updateAnswers({ layout });
    goNext();
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">{t("calculator.step1.title")}</h3>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {LAYOUTS.map((layout) => (
          <OptionCard
            key={layout}
            label={t(`calculator.step1.options.${layout}`)}
            selected={answers.layout === layout}
            onClick={() => select(layout)}
            icon={<div className="text-accent">{DIAGRAMS[layout]}</div>}
          />
        ))}
      </div>
    </div>
  );
}
