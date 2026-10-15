import rateLimit from "express-rate-limit";

// Basic spam protection: a single visitor should not be submitting the lead
// form dozens of times per minute. Generous enough not to block a genuine
// customer who retries after a network hiccup.
export const leadsRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "too_many_requests" },
});
