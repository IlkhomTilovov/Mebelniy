import { useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useCalculator } from "../../context/CalculatorContext";
import { trackEvent } from "../../lib/analytics";
import { formatCurrency } from "../../lib/estimate";
import StepFooter from "../StepFooter";

export default function Step8Estimate() {
  const { t } = useLanguage();
  const { answers, estimate, goNext } = useCalculator();

  useEffect(() => {
    trackEvent("EstimateViewed", {}, "estimate_viewed");
  }, []);

  const { dimensions } = answers;
  const lengthSummary = dimensions.unknown
    ? "—"
    : [dimensions.length, dimensions.secondWallLength].filter(Boolean).join(" + ") +
      ` ${t("calculator.step2.unitHint")}`;

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">{t("calculator.step8.title")}</h3>

      {estimate.available ? (
        <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <PricePill label={t("calculator.step8.min")} value={formatCurrency(estimate.min, estimate.currency)} />
            <span className="text-ink-soft">—</span>
            <PricePill label={t("calculator.step8.max")} value={formatCurrency(estimate.max, estimate.currency)} />
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
          <div className="font-semibold text-ink">{t("calculator.step8.notAvailableTitle")}</div>
          <p className="mt-2 text-sm text-ink-soft">{t("calculator.step8.notAvailableText")}</p>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-border p-5">
        <div className="text-sm font-semibold text-ink mb-3">{t("calculator.step8.yourSelections")}</div>
        <dl className="grid grid-cols-2 gap-y-2 text-sm">
          <SummaryRow label={t("calculator.step1.title")} value={answers.layout && t(`calculator.step1.options.${answers.layout}`)} />
          <SummaryRow label={t("calculator.step2.lengthLabel")} value={lengthSummary} />
          <SummaryRow label={t("calculator.step3.title")} value={answers.style && t(`calculator.step3.options.${answers.style}`)} />
          <SummaryRow label={t("calculator.step4.title")} value={answers.material && t(`calculator.step4.options.${answers.material}`)} />
          <SummaryRow label={t("calculator.step5.hardwareLabel")} value={answers.hardware && t(`calculator.step5.options.${answers.hardware}`)} />
          <SummaryRow label={t("calculator.step5.countertopLabel")} value={answers.countertop && t(`calculator.step5.options.${answers.countertop}`)} />
        </dl>
      </div>

      <div className="mt-6 text-sm text-ink-soft">
        <div className="font-semibold text-ink">{t("calculator.step8.whatAffectsPrice")}</div>
        <p className="mt-1">{t("calculator.step8.whatAffectsPriceText")}</p>
      </div>

      <div className="mt-4 rounded-xl bg-sand/60 p-4 text-xs text-ink-soft">
        <span className="font-semibold text-ink">{t("calculator.estimateDisclaimerTitle")}: </span>
        {t("calculator.estimateDisclaimer")}
      </div>

      <StepFooter onContinue={goNext} continueLabel={t("calculator.step8.ctaContinue")} />
    </div>
  );
}

function PricePill({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-ink-soft">{label}</div>
      <div className="text-xl font-extrabold text-ink">{value}</div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <>
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-ink font-medium text-right">{value || "—"}</dd>
    </>
  );
}
