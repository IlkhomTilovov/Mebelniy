import { useLanguage } from "../../i18n/LanguageContext";
import { useCalculator } from "../../context/CalculatorContext";
import StepFooter from "../StepFooter";

export default function Step2Dimensions() {
  const { t } = useLanguage();
  const { answers, updateAnswers, goNext } = useCalculator();
  const { dimensions } = answers;
  const showSecondWall = answers.layout === "l_shaped" || answers.layout === "u_shaped";

  const setDimension = (patch) =>
    updateAnswers({ dimensions: { ...dimensions, ...patch } });

  const toggleUnknown = () => {
    const unknown = !dimensions.unknown;
    setDimension({
      unknown,
      length: unknown ? null : dimensions.length,
      secondWallLength: unknown ? null : dimensions.secondWallLength,
    });
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">{t("calculator.step2.title")}</h3>

      <div className={`mt-6 space-y-5 ${dimensions.unknown ? "opacity-50" : ""}`}>
        <NumberField
          label={t("calculator.step2.lengthLabel")}
          unit={t("calculator.step2.unitHint")}
          value={dimensions.length}
          disabled={dimensions.unknown}
          onChange={(v) => setDimension({ length: v })}
        />

        {showSecondWall && (
          <NumberField
            label={t("calculator.step2.secondWallLabel")}
            unit={t("calculator.step2.unitHint")}
            value={dimensions.secondWallLength}
            disabled={dimensions.unknown}
            onChange={(v) => setDimension({ secondWallLength: v })}
          />
        )}

        <NumberField
          label={t("calculator.step2.ceilingHeightLabel")}
          unit={t("calculator.step2.unitHint")}
          value={dimensions.ceilingHeight}
          disabled={dimensions.unknown}
          onChange={(v) => setDimension({ ceilingHeight: v })}
        />
      </div>

      <label className="mt-5 flex items-center gap-3 text-sm text-ink-soft cursor-pointer">
        <input
          type="checkbox"
          checked={dimensions.unknown}
          onChange={toggleUnknown}
          className="h-4 w-4 accent-[#7C8068]"
        />
        {t("calculator.step2.unknownOption")}
      </label>

      <StepFooter onContinue={goNext} />
    </div>
  );
}

function NumberField({ label, unit, value, disabled, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-2">{label}</label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          disabled={disabled}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-14 text-ink focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-not-allowed"
        />
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
