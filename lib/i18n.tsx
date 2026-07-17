"use client";

// Lightweight client-side i18n — mirrors the prototype's in-place language
// toggle (no locale in the URL). The full EN/ES dictionary is copied verbatim
// from the design prototype's DICT().

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "./data";

type Dict = {
  [key: string]: string | string[] | Record<string, string> | ServiceRow[];
};

type ServiceRow = { t: string; d: string; w?: string };

export const DICT: Record<Lang, Dict> = {
  en: {
    nav_shop: "Shop", nav_repairs: "Repairs", nav_quote: "Quote", nav_track: "Track", nav_contact: "Contact", nav_cart: "Cart", nav_admin: "Admin",
    home_eyebrow: "Est. 2011 · Certified technicians", home_title: "Your phone, fixed properly.", home_sub: "Repairs in under 30 minutes, genuine-grade parts and a 12-month warranty — plus a curated shop of phones, accessories and electronics.",
    home_cta1: "Book a repair", home_cta2: "Shop accessories", home_featured: "The shop", home_featured_h: "Featured products", view_all: "View all", add: "Add",
    home_book_kick: "Book in three steps", home_book_h: "Broken screen? We'll fix it today.", home_book_sub: "Pick your device, tell us the issue, choose a time. Most repairs done while you wait.",
    home_reviews_kick: "What customers say", home_google: "★ 4.9 from 2,300+ Google reviews · updated daily",
    shop_kick: "Store", shop_h: "Shop", shop_search: "Search products…", sort_featured: "Featured", sort_low: "Price: low to high", sort_high: "Price: high to low", shop_empty: "No products match your filters.",
    back_shop: "Back to shop", add_cart: "Add to cart", buy_now: "Buy now", reviews: "Reviews", related: "Related products",
    cart_h: "Your cart", cart_empty: "Your cart is empty.", total: "Total", checkout: "Checkout",
    checkout_h: "Checkout", checkout_sub: "No online payment — pay cash on pickup or delivery.", f_name: "Full name", f_phone: "Phone", f_fulfil: "Fulfilment", f_pickup: "Pickup in store", f_delivery: "Local delivery", f_address: "Delivery address", f_cash: "Cash on pickup/delivery", place_order: "Place order",
    confirm_kick: "Order received", confirm_h: "Thank you!", confirm_sub: "We'll call you to confirm. Pay cash when you collect or receive your order.", keep_shopping: "Keep shopping",
    rep_kick: "Repairs", rep_h: "We fix it all.", rep_sub: "Screens, batteries, water damage, charging, unlocking and data recovery — most done same day, all backed by a 12-month warranty.", get_quote: "Get an instant quote", book_now: "Book a repair",
    quote_kick: "Instant quote", quote_h: "Get a price now.", quote_sub: "Choose your device and issue for an instant estimate.", q_brand: "Brand", q_model: "Model", q_issue: "Issue", q_estimate: "Estimated price", book_this: "Book this repair",
    book_kick: "Booking", book_h: "Book a repair", b_notes: "Notes (optional)", b_submit: "Confirm booking", ticket_kick: "Booking confirmed", ticket_h: "Your ticket number", ticket_sub: "Keep this number to track your repair status anytime.",
    track_kick: "Track", track_h: "Track your repair", track_ph: "e.g. REP-5107", track_btn: "Track", track_device: "Device", track_ticket: "Ticket", track_now: "Now", track_miss: "No repair found with that ticket number.",
    contact_kick: "Contact", contact_h: "Come in, or reach us.", c_address: "Address", c_phone: "Phone", c_hours: "Hours", c_email: "Email", c_message: "Message", c_send: "Send message", c_sent: "Thanks! We'll get back to you shortly.",
    admin_kick: "Staff only", admin_login: "Admin login", admin_pass: "Password", admin_enter: "Enter", admin_wrong: "Wrong password.", admin_hint: "Demo password: admin", admin_dash: "Dashboard", admin_logout: "Log out",
    th_order: "Order", th_customer: "Customer", th_total: "Total", th_status: "Status", th_ticket: "Ticket", th_device: "Device", th_issue: "Issue", th_product: "Product", th_cat: "Category", th_price: "Price", th_author: "Author", th_review: "Review",
    a_advance: "Advance", a_review: "Request review", a_delete: "Delete", a_approve: "Approve", a_hide: "Hide",
    p_name_en: "Name", p_price: "Price €", p_add: "Add product",
    footer: "Repairs · Accessories · Since 2011",
    foot_desc: "Your neighbourhood phone shop and repair studio since 2011. Genuine-grade parts, honest prices, and most repairs done while you wait.",
    foot_shop_h: "Shop", foot_repairs_h: "Repairs", foot_visit_h: "Visit us", foot_rights: "All rights reserved.", foot_made: "No online payment — cash on pickup or local delivery.",
    review_h: "Leave a review", review_kick: "Your feedback", review_sub: "Tell us how we did. Your review is submitted for approval.", r_author: "Your name", r_rating: "Rating", r_text: "Review", r_submit: "Submit review", r_thanks_h: "Thank you!", r_thanks_sub: "Your review was submitted and will appear once approved.",
    issues: { screen: "Screen replacement", battery: "Battery replacement", water: "Water damage", port: "Charging port", unlock: "Network unlock", data: "Data recovery" },
    cats: { all: "All", phones: "Phones", accessories: "Accessories", audio: "Audio", electronics: "Electronics" },
    ostat: ["Pending", "Confirmed", "Ready", "Completed"],
    kstat: ["Received", "Diagnosing", "Repairing", "Ready", "Completed"],
    svc: [
      { t: "Screen replacement", d: "Cracked, black or ghost-touch displays restored to factory clarity.", w: "~30 min" },
      { t: "Battery service", d: "New cells for phones that drain too fast.", w: "~25 min" },
      { t: "Water damage", d: "Diagnostics and board-level cleaning.", w: "1–2 hrs" },
      { t: "Charging ports", d: "Loose or dead ports fixed same day.", w: "~30 min" },
      { t: "Network unlocking", d: "All major carriers, safely and legally.", w: "same day" },
      { t: "Data recovery", d: "Photos and files rescued from dead devices.", w: "quoted" },
    ],
    proc: [
      { t: "Bring it in", d: "Walk in or book online — no appointment needed." },
      { t: "Free diagnosis", d: "We inspect and quote before any work starts." },
      { t: "We repair", d: "Most repairs done while you wait." },
      { t: "12-mo warranty", d: "Every repair backed for a full year." },
    ],
  },
  es: {
    nav_shop: "Tienda", nav_repairs: "Reparaciones", nav_quote: "Presupuesto", nav_track: "Seguimiento", nav_contact: "Contacto", nav_cart: "Cesta", nav_admin: "Admin",
    home_eyebrow: "Desde 2011 · Técnicos certificados", home_title: "Tu móvil, reparado bien.", home_sub: "Reparaciones en menos de 30 minutos, piezas de calidad original y 12 meses de garantía — además de una tienda de móviles, accesorios y electrónica.",
    home_cta1: "Reservar reparación", home_cta2: "Ver accesorios", home_featured: "La tienda", home_featured_h: "Productos destacados", view_all: "Ver todo", add: "Añadir",
    home_book_kick: "Reserva en tres pasos", home_book_h: "¿Pantalla rota? La arreglamos hoy.", home_book_sub: "Elige tu dispositivo, cuéntanos el problema y elige una hora. La mayoría se reparan al momento.",
    home_reviews_kick: "Lo que dicen los clientes", home_google: "★ 4,9 de más de 2.300 reseñas de Google · actualizado a diario",
    shop_kick: "Tienda", shop_h: "Tienda", shop_search: "Buscar productos…", sort_featured: "Destacados", sort_low: "Precio: menor a mayor", sort_high: "Precio: mayor a menor", shop_empty: "Ningún producto coincide.",
    back_shop: "Volver a la tienda", add_cart: "Añadir a la cesta", buy_now: "Comprar ya", reviews: "Reseñas", related: "Productos relacionados",
    cart_h: "Tu cesta", cart_empty: "Tu cesta está vacía.", total: "Total", checkout: "Finalizar compra",
    checkout_h: "Finalizar compra", checkout_sub: "Sin pago online — paga en efectivo al recoger o recibir.", f_name: "Nombre completo", f_phone: "Teléfono", f_fulfil: "Entrega", f_pickup: "Recoger en tienda", f_delivery: "Entrega local", f_address: "Dirección de entrega", f_cash: "Efectivo al recoger/recibir", place_order: "Realizar pedido",
    confirm_kick: "Pedido recibido", confirm_h: "¡Gracias!", confirm_sub: "Te llamaremos para confirmar. Paga en efectivo al recoger o recibir.", keep_shopping: "Seguir comprando",
    rep_kick: "Reparaciones", rep_h: "Lo reparamos todo.", rep_sub: "Pantallas, baterías, daños por agua, carga, liberación y recuperación de datos — la mayoría el mismo día, con 12 meses de garantía.", get_quote: "Presupuesto al instante", book_now: "Reservar reparación",
    quote_kick: "Presupuesto instantáneo", quote_h: "Precio al instante.", quote_sub: "Elige tu dispositivo y el problema para un presupuesto inmediato.", q_brand: "Marca", q_model: "Modelo", q_issue: "Problema", q_estimate: "Precio estimado", book_this: "Reservar esta reparación",
    book_kick: "Reserva", book_h: "Reservar reparación", b_notes: "Notas (opcional)", b_submit: "Confirmar reserva", ticket_kick: "Reserva confirmada", ticket_h: "Tu número de ticket", ticket_sub: "Guarda este número para seguir el estado de tu reparación.",
    track_kick: "Seguimiento", track_h: "Sigue tu reparación", track_ph: "ej. REP-5107", track_btn: "Buscar", track_device: "Dispositivo", track_ticket: "Ticket", track_now: "Ahora", track_miss: "No se encontró ninguna reparación con ese número.",
    contact_kick: "Contacto", contact_h: "Ven o escríbenos.", c_address: "Dirección", c_phone: "Teléfono", c_hours: "Horario", c_email: "Correo", c_message: "Mensaje", c_send: "Enviar mensaje", c_sent: "¡Gracias! Te responderemos en breve.",
    admin_kick: "Solo personal", admin_login: "Acceso admin", admin_pass: "Contraseña", admin_enter: "Entrar", admin_wrong: "Contraseña incorrecta.", admin_hint: "Contraseña demo: admin", admin_dash: "Panel", admin_logout: "Salir",
    th_order: "Pedido", th_customer: "Cliente", th_total: "Total", th_status: "Estado", th_ticket: "Ticket", th_device: "Dispositivo", th_issue: "Problema", th_product: "Producto", th_cat: "Categoría", th_price: "Precio", th_author: "Autor", th_review: "Reseña",
    a_advance: "Avanzar", a_review: "Pedir reseña", a_delete: "Eliminar", a_approve: "Aprobar", a_hide: "Ocultar",
    p_name_en: "Nombre", p_price: "Precio €", p_add: "Añadir producto",
    footer: "Reparaciones · Accesorios · Desde 2011",
    foot_desc: "Tu tienda de móviles y taller de reparación de barrio desde 2011. Piezas de calidad original, precios honestos y la mayoría de reparaciones al momento.",
    foot_shop_h: "Tienda", foot_repairs_h: "Reparaciones", foot_visit_h: "Visítanos", foot_rights: "Todos los derechos reservados.", foot_made: "Sin pago online — efectivo al recoger o entrega local.",
    review_h: "Deja una reseña", review_kick: "Tu opinión", review_sub: "Cuéntanos qué tal. Tu reseña se envía para aprobación.", r_author: "Tu nombre", r_rating: "Valoración", r_text: "Reseña", r_submit: "Enviar reseña", r_thanks_h: "¡Gracias!", r_thanks_sub: "Tu reseña se ha enviado y aparecerá cuando se apruebe.",
    issues: { screen: "Cambio de pantalla", battery: "Cambio de batería", water: "Daño por agua", port: "Puerto de carga", unlock: "Liberación", data: "Recuperación de datos" },
    cats: { all: "Todo", phones: "Móviles", accessories: "Accesorios", audio: "Audio", electronics: "Electrónica" },
    ostat: ["Pendiente", "Confirmado", "Listo", "Completado"],
    kstat: ["Recibido", "Diagnóstico", "Reparando", "Listo", "Completado"],
    svc: [
      { t: "Cambio de pantalla", d: "Pantallas rotas o negras restauradas a calidad de fábrica.", w: "~30 min" },
      { t: "Servicio de batería", d: "Células nuevas para móviles que se descargan rápido.", w: "~25 min" },
      { t: "Daño por agua", d: "Diagnóstico y limpieza a nivel de placa.", w: "1–2 h" },
      { t: "Puertos de carga", d: "Puertos sueltos o muertos el mismo día.", w: "~30 min" },
      { t: "Liberación", d: "Todos los operadores, de forma legal.", w: "mismo día" },
      { t: "Recuperación de datos", d: "Fotos y archivos rescatados de móviles muertos.", w: "presupuesto" },
    ],
    proc: [
      { t: "Tráelo", d: "Ven o reserva online — sin cita previa." },
      { t: "Diagnóstico gratis", d: "Inspeccionamos y presupuestamos antes de empezar." },
      { t: "Reparamos", d: "La mayoría al momento." },
      { t: "Garantía 12 meses", d: "Cada reparación cubierta un año entero." },
    ],
  },
};

export type Translator = Dict;

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Translator;
};

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pm_lang") as Lang | null;
      if (saved === "en" || saved === "es") setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("pm_lang", l);
    } catch {}
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "en" ? "es" : "en"),
    [lang, setLang]
  );

  return (
    <Ctx.Provider value={{ lang, setLang, toggle, t: DICT[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used within LangProvider");
  return c;
}

// Convenience string getter
export function useT() {
  return useLang().t;
}
