import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useCalculator } from "../../context/CalculatorContext";
import { submitLead } from "../../lib/api";
import { trackEvent } from "../../lib/analytics";
import { readAttribution } from "../../lib/utm";

const PHONE_PATTERN = /^\+?[0-9][0-9\s-]{8,14}$/;

export default function Step9Contact() {
  const { t, language } = useLanguage();
  const { answers, updateAnswers, estimate, goBack, setSubmitted, setSubmittedLeadId } =
    useCalculator();
  const { contact } = answers;
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const setContact = (patch) => updateAnswers({ contact: { ...contact, ...patch } });

  const validate = () => {
    const next = {};
    if (!contact.name.trim()) next.name = t("calculator.step9.errors.name");
    if (!PHONE_PATTERN.test(contact.phone.trim())) next.phone = t("calculator.step9.errors.phone");
    if (!contact.consent) next.consent = t("calculator.step9.errors.consent");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    trackEvent("Contact", {}, "contact_initiated");

    try {
      const { leadId } = await submitLead({
        name: contact.name.trim(),
        phone: contact.phone.trim(),
        comment: contact.comment.trim(),
        consent: contact.consent,
        language,
        categories: answers.categories,
        layout: answers.layout,
        dimensions: answers.dimensions,
        style: answers.style,
        material: answers.material,
        hardware: answers.hardware,
        countertop: answers.countertop,
        budget: answers.budget,
        timeline: answers.timeline,
        estimate: estimate.available
          ? { min: estimate.min, max: estimate.max, currency: estimate.currency }
          : null,
        attribution: readAttribution(),
      });

      trackEvent("Lead", {}, "lead_submitted");
      setSubmittedLeadId(leadId);
      setSubmitted(true);
    } catch {
      setSubmitError(t("calculator.step9.errors.submission"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold text-ink">{t("calculator.step9.title")}</h3>

      <div className="mt-6 space-y-5">
        <Field
          label={t("calculator.step9.nameLabel")}
          error={errors.name}
          input={
            <input
              type="text"
              placeholder={t("calculator.step9.namePlaceholder")}
              value={contact.name}
              onChange={(e) => setContact({ name: e.target.value })}
              className={inputClass(errors.name)}
            />
          }
        />

        <Field
          label={t("calculator.step9.phoneLabel")}
          error={errors.phone}
          input={
            <input
              type="tel"
              placeholder={t("calculator.step9.phonePlaceholder")}
              value={contact.phone}
              onChange={(e) => setContact({ phone: e.target.value })}
              className={inputClass(errors.phone)}
            />
          }
        />

        <Field
          label={t("calculator.step9.commentLabel")}
          input={
            <textarea
              placeholder={t("calculator.step9.commentPlaceholder")}
              value={contact.comment}
              onChange={(e) => setContact({ comment: e.target.value })}
              rows={3}
              className={inputClass(false)}
            />
          }
        />

        <label className="flex items-start gap-3 text-sm text-ink-soft cursor-pointer">
          <input
            type="checkbox"
            checked={contact.consent}
            onChange={(e) => setContact({ consent: e.target.checked })}
            className="mt-0.5 h-4 w-4 accent-[#7C8068]"
          />
          {t("calculator.step9.consentLabel")}
        </label>
        {errors.consent && <p className="text-xs text-red-600">{errors.consent}</p>}
      </div>

      {submitError && <p className="mt-4 text-sm text-red-600">{submitError}</p>}

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center justify-center rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink hover:border-ink/40"
        >
          {t("common.back")}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50"
        >
          {isSubmitting ? t("calculator.step9.submitting") : t("calculator.step9.submit")}
        </button>
      </div>
    </form>
  );
}

function Field({ label, error, input }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-2">{label}</label>
      {input}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function inputClass(hasError) {
  return `w-full rounded-xl border px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-accent ${
    hasError ? "border-red-400" : "border-border bg-surface"
  }`;
}
