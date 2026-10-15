import { useLanguage } from "../../i18n/LanguageContext";

export default function ProgressBar({ current, total }) {
  const { t } = useLanguage();
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 text-xs text-ink-soft">
        <span>{t("common.stepOf", { current, total })}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-sand overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
