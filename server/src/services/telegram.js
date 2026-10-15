import { config, isTelegramConfigured } from "../config.js";

const LAYOUT_LABELS = {
  straight: "To'g'ri chiziqli / Прямая",
  l_shaped: "L-shaklli / Г-образная",
  u_shaped: "U-shaklli / П-образная",
  island: "Orolchali / С островом",
  unsure: "Hali bilmayman / Пока не знаю",
};

export function formatLeadMessage(lead) {
  const dims = lead.dimensions || {};
  const dimensionsText = dims.unknown
    ? "—"
    : [dims.length && `${dims.length}m`, dims.secondWallLength && `${dims.secondWallLength}m`]
        .filter(Boolean)
        .join(" + ") || "—";

  const estimateText =
    lead.estimate_min && lead.estimate_max
      ? `${formatNumber(lead.estimate_min)} – ${formatNumber(lead.estimate_max)} ${lead.estimate_currency || "UZS"}`
      : "Individual calculation required / Требуется индивидуальный расчёт";

  return [
    "NEW KITCHEN LEAD",
    "",
    `Lead ID: ${lead.id}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Language: ${(lead.language || "").toUpperCase()}`,
    `Kitchen layout: ${LAYOUT_LABELS[lead.layout] || lead.layout || "—"}`,
    `Dimensions: ${dimensionsText}`,
    `Style: ${lead.style || "—"}`,
    `Material: ${lead.material || "—"}`,
    `Hardware: ${lead.hardware || "—"}`,
    `Countertop: ${lead.countertop || "—"}`,
    `Budget: ${lead.budget || "—"}`,
    `Timeline: ${lead.timeline || "—"}`,
    `Estimated price: ${estimateText}`,
    `Campaign: ${lead.utm_campaign || "—"}`,
    lead.comment ? `Comments: ${lead.comment}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function formatNumber(n) {
  return new Intl.NumberFormat("uz-UZ").format(n);
}

export async function sendTelegramNotification(lead) {
  if (!isTelegramConfigured) {
    return { ok: false, error: "telegram_not_configured" };
  }

  const url = `https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`;
  const text = formatLeadMessage(lead);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: config.telegramChatId, text }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return { ok: false, error: `telegram_api_error_${response.status}: ${body.slice(0, 200)}` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: `telegram_request_failed: ${err.message}` };
  }
}
