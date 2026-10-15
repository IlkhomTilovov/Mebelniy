import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { insertLead, updateTelegramDeliveryStatus } from "../db.js";
import { sendTelegramNotification } from "../services/telegram.js";
import { leadsRateLimiter } from "../middleware/rateLimit.js";

const router = Router();

const dimensionsSchema = z
  .object({
    length: z.number().positive().nullable().optional(),
    secondWallLength: z.number().positive().nullable().optional(),
    ceilingHeight: z.number().positive().nullable().optional(),
    unknown: z.boolean().optional(),
  })
  .nullable()
  .optional();

const estimateSchema = z
  .object({
    min: z.number(),
    max: z.number(),
    currency: z.string(),
  })
  .nullable()
  .optional();

const attributionSchema = z
  .object({
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_content: z.string().optional(),
    utm_term: z.string().optional(),
    fbclid: z.string().optional(),
  })
  .optional();

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(7).max(30),
  comment: z.string().trim().max(1000).optional().default(""),
  consent: z.literal(true),
  language: z.enum(["uz", "ru"]).optional().default("uz"),
  layout: z.string().max(40).nullable().optional(),
  dimensions: dimensionsSchema,
  style: z.string().max(40).nullable().optional(),
  material: z.string().max(40).nullable().optional(),
  hardware: z.string().max(40).nullable().optional(),
  countertop: z.string().max(40).nullable().optional(),
  budget: z.string().max(40).nullable().optional(),
  timeline: z.string().max(40).nullable().optional(),
  estimate: estimateSchema,
  attribution: attributionSchema,
});

router.post("/", leadsRateLimiter, async (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_input", details: parsed.error.flatten() });
  }

  const data = parsed.data;
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const attribution = data.attribution || {};

  const record = {
    id,
    created_at: createdAt,
    name: data.name,
    phone: data.phone,
    language: data.language,
    layout: data.layout || null,
    dimensions: JSON.stringify(data.dimensions || null),
    style: data.style || null,
    material: data.material || null,
    hardware: data.hardware || null,
    countertop: data.countertop || null,
    budget: data.budget || null,
    timeline: data.timeline || null,
    estimate_min: data.estimate?.min ?? null,
    estimate_max: data.estimate?.max ?? null,
    estimate_currency: data.estimate?.currency ?? null,
    comment: data.comment || "",
    consent: 1,
    utm_source: attribution.utm_source || null,
    utm_medium: attribution.utm_medium || null,
    utm_campaign: attribution.utm_campaign || null,
    utm_content: attribution.utm_content || null,
    utm_term: attribution.utm_term || null,
    fbclid: attribution.fbclid || null,
    telegram_status: "pending",
  };

  try {
    // Lead is persisted before Telegram delivery is attempted, so a Telegram
    // failure never loses the lead.
    insertLead(record);
  } catch (err) {
    console.error("[leads] failed to persist lead", err);
    return res.status(500).json({ error: "storage_failed" });
  }

  res.status(201).json({ success: true, leadId: id });

  const delivery = await sendTelegramNotification({
    ...record,
    dimensions: data.dimensions,
  });
  updateTelegramDeliveryStatus(id, delivery.ok ? "sent" : "failed", delivery.error || null);
  if (!delivery.ok) {
    console.error(`[leads] Telegram delivery failed for lead ${id}: ${delivery.error}`);
  }
});

export default router;
