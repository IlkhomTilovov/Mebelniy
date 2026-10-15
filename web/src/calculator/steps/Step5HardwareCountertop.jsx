import { useLanguage } from "../../i18n/LanguageContext";
import { useCalculator } from "../../context/CalculatorContext";
import OptionCard from "../../components/ui/OptionCard";
import StepFooter from "../StepFooter";

const CHOICES = ["standard", "premium", "unsure"];

export default function Step5HardwareCountertop() {
  const { t } = useLanguage();
  const { answers, updateAnswers, goNext } = useCalculator();

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">{t("calculator.step5.title")}</h3>

      <div className="mt-6">
        <div className="text-sm font-semibold text-ink mb-3">
          {t("calculator.step5.hardwareLabel")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CHOICES.map((choice) => (
            <OptionCard
              key={choice}
              label={t(`calculator.step5.options.${choice}`)}
              selected={answers.hardware === choice}
              onClick={() => updateAnswers({ hardware: choice })}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm font-semibold text-ink mb-3">
          {t("calculator.step5.countertopLabel")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CHOICES.map((choice) => (
            <OptionCard
              key={choice}
              label={t(`calculator.step5.options.${choice}`)}
              selected={answers.countertop === choice}
              onClick={() => updateAnswers({ countertop: choice })}
            />
          ))}
        </div>
      </div>

      <StepFooter onContinue={goNext} />
    </div>
  );
}
