import { useState } from "react";
import { Calculator, BarChart3, Ruler, Clock, Plus, Minus } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import Section from "../components/layout/Section";
import faqBackground from "../assets/faq-background.jpg";

const ITEM_ICONS = [Calculator, BarChart3, Ruler, Clock];

export default function FAQ() {
  const { t, raw } = useLanguage();
  const items = raw("faq.items") || [];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section
      id="faq"
      style={{
        backgroundImage: `url(${faqBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-8 bg-border" />
          {t("faq.eyebrow")}
          <span className="h-px w-8 bg-border" />
        </div>
        <h2 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink leading-tight">
          {t("faq.title")}
        </h2>
        <p className="mt-4 text-ink-soft text-base lg:text-lg">{t("faq.subtitle")}</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const Icon = ITEM_ICONS[index % ITEM_ICONS.length];
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-colors ${
                isOpen
                  ? "border-border bg-surface shadow-sm"
                  : "border-border/60 bg-surface/50"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-4 p-5 text-left"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-ink">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <span className="flex-1 font-semibold text-ink">{item.q}</span>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isOpen ? "bg-accent text-white" : "bg-sand text-ink"
                  }`}
                >
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              {isOpen && (
                <p className="px-5 pb-5 pl-[4.75rem] text-sm text-ink-soft">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
