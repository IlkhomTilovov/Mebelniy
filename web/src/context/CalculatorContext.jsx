import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { calculateEstimate } from "../lib/estimate";
import { trackEvent } from "../lib/analytics";

const CalculatorContext = createContext(null);
const STORAGE_KEY = "ks_calculator_answers";
export const TOTAL_STEPS = 9;

const initialAnswers = {
  layout: null,
  dimensions: { length: null, secondWallLength: null, ceilingHeight: null, unknown: false },
  style: null,
  material: null,
  hardware: null,
  countertop: null,
  budget: null,
  timeline: null,
  contact: { name: "", phone: "", comment: "", consent: false },
};

function loadPersisted() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialAnswers, ...JSON.parse(raw) } : initialAnswers;
  } catch {
    return initialAnswers;
  }
}

export function CalculatorProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(loadPersisted);
  const [submitted, setSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState(null);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
  }, [answers]);

  const open = () => {
    setIsOpen(true);
    trackEvent("CalculatorStarted", {}, "calculator_started");
  };
  const close = () => setIsOpen(false);

  const updateAnswers = (patch) => setAnswers((prev) => ({ ...prev, ...patch }));

  const goNext = () => {
    trackEvent("CalculatorStepCompleted", { step });
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 1));
  const goToStep = (n) => setStep(Math.min(Math.max(n, 1), TOTAL_STEPS));

  const estimate = useMemo(() => calculateEstimate(answers), [answers]);

  const reset = () => {
    setAnswers(initialAnswers);
    setStep(1);
    setSubmitted(false);
    setSubmittedLeadId(null);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const value = {
    isOpen,
    open,
    close,
    step,
    totalSteps: TOTAL_STEPS,
    goNext,
    goBack,
    goToStep,
    answers,
    updateAnswers,
    estimate,
    submitted,
    setSubmitted,
    submittedLeadId,
    setSubmittedLeadId,
    reset,
  };

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>;
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext);
  if (!ctx) throw new Error("useCalculator must be used within CalculatorProvider");
  return ctx;
}
