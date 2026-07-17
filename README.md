# Paris Móviles — front-end

Bilingual (EN/ES) mobile-phone shop **and** repair-service website — a faithful
front-end recreation of the [claude.ai/design prototype](./design_handoff_paris_moviles),
built with **Next.js (App Router) + TypeScript + Tailwind**.

**Front-end only — no backend, no database.** All data is a static seed plus
runtime state persisted in the browser's `localStorage`, so the whole app (cart,
checkout, repair booking/tracking, admin CRUD, review moderation) is fully
functional and deploys to Vercel with zero configuration.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm start` (serve the build),
`npm run lint`.

## Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In Vercel, **New Project → import the repo**. Framework preset **Next.js** is
   auto-detected — no environment variables, no database, no settings to change.
3. Deploy. That's it.

(Or from the CLI: `npm i -g vercel && vercel`.)

## What's included

**Storefront** — Home, Shop (search / category filter / sort), Product detail
(gallery, related products, reviews), Cart (localStorage), Checkout (pickup or
local delivery, cash-only) with order confirmation.

**Repairs** — Repairs overview, Instant Quote (brand → model → issue → live price),
Booking (creates a ticket number), Track (5-step status timeline).

**Other** — Contact page, public "leave a review" page (`/review/[anything]`),
floating WhatsApp button on every page.

**Admin** (`/admin`, demo password `admin`) — dashboard with count cards and tabs:
Orders, Tickets, Products (add/delete), Repair prices (inline edit), Reviews
(approve / hide / delete). Login is client-side only — this is a demo gate, **not
real security**.

**Bilingual** — EN/ES toggle in the header swaps every string in place (no page
reload), persisted per browser.

## How the data works

- `lib/data.ts` — static seed (products, repair prices, brands/models, sample
  orders, tickets, reviews), extracted verbatim from the design prototype.
- `lib/store.tsx` — client store holding all mutable state, persisted to
  `localStorage` (`pm_store_v1`, `pm_cart`). Everything you change in the admin,
  every order/ticket/review you create, survives a refresh on that device.
- `lib/i18n.tsx` — the full EN/ES dictionary + language provider.

To reset to the seed data, clear the site's `localStorage` in your browser dev
tools (or open a private window).

## Design reference

`design_handoff_paris_moviles/` holds the original design handoff and prototype
(`prototype/paris-moviles-standalone.html`, `prototype/Paris Moviles.dc.html`) used
as the visual + behavior source of truth. It is reference material — not imported
by the app, not shipped as routes.

## Notes

- Product images are the prototype's hatched placeholder slots — drop in real
  photos when you have them.
- The "★ 4.9 from 2,300+ Google reviews" line and the on-site reviews are static
  demo content (no Google Places integration in this front-end-only build).
- Visual language: the **Industry** design system — steel-blue wireframe on a
  light ground, Barlow / Barlow Condensed type, square corners with `+`
  registration marks.
