import { PRICING_CONFIG } from "../config/pricing";

// Returns either:
//   { available: true, min, max, currency }
// or:
//   { available: false, reason: "not_configured" | "missing_inputs" | "non_calculable_selection" }
//
// This function NEVER fabricates a number. Every branch either resolves to
// a real multiplication of business-entered rates, or bails out honestly.
export function calculateEstimate(answers) {
  const cfg = PRICING_CONFIG;

  if (!cfg.configured) {
    return { available: false, reason: "not_configured" };
  }

  const { layout, dimensions, material, hardware, countertop } = answers;

  if (!layout || layout === "unsure") {
    return { available: false, reason: "non_calculable_selection" };
  }
  if (!material || material === "other") {
    return { available: false, reason: "non_calculable_selection" };
  }
  if (!dimensions || dimensions.unknown || !dimensions.length) {
    return { available: false, reason: "missing_inputs" };
  }

  const layoutCfg = cfg.layouts[layout];
  if (!layoutCfg || !isNumber(layoutCfg.baseRatePerMeter)) {
    return { available: false, reason: "not_configured" };
  }

  const materialCfg = cfg.materials[material];
  if (!materialCfg || !isNumber(materialCfg.coefficient)) {
    return { available: false, reason: "not_configured" };
  }

  let cabinetryCost = dimensions.length * layoutCfg.baseRatePerMeter;

  // L-shaped / U-shaped: add the second wall at its own rate, if provided.
  if ((layout === "l_shaped" || layout === "u_shaped") && dimensions.secondWallLength) {
    if (!isNumber(layoutCfg.secondWallRatePerMeter)) {
      return { available: false, reason: "not_configured" };
    }
    cabinetryCost += dimensions.secondWallLength * layoutCfg.secondWallRatePerMeter;
  }

  // Island: flat add-on for the island module.
  if (layout === "island" && isNumber(layoutCfg.islandFlatAddOn)) {
    cabinetryCost += layoutCfg.islandFlatAddOn;
  }

  cabinetryCost *= materialCfg.coefficient;

  const totalLength = dimensions.length + (dimensions.secondWallLength || 0);

  let hardwareCost = 0;
  if (hardware && hardware !== "unsure") {
    const hardwareCfg = cfg.hardware[hardware];
    if (!hardwareCfg || !isNumber(hardwareCfg.addOnPerMeter)) {
      return { available: false, reason: "not_configured" };
    }
    hardwareCost = totalLength * hardwareCfg.addOnPerMeter;
  }

  let countertopCost = 0;
  if (countertop && countertop !== "unsure") {
    const countertopCfg = cfg.countertop[countertop];
    if (!countertopCfg || !isNumber(countertopCfg.pricePerMeter)) {
      return { available: false, reason: "not_configured" };
    }
    countertopCost = totalLength * countertopCfg.pricePerMeter;
  }

  let installationCost = 0;
  if (isNumber(cfg.installation.flatFee)) installationCost += cfg.installation.flatFee;
  if (isNumber(cfg.installation.perMeterFee)) {
    installationCost += totalLength * cfg.installation.perMeterFee;
  }

  const total = cabinetryCost + hardwareCost + countertopCost + installationCost;

  if (!isNumber(total) || total <= 0) {
    return { available: false, reason: "missing_inputs" };
  }

  const margin = (cfg.rangeMarginPercent || 0) / 100;
  const min = Math.round((total * (1 - margin)) / 10000) * 10000;
  const max = Math.round((total * (1 + margin)) / 10000) * 10000;

  return { available: true, min, max, currency: cfg.currency };
}

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

export function formatCurrency(amount, currency = "UZS") {
  return new Intl.NumberFormat("uz-UZ").format(amount) + " " + currency;
}
