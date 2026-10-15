import { useLanguage } from "../../i18n/LanguageContext";
import { useCalculator } from "../../context/CalculatorContext";
import OptionCard from "../../components/ui/OptionCard";

const TIMELINES = ["asap", "within_1_2_months", "later", "exploring"];

export default function Step7Timeline() {
  const { t } = useLanguage();
  const { answers, updateAnswers, goNext } = useCalculator();

  const select = (timeline) => {
    updateAnswers({ timeline });
    goNext();
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">{t("calculator.step7.title")}</h3>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {TIMELINES.map((timeline) => (
          <OptionCard
            key={timeline}
            label={t(`calculator.step7.options.${timeline}`)}
            selected={answers.timeline === timeline}
            onClick={() => select(timeline)}
          />
        ))}
      </div>
    </div>
  );
}
