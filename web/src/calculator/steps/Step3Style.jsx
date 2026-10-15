import { useLanguage } from "../../i18n/LanguageContext";
import { useCalculator } from "../../context/CalculatorContext";
import OptionCard from "../../components/ui/OptionCard";

const STYLES = [
  { key: "modern", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" },
  { key: "minimalist", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=600" },
  { key: "classic", image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=600" },
  { key: "scandinavian", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600" },
  { key: "other", image: null },
];

export default function Step3Style() {
  const { t } = useLanguage();
  const { answers, updateAnswers, goNext } = useCalculator();

  const select = (style) => {
    updateAnswers({ style });
    goNext();
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">{t("calculator.step3.title")}</h3>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {STYLES.map(({ key, image }) => (
          <OptionCard
            key={key}
            label={t(`calculator.step3.options.${key}`)}
            image={image}
            selected={answers.style === key}
            onClick={() => select(key)}
          />
        ))}
      </div>
    </div>
  );
}
