import { useLanguage } from "../../i18n/LanguageContext";
import { useCalculator } from "../../context/CalculatorContext";
import OptionCard from "../../components/ui/OptionCard";
import { MATERIAL_ITEMS } from "../../data/materials";

export default function Step4Material() {
  const { t } = useLanguage();
  const { answers, updateAnswers, goNext } = useCalculator();

  const options = [...MATERIAL_ITEMS, { key: "other", image: null }];

  const select = (material) => {
    updateAnswers({ material });
    goNext();
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">{t("calculator.step4.title")}</h3>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {options.map(({ key, image }) => (
          <OptionCard
            key={key}
            label={t(`calculator.step4.options.${key}`)}
            description={t(`calculator.step4.descriptions.${key}`)}
            image={image}
            selected={answers.material === key}
            onClick={() => select(key)}
          />
        ))}
      </div>
    </div>
  );
}
