import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useCalculator } from "../context/CalculatorContext";
import ProgressBar from "../components/ui/ProgressBar";

import StepCategory from "./steps/StepCategory";
import Step1Layout from "./steps/Step1Layout";
import Step2Dimensions from "./steps/Step2Dimensions";
import Step3Style from "./steps/Step3Style";
import Step4Material from "./steps/Step4Material";
import Step5HardwareCountertop from "./steps/Step5HardwareCountertop";
import Step6Budget from "./steps/Step6Budget";
import Step7Timeline from "./steps/Step7Timeline";
import Step8Estimate from "./steps/Step8Estimate";
import Step9Contact from "./steps/Step9Contact";
import SuccessScreen from "./steps/SuccessScreen";

const STEP_COMPONENTS = {
  1: StepCategory,
  2: Step1Layout,
  3: Step2Dimensions,
  4: Step3Style,
  5: Step4Material,
  6: Step5HardwareCountertop,
  7: Step6Budget,
  8: Step7Timeline,
  9: Step8Estimate,
  10: Step9Contact,
};

export default function CalculatorModal() {
  const { t } = useLanguage();
  const { isOpen, close, step, totalSteps, submitted } = useCalculator();

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const StepComponent = STEP_COMPONENTS[step];

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-ink/40 backdrop-blur-sm">
      <div className="relative flex h-full w-full max-w-2xl flex-col bg-background sm:my-6 sm:h-[calc(100%-3rem)] sm:rounded-3xl sm:shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-8">
          <div className="font-extrabold text-ink">{t("calculator.title")}</div>
          <button
            type="button"
            onClick={close}
            aria-label={t("common.close")}
            className="rounded-full p-2 text-ink-soft hover:bg-sand hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {!submitted && (
          <div className="px-5 pt-5 sm:px-8">
            <ProgressBar current={step} total={totalSteps} />
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 no-scrollbar">
          {submitted ? <SuccessScreen /> : StepComponent && <StepComponent />}
        </div>
      </div>
    </div>
  );
}
