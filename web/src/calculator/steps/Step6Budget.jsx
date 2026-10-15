import { useLanguage } from "../../i18n/LanguageContext";
import { useCalculator } from "../../context/CalculatorContext";
import OptionCard from "../../components/ui/OptionCard";

const BUDGETS = ["under_20", "r20_40", "r40_70", "over_70", "flexible", "unsure"];

export default function Step6Budget() {
  const { t } = useLanguage();
  const { answers, updateAnswers, goNext } = useCalculator();

  const select = (budget) => {
    updateAnswers({ budget });
    goNext();
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">{t("calculator.step6.title")}</h3>
      <p className="mt-2 text-sm text-ink-soft">{t("calculator.step6.subtitle")}</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {BUDGETS.map((budget) => (
          <OptionCard
            key={budget}
            label={t(`calculator.step6.options.${budget}`)}
            selected={answers.budget === budget}
            onClick={() => select(budget)}
          />
        ))}
      </div>
    </div>
  );
}
