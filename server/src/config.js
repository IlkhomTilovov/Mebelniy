import "dotenv/config";

export const config = {
  port: Number(process.env.PORT) || 4000,
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",
  telegramChatId: process.env.TELEGRAM_CHAT_ID || "",
  dbPath: process.env.DB_PATH || "./data/leads.sqlite",
};

export const isTelegramConfigured = Boolean(config.telegramBotToken && config.telegramChatId);
