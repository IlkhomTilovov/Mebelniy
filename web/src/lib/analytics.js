import { META_PIXEL_ID } from "../config/site";

let initialized = false;
const firedOnce = new Set();

// Loads the Meta Pixel script lazily. Safe no-op when no Pixel ID is configured,
// so the rest of the site keeps working without it.
export function initPixel() {
  if (initialized || !META_PIXEL_ID) return;
  initialized = true;

  /* eslint-disable */
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

// `dedupeKey`, when provided, guarantees the event fires only once per key
// for the lifetime of the page (prevents duplicate Lead events on retries,
// re-renders, or repeated callback invocations).
export function trackEvent(eventName, params = {}, dedupeKey) {
  if (!META_PIXEL_ID || typeof window.fbq !== "function") return;

  if (dedupeKey) {
    if (firedOnce.has(dedupeKey)) return;
    firedOnce.add(dedupeKey);
  }

  const isCustom = !STANDARD_EVENTS.has(eventName);
  window.fbq(isCustom ? "trackCustom" : "track", eventName, params);
}

const STANDARD_EVENTS = new Set(["PageView", "ViewContent", "Lead", "Contact"]);
