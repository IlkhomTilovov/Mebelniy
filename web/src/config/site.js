// Business-specific values. Replace placeholders before launch.
export const SITE = {
  brandName: "KITCHEN STUDIO",
  phone: "+998 90 000 00 00", // TODO: real business phone
  telegramUsername: "kitchenstudio_uz", // TODO: real Telegram contact username
  instagramUrl: "https://instagram.com/kitchenstudio.uz", // TODO
  facebookUrl: "https://facebook.com/kitchenstudio.uz", // TODO
  city: "Toshkent",
  currency: "UZS",
};

// Meta Pixel ID is read from env; site stays fully functional if it's not set.
export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "";

// Base URL of the backend API (same origin in dev via Vite proxy, override in prod).
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
