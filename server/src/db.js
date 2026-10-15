import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { config } from "./config.js";

mkdirSync(dirname(config.dbPath), { recursive: true });

export const db = new Database(config.dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    language TEXT,
    categories TEXT,
    layout TEXT,
    dimensions TEXT,
    style TEXT,
    material TEXT,
    hardware TEXT,
    countertop TEXT,
    budget TEXT,
    timeline TEXT,
    estimate_min REAL,
    estimate_max REAL,
    estimate_currency TEXT,
    comment TEXT,
    consent INTEGER NOT NULL,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    fbclid TEXT,
    telegram_status TEXT NOT NULL DEFAULT 'pending',
    telegram_error TEXT
  )
`);

// `CREATE TABLE IF NOT EXISTS` above doesn't retroactively alter a table that
// already exists from before the `categories` column was added.
try {
  db.exec("ALTER TABLE leads ADD COLUMN categories TEXT");
} catch {
  /* column already exists */
}

const insertStmt = db.prepare(`
  INSERT INTO leads (
    id, created_at, name, phone, language, categories, layout, dimensions, style, material,
    hardware, countertop, budget, timeline, estimate_min, estimate_max,
    estimate_currency, comment, consent, utm_source, utm_medium, utm_campaign,
    utm_content, utm_term, fbclid, telegram_status
  ) VALUES (
    @id, @created_at, @name, @phone, @language, @categories, @layout, @dimensions, @style, @material,
    @hardware, @countertop, @budget, @timeline, @estimate_min, @estimate_max,
    @estimate_currency, @comment, @consent, @utm_source, @utm_medium, @utm_campaign,
    @utm_content, @utm_term, @fbclid, @telegram_status
  )
`);

export function insertLead(lead) {
  insertStmt.run(lead);
}

const updateDeliveryStmt = db.prepare(
  `UPDATE leads SET telegram_status = @telegram_status, telegram_error = @telegram_error WHERE id = @id`
);

export function updateTelegramDeliveryStatus(id, status, error = null) {
  updateDeliveryStmt.run({ id, telegram_status: status, telegram_error: error });
}
