const STORAGE_KEY = "ks_attribution";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

// Captures UTM params and fbclid from the current URL and persists them for
// the whole session (including the multi-step calculator and language
// switches), without overwriting a previously captured first-touch value.
export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const captured = {};

    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) captured[key] = value;
    });

    const fbclid = params.get("fbclid");
    if (fbclid) captured.fbclid = fbclid;

    if (Object.keys(captured).length === 0) {
      return readAttribution();
    }

    const existing = readAttribution() || {};
    const merged = { ...captured, ...existing, ...captured }; // first touch wins, but fill gaps
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return {};
  }
}

export function readAttribution() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
