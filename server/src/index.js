import express from "express";
import cors from "cors";
import { config } from "./config.js";
import leadsRouter from "./routes/leads.js";
import "./db.js";

const app = express();

app.use(
  cors({
    origin: config.corsOrigins,
  })
);
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/leads", leadsRouter);

app.use((err, _req, res, _next) => {
  console.error("[server] unhandled error", err);
  res.status(500).json({ error: "internal_error" });
});

app.listen(config.port, () => {
  console.log(`FURNITURE STUDIO API listening on http://localhost:${config.port}`);
});
