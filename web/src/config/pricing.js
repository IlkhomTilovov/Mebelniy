// ─────────────────────────────────────────────────────────────────────────
// CENTRALIZED PRICING CONFIGURATION
//
// This is the ONLY place that defines how a preliminary price estimate is
// calculated. Nothing in the calculator invents numbers — if a value below
// is left as `null`, the estimate engine (see src/lib/estimate.js) will
// honestly report "individual calculation required" instead of guessing.
//
// All monetary values are in UZS (Uzbek soums), per running meter unless
// stated otherwise. Replace every `null` with the business's real rate.
// ─────────────────────────────────────────────────────────────────────────

export const PRICING_CONFIG = {
  // Flip to true only once every rate you intend to use below is a real number.
  // While false, the calculator always shows "individual calculation required".
  configured: false,

  currency: "UZS",

  // Base manufacturing rate per linear meter of cabinetry, by layout type.
  // L-shaped / U-shaped kitchens add the secondary wall length(s) at their
  // own rate because corner sections and extra walls are rarely priced
  // the same as a straight run.
  layouts: {
    straight: {
      baseRatePerMeter: null, // e.g. 3_200_000
    },
    l_shaped: {
      baseRatePerMeter: null,
      secondWallRatePerMeter: null,
    },
    u_shaped: {
      baseRatePerMeter: null,
      secondWallRatePerMeter: null,
    },
    island: {
      baseRatePerMeter: null,
      islandFlatAddOn: null, // flat surcharge for the island module
    },
    // "unsure" has no rate on purpose — it always routes to a consultation.
    unsure: null,
  },

  // Multiplier applied to the base layout cost depending on the facade material.
  materials: {
    laminated_mdf: { coefficient: null }, // e.g. 1.0 (baseline)
    painted_mdf: { coefficient: null },
    acrylic: { coefficient: null },
    // "other" / "need advice" is intentionally uncalculated.
    other: null,
  },

  // Flat add-on per linear meter for hardware (hinges, slides, lifts).
  hardware: {
    standard: { addOnPerMeter: null },
    premium: { addOnPerMeter: null },
  },

  // Countertop price per linear meter, by tier.
  countertop: {
    standard: { pricePerMeter: null },
    premium: { pricePerMeter: null },
  },

  // Installation / delivery cost.
  installation: {
    flatFee: null,
    perMeterFee: null,
  },

  // The estimate is shown as a range, not a single number.
  // e.g. 12 means the displayed range is roughly [total * 0.88, total * 1.12].
  rangeMarginPercent: 12,
};
