// Client-side FAQ assistant knowledge base + intent matcher.
// No backend / no LLM: questions are matched to curated bilingual answers by
// keyword scoring, and price answers are filled live from the current prices.

import type { Lang, Prices } from "./data";

export type FaqAnswer = {
  en: string;
  es: string;
  link?: { href: string; en: string; es: string };
};

export type FaqEntry = {
  id: string;
  kw: string[]; // trigger keywords (any language), matched case/accent-insensitively
  q?: { en: string; es: string }; // shown as a quick-reply suggestion when present
  a: (p: Prices) => FaqAnswer;
};

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export const FAQ: FaqEntry[] = [
  {
    id: "screen",
    kw: ["screen", "pantalla", "crack", "cracked", "roto", "rota", "display", "glass", "cristal"],
    q: { en: "How much is a screen repair?", es: "¿Cuánto cuesta cambiar la pantalla?" },
    a: (p) => ({
      en: `Screen replacement starts from €${p.screen}, and most are done in about 30 minutes with a 12-month warranty.`,
      es: `El cambio de pantalla desde €${p.screen}, y la mayoría en unos 30 minutos con 12 meses de garantía.`,
      link: { href: "/quote", en: "Get an exact quote", es: "Presupuesto exacto" },
    }),
  },
  {
    id: "battery",
    kw: ["battery", "bateria", "drain", "drains", "dies", "charge holding"],
    q: { en: "Battery replacement?", es: "¿Cambio de batería?" },
    a: (p) => ({
      en: `Battery replacement starts from €${p.battery} and takes about 25 minutes.`,
      es: `El cambio de batería desde €${p.battery} y tarda unos 25 minutos.`,
      link: { href: "/quote", en: "Get a quote", es: "Pedir presupuesto" },
    }),
  },
  {
    id: "water",
    kw: ["water", "agua", "liquid", "wet", "mojado", "pool", "spilled"],
    a: (p) => ({
      en: `Water damage starts from €${p.water}. We run diagnostics and board-level cleaning, usually within 1–2 hours.`,
      es: `El daño por agua desde €${p.water}. Hacemos diagnóstico y limpieza a nivel de placa, normalmente en 1–2 horas.`,
      link: { href: "/book", en: "Book a repair", es: "Reservar reparación" },
    }),
  },
  {
    id: "port",
    kw: ["port", "charging port", "puerto", "carga", "charge", "cable loose"],
    a: (p) => ({
      en: `Charging port repairs start from €${p.port}, usually done the same day.`,
      es: `La reparación del puerto de carga desde €${p.port}, normalmente el mismo día.`,
      link: { href: "/quote", en: "Get a quote", es: "Pedir presupuesto" },
    }),
  },
  {
    id: "unlock",
    kw: ["unlock", "liberar", "liberacion", "carrier", "network", "sim lock"],
    a: (p) => ({
      en: `Network unlocking starts from €${p.unlock} — all major carriers, done safely and legally.`,
      es: `La liberación desde €${p.unlock} — todos los operadores, de forma segura y legal.`,
      link: { href: "/book", en: "Book it", es: "Reservar" },
    }),
  },
  {
    id: "data",
    kw: ["data", "datos", "recover", "recovery", "recuperar", "photos", "fotos", "files", "archivos"],
    a: (p) => ({
      en: `Data recovery starts from €${p.data}. We rescue photos and files from dead devices — the exact price is quoted after diagnosis.`,
      es: `La recuperación de datos desde €${p.data}. Rescatamos fotos y archivos de móviles muertos — el precio exacto se presupuesta tras el diagnóstico.`,
      link: { href: "/contact", en: "Contact us", es: "Contáctanos" },
    }),
  },
  {
    id: "price",
    kw: ["price", "cost", "how much", "cuanto", "cuesta", "precio", "quote", "presupuesto", "estimate", "prices"],
    q: { en: "How much does a repair cost?", es: "¿Cuánto cuesta una reparación?" },
    a: (p) => ({
      en: `Repairs start from: screen €${p.screen}, battery €${p.battery}, charging port €${p.port}, water damage €${p.water}, unlock €${p.unlock}, data recovery €${p.data}. Use the instant quote for your exact device.`,
      es: `Reparaciones desde: pantalla €${p.screen}, batería €${p.battery}, puerto €${p.port}, daño por agua €${p.water}, liberación €${p.unlock}, datos €${p.data}. Usa el presupuesto instantáneo para tu modelo.`,
      link: { href: "/quote", en: "Instant quote", es: "Presupuesto instantáneo" },
    }),
  },
  {
    id: "warranty",
    kw: ["warranty", "garantia", "guarantee", "guaranteed", "cover"],
    q: { en: "Do repairs have a warranty?", es: "¿Las reparaciones tienen garantía?" },
    a: () => ({
      en: `Yes — every repair is backed by a full 12-month warranty.`,
      es: `Sí — cada reparación está cubierta por 12 meses de garantía.`,
    }),
  },
  {
    id: "time",
    kw: ["how long", "time", "tiempo", "tarda", "fast", "quick", "wait", "same day", "today", "hoy"],
    q: { en: "How long does a repair take?", es: "¿Cuánto tarda una reparación?" },
    a: () => ({
      en: `Most repairs are done in under 30 minutes while you wait, and nearly all are same-day.`,
      es: `La mayoría se hacen en menos de 30 minutos mientras esperas, y casi todas el mismo día.`,
    }),
  },
  {
    id: "track",
    kw: ["track", "seguimiento", "status", "estado", "ticket", "rep-", "where is my repair"],
    q: { en: "How do I track my repair?", es: "¿Cómo sigo mi reparación?" },
    a: () => ({
      en: `Enter your ticket number (e.g. REP-5107) on the Track page to see its live status.`,
      es: `Introduce tu número de ticket (ej. REP-5107) en la página de Seguimiento para ver el estado en vivo.`,
      link: { href: "/track", en: "Track a repair", es: "Seguir reparación" },
    }),
  },
  {
    id: "book",
    kw: ["book", "appointment", "reservar", "cita", "booking", "schedule", "walk in"],
    q: { en: "Do I need an appointment?", es: "¿Necesito cita?" },
    a: () => ({
      en: `No appointment needed — walk in any time, or book online and we'll have you sorted fast.`,
      es: `No necesitas cita — ven cuando quieras, o reserva online y te atenderemos rápido.`,
      link: { href: "/book", en: "Book a repair", es: "Reservar reparación" },
    }),
  },
  {
    id: "payment",
    kw: ["pay", "payment", "cash", "pago", "efectivo", "card", "tarjeta", "online payment"],
    q: { en: "How do I pay?", es: "¿Cómo se paga?" },
    a: () => ({
      en: `There's no online payment — you pay cash when you pick up in store or receive your local delivery.`,
      es: `No hay pago online — pagas en efectivo al recoger en tienda o al recibir tu entrega local.`,
    }),
  },
  {
    id: "delivery",
    kw: ["delivery", "shipping", "pickup", "envio", "entrega", "recoger", "collect", "ship"],
    a: () => ({
      en: `You can pick up in store or choose local delivery at checkout. Payment is cash on pickup or delivery.`,
      es: `Puedes recoger en tienda o elegir entrega local al finalizar la compra. El pago es en efectivo al recoger o recibir.`,
    }),
  },
  {
    id: "hours",
    kw: ["hours", "open", "horario", "abierto", "cuando abren", "closing", "close", "when open"],
    q: { en: "What are your opening hours?", es: "¿Cuál es el horario?" },
    a: () => ({
      en: `We're open Monday–Saturday, 10:00–20:00. Closed on Sundays.`,
      es: `Abrimos de lunes a sábado, 10:00–20:00. Cerrado los domingos.`,
    }),
  },
  {
    id: "location",
    kw: ["where", "location", "address", "donde", "direccion", "ubicacion", "shop", "store", "tienda find"],
    q: { en: "Where are you located?", es: "¿Dónde estáis?" },
    a: () => ({
      en: `Find our address, map and details on the Contact page. Phone: +34 900 000 000.`,
      es: `Encuentra nuestra dirección, mapa y datos en la página de Contacto. Teléfono: +34 900 000 000.`,
      link: { href: "/contact", en: "Contact & map", es: "Contacto y mapa" },
    }),
  },
  {
    id: "contact",
    kw: ["contact", "call", "phone", "telefono", "contacto", "llamar", "whatsapp", "email", "correo", "reach"],
    a: () => ({
      en: `Call +34 900 000 000, message us on WhatsApp, or email hola@parismoviles.com.`,
      es: `Llama al +34 900 000 000, escríbenos por WhatsApp o al correo hola@parismoviles.com.`,
      link: { href: "/contact", en: "Contact page", es: "Página de contacto" },
    }),
  },
  {
    id: "shop",
    kw: ["buy", "shop", "product", "products", "comprar", "producto", "accessories", "earbuds", "charger", "phone for sale", "case"],
    q: { en: "What do you sell?", es: "¿Qué vendéis?" },
    a: () => ({
      en: `We sell phones, accessories, audio and electronics — browse them all in the shop.`,
      es: `Vendemos móviles, accesorios, audio y electrónica — míralo todo en la tienda.`,
      link: { href: "/shop", en: "Open the shop", es: "Ir a la tienda" },
    }),
  },
  {
    id: "language",
    kw: ["language", "idioma", "spanish", "english", "espanol", "ingles", "translate"],
    a: () => ({
      en: `The whole site is bilingual — switch between English and Spanish with the toggle in the header or footer.`,
      es: `Toda la web es bilingüe — cambia entre español e inglés con el botón en la cabecera o el pie.`,
    }),
  },
  {
    id: "greeting",
    kw: ["hi", "hello", "hey", "hola", "buenas", "good morning", "good afternoon"],
    a: () => ({
      en: `Hi! 👋 I'm the Paris Móviles assistant. Ask me about repair prices, timings, warranty, tracking, hours or the shop.`,
      es: `¡Hola! 👋 Soy el asistente de Paris Móviles. Pregúntame por precios de reparación, tiempos, garantía, seguimiento, horario o la tienda.`,
    }),
  },
  {
    id: "thanks",
    kw: ["thanks", "thank", "gracias", "cheers", "ty"],
    a: () => ({
      en: `You're welcome! Anything else I can help with?`,
      es: `¡De nada! ¿Algo más en lo que pueda ayudar?`,
    }),
  },
];

export function matchFaq(query: string): FaqEntry | null {
  const nq = norm(query);
  if (!nq.trim()) return null;
  let best: FaqEntry | null = null;
  let bestScore = 0;
  for (const entry of FAQ) {
    let score = 0;
    for (const k of entry.kw) {
      if (nq.includes(norm(k))) score += norm(k).length; // longer keyword = stronger signal
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore > 0 ? best : null;
}

export function suggestions(): FaqEntry[] {
  return FAQ.filter((e) => e.q);
}

export function answerText(a: FaqAnswer, lang: Lang) {
  return lang === "en" ? a.en : a.es;
}
