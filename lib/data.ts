// Static seed data for Paris Móviles — extracted verbatim from the design
// prototype (Paris Moviles.dc.html). Front-end only: this is the initial state;
// runtime edits live in the client store (localStorage).

export type Lang = "en" | "es";
export type Category = "phones" | "accessories" | "audio" | "electronics";
export type IssueKey = "screen" | "battery" | "water" | "port" | "unlock" | "data";
export type ReviewStatus = "approved" | "pending" | "hidden";

export type Product = {
  id: number;
  slug: string;
  cat: Category;
  en: string;
  es: string;
  price: number;
  tag: { en: string; es: string };
  blurbEn: string;
  blurbEs: string;
};

export type Order = {
  num: string;
  customer: string;
  total: number;
  status: number; // index into ostat: 0 pending → 3 completed
};

export type Ticket = {
  num: string;
  device: string;
  issue: IssueKey;
  status: number; // index into kstat: 0 received → 4 completed
};

export type Review = {
  id: number;
  author: string;
  text: string;
  status: ReviewStatus;
};

export type Prices = Record<IssueKey, number>;

export const CATEGORIES: ("all" | Category)[] = [
  "all",
  "phones",
  "accessories",
  "audio",
  "electronics",
];

export const ISSUE_KEYS: IssueKey[] = [
  "screen",
  "battery",
  "water",
  "port",
  "unlock",
  "data",
];

export const SEED_PRICES: Prices = {
  screen: 49,
  battery: 39,
  water: 59,
  port: 29,
  unlock: 19,
  data: 59,
};

export const SEED_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "iphone-13-refurb",
    cat: "phones",
    en: "iPhone 13 (refurb)",
    es: "iPhone 13 (reacond.)",
    price: 429,
    tag: { en: "", es: "" },
    blurbEn:
      "Certified refurbished iPhone 13, fully tested and backed by our 12-month warranty. Genuine-grade battery and display.",
    blurbEs:
      "iPhone 13 reacondicionado certificado, totalmente probado y con 12 meses de garantía. Batería y pantalla de calidad original.",
  },
  {
    id: 2,
    slug: "galaxy-a54",
    cat: "phones",
    en: "Galaxy A54",
    es: "Galaxy A54",
    price: 329,
    tag: { en: "New", es: "Nuevo" },
    blurbEn:
      "Brand-new Samsung Galaxy A54 with a bright 120Hz display, triple camera and all-day battery.",
    blurbEs:
      "Samsung Galaxy A54 nuevo con pantalla brillante de 120Hz, triple cámara y batería para todo el día.",
  },
  {
    id: 3,
    slug: "leather-case",
    cat: "accessories",
    en: "Leather case",
    es: "Funda de piel",
    price: 24.9,
    tag: { en: "", es: "" },
    blurbEn:
      "Full-grain leather case with a soft microfibre lining. Slim, protective and ages beautifully.",
    blurbEs:
      "Funda de piel plena flor con forro suave de microfibra. Fina, protectora y envejece de maravilla.",
  },
  {
    id: 4,
    slug: "tempered-glass",
    cat: "accessories",
    en: "Tempered glass",
    es: "Cristal templado",
    price: 12.9,
    tag: { en: "Sale", es: "Oferta" },
    blurbEn:
      "9H tempered glass screen protector with oleophobic coating. Fitted in-store for free.",
    blurbEs:
      "Protector de cristal templado 9H con revestimiento oleofóbico. Colocación gratis en tienda.",
  },
  {
    id: 5,
    slug: "wireless-earbuds",
    cat: "audio",
    en: "Wireless earbuds",
    es: "Auriculares inalámbricos",
    price: 49.9,
    tag: { en: "Popular", es: "Popular" },
    blurbEn:
      "True-wireless earbuds with active noise cancellation and up to 30 hours with the charging case.",
    blurbEs:
      "Auriculares totalmente inalámbricos con cancelación activa de ruido y hasta 30 horas con el estuche.",
  },
  {
    id: 6,
    slug: "over-ear-headphones",
    cat: "audio",
    en: "Over-ear headphones",
    es: "Auriculares de diadema",
    price: 79.9,
    tag: { en: "", es: "" },
    blurbEn:
      "Comfortable over-ear headphones with deep bass, plush ear cushions and a 40-hour battery.",
    blurbEs:
      "Auriculares de diadema cómodos con graves profundos, almohadillas mullidas y 40 horas de batería.",
  },
  {
    id: 7,
    slug: "65w-gan-charger",
    cat: "electronics",
    en: "65W GaN charger",
    es: "Cargador GaN 65W",
    price: 34.9,
    tag: { en: "", es: "" },
    blurbEn:
      "Compact 65W GaN charger that fast-charges phones and laptops from a single USB-C port.",
    blurbEs:
      "Cargador GaN de 65W compacto que carga rápido móviles y portátiles desde un único puerto USB-C.",
  },
  {
    id: 8,
    slug: "power-bank-20k",
    cat: "electronics",
    en: "Power bank 20K",
    es: "Batería externa 20K",
    price: 29.9,
    tag: { en: "", es: "" },
    blurbEn:
      "20,000mAh power bank with fast USB-C in/out — enough for three full phone charges.",
    blurbEs:
      "Batería externa de 20.000mAh con USB-C rápido de entrada/salida — hasta tres cargas completas.",
  },
];

export const SEED_ORDERS: Order[] = [
  { num: "ORD-2041", customer: "Marco T.", total: 74.8, status: 1 },
  { num: "ORD-2042", customer: "Elena R.", total: 429, status: 0 },
  { num: "ORD-2043", customer: "Luis P.", total: 49.9, status: 2 },
];

export const SEED_TICKETS: Ticket[] = [
  { num: "REP-5107", device: "iPhone 13", issue: "screen", status: 2 },
  { num: "REP-5108", device: "Galaxy S22", issue: "battery", status: 1 },
  { num: "REP-5109", device: "Pixel 7", issue: "water", status: 3 },
];

export const SEED_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Marco T.",
    text: "Screen replaced in 25 minutes and it looks brand new.",
    status: "approved",
  },
  {
    id: 2,
    author: "Elena R.",
    text: "Dropped my phone in the pool — working the same afternoon.",
    status: "approved",
  },
  {
    id: 3,
    author: "Aisha K.",
    text: "Honest, fast and friendly. My go-to shop.",
    status: "approved",
  },
  {
    id: 4,
    author: "Nuria B.",
    text: "Bought a charger and got a battery swap same visit.",
    status: "pending",
  },
];

export const BRANDS = ["Apple", "Samsung", "Google", "Xiaomi"] as const;

export const MODELS: Record<string, string[]> = {
  Apple: ["iPhone 15", "iPhone 14", "iPhone 13"],
  Samsung: ["Galaxy S24", "Galaxy S23", "Galaxy A54"],
  Google: ["Pixel 8", "Pixel 7"],
  Xiaomi: ["Redmi Note 13", "13T Pro"],
};

// WhatsApp business number (from the prototype: wa.me/34900000000)
export const WHATSAPP_NUMBER = "34900000000";

export function money(n: number): string {
  return "€" + Number(n).toFixed(2);
}

// Order/ticket status → tag class (index-aligned with ostat/kstat in the dictionary)
export const ORDER_TAG_CLASS = [
  "tag-neutral",
  "tag-accent",
  "tag-accent",
  "tag-outline",
];
export const TICKET_TAG_CLASS = [
  "tag-neutral",
  "tag-neutral",
  "tag-accent",
  "tag-accent",
  "tag-outline",
];
