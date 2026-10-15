import { useLanguage } from "../i18n/LanguageContext";
import { useCalculator } from "../context/CalculatorContext";
import Button from "../components/ui/Button";

export default function StepFooter({ onContinue, continueDisabled, continueLabel }) {
  const { t } = useLanguage();
  const { step, goBack } = useCalculator();

  return (
    <div className="mt-8 flex items-center gap-3">
      {step > 1 && (
        <Button variant="secondary" onClick={goBack}>
          {t("common.back")}
        </Button>
      )}
      <Button onClick={onContinue} disabled={continueDisabled} className="flex-1 sm:flex-none">
        {continueLabel || t("common.continue")}
      </Button>
    </div>
  );
}
