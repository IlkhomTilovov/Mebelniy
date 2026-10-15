import { ChefHat, DoorOpen, BedDouble, Sofa, Tv, Archive, Briefcase, Baby, MoreHorizontal } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useCalculator } from "../../context/CalculatorContext";
import { CATEGORY_IDS } from "../../data/categories";
import OptionCard from "../../components/ui/OptionCard";
import StepFooter from "../StepFooter";

const CATEGORY_ICONS = {
  oshxona: ChefHat,
  shkaf_garderob: DoorOpen,
  yotoqxona: BedDouble,
  mehmonxona: Sofa,
  tv_zona: Tv,
  komod_tumba: Archive,
  ish_stol_kabinet: Briefcase,
  bolalar_xonasi: Baby,
  koridor: DoorOpen,
  boshqa: MoreHorizontal,
};

export default function StepCategory() {
  const { t } = useLanguage();
  const { answers, updateAnswers, goNext } = useCalculator();
  const selected = answers.categories || [];

  const toggle = (categoryId) => {
    const next = selected.includes(categoryId)
      ? selected.filter((id) => id !== categoryId)
      : [...selected, categoryId];
    updateAnswers({ categories: next });
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">{t("calculator.stepCategory.title")}</h3>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {CATEGORY_IDS.map((categoryId) => {
          const Icon = CATEGORY_ICONS[categoryId];
          return (
            <OptionCard
              key={categoryId}
              label={t(`calculator.stepCategory.options.${categoryId}`)}
              selected={selected.includes(categoryId)}
              onClick={() => toggle(categoryId)}
              icon={<Icon size={22} strokeWidth={1.75} className="text-accent" />}
            />
          );
        })}
      </div>

      <StepFooter onContinue={goNext} continueDisabled={selected.length === 0} />
    </div>
  );
}
