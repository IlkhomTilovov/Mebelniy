# KITCHEN STUDIO — Landing Page + Narx Kalkulyatori

Individual oshxona mebeli ishlab chiqaruvchisi uchun Facebook/Instagram reklamalaridan
keladigan tashrif buyuruvchilarni lidga aylantiruvchi landing page va ko'p bosqichli
narx kalkulyatori.

## Loyiha tarkibi

- `web/` — React + Vite frontend (bilingual UZ/RU, kalkulyator, Meta Pixel).
- `server/` — Express backend (lead qabul qilish, SQLite saqlash, Telegram xabari).

## Ishga tushirish (lokal)

```bash
# Backend
cd server
cp .env.example .env   # TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID ni to'ldiring
npm install
npm run dev             # http://localhost:4001

# Frontend (alohida terminalda)
cd web
cp .env.example .env    # ixtiyoriy: VITE_META_PIXEL_ID
npm install
npm run dev              # http://localhost:5173, /api so'rovlari backendga proxy qilinadi
```

Production build: `cd web && npm run build` (natija `web/dist/`), backend uchun `npm start`.

## Narxlarni sozlash (MUHIM)

Kalkulyator **hech qachon o'zi o'ylab narx chiqarmaydi**. Barcha narxlar
[`web/src/config/pricing.js`](web/src/config/pricing.js) faylida markazlashtirilgan.
Haqiqiy tariflar kiritilmaguncha (`configured: true` qilinmaguncha) kalkulyator har doim
"Individual hisob-kitob talab qilinadi" degan holatni ko'rsatadi — bu qasddan shunday,
soxta narx chiqarib yubormasligi uchun.

To'ldirish kerak bo'lgan qiymatlar: har bir oshxona shakli (to'g'ri, L, U, orolchali)
uchun 1 metrga narx, material koeffitsientlari, furnitura va ustki qopqoq narxlari,
o'rnatish xarajati.

## Hali to'ldirilishi kerak bo'lgan biznes ma'lumotlari

Loyiha texnik jihatdan to'liq ishlaydi, ammo quyidagilar haqiqiy biznes
ma'lumotlari bilan almashtirilishi kerak:

1. **Narx tariflari** — `web/src/config/pricing.js` (hozir hammasi `null`).
2. **Telegram bot** — `server/.env` dagi `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID`
   (bot yaratish: @BotFather, chat ID olish: @getidsbot yoki Bot API `getUpdates`).
3. **Meta Pixel ID** — `web/.env` dagi `VITE_META_PIXEL_ID`.
4. **Kompaniya nomi va brendi** — hozir vaqtinchalik "KITCHEN STUDIO" (`web/src/config/site.js`).
5. **Haqiqiy kontakt ma'lumotlari** — telefon, Telegram username, Instagram/Facebook
   havolalari (`web/src/config/site.js`).
6. **Haqiqiy portfolio rasmlari** — hozir Unsplash dan olingan illyustrativ rasmlar
   (`web/src/data/portfolio.js`, `web/src/data/materials.js`). Haqiqiy loyiha rasmlari
   bilan almashtirilishi va "bu haqiqiy mijoz loyihasi" deb taqdim etilmasligi kerak.
7. **Material katalogi** — agar ishlab chiqaruvchining haqiqiy material ro'yxati
   yuqoridagilardan farq qilsa, `web/src/data/materials.js` va `pricing.js` dagi
   kalitlarni moslang.
8. **Domen / production URL** — `web/index.html` dagi `canonical` va Open Graph
   havolalari hozircha `example.com`.
9. **Database** — leads `server/data/leads.sqlite` faylida saqlanadi (SQLite).
   Agar boshqa hosting muhiti (masalan, serverless) ishlatilsa, bu faylga yozish
   imkoni bo'lishini tekshiring yoki boshqa DB ga o'tkazing.

Yuqoridagilar to'ldirilmaguncha sayt **to'liq ishlaydi** — faqat narx hisoblanmaydi
(buning o'rniga halol "individual hisob-kitob" xabari chiqadi) va Telegram xabari
yuborilmaydi (lead baribir bazada saqlanadi, yo'qolmaydi).
