import { useLanguage } from "../../i18n/LanguageContext";
import { useCalculator } from "../../context/CalculatorContext";
import { formatCurrency } from "../../lib/estimate";
import Button from "../../components/ui/Button";

export default function SuccessScreen() {
  const { t } = useLanguage();
  const { answers, estimate, close, reset } = useCalculator();

  const handleClose = () => {
    close();
    reset();
  };

  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="mt-6 text-2xl font-extrabold text-ink">{t("calculator.success.title")}</h3>
      <p className="mt-2 text-ink-soft">{t("calculator.success.subtitle")}</p>

      {estimate.available && (
        <div className="mt-8 w-full rounded-2xl border border-border p-5 text-left">
          <div className="text-sm font-semibold text-ink mb-3">
            {t("calculator.success.summaryTitle")}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-soft">
              {t("calculator.step8.min")} – {t("calculator.step8.max")}
            </span>
            <span className="font-bold text-ink">
              {formatCurrency(estimate.min, estimate.currency)} – {formatCurrency(estimate.max, estimate.currency)}
            </span>
          </div>
          {answers.layout && (
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-ink-soft">{t("calculator.step1.title")}</span>
              <span className="font-medium text-ink">
                {t(`calculator.step1.options.${answers.layout}`)}
              </span>
            </div>
          )}
        </div>
      )}

      <Button onClick={handleClose} className="mt-8 w-full sm:w-auto">
        {t("calculator.success.close")}
      </Button>
    </div>
  );
}
