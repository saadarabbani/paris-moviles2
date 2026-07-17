"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { WHATSAPP_NUMBER } from "@/lib/data";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.53-1.5h1.67V3.6c-.29-.04-1.25-.12-2.37-.12-2.33 0-3.93 1.42-3.93 4.04V9.9H7.7V13h2.7v8h3.1z" />
    </svg>
  );
}

export default function Footer() {
  const { t, lang, toggle } = useLang();
  const s = t as Record<string, string>;
  const cats = (t as unknown as { cats: Record<string, string> }).cats;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="pm-wrap footer-top">
        {/* Brand */}
        <div>
          <div className="pm-hd footer-brand-name">Paris Móviles</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: "14px 0 0", maxWidth: "38ch" }}>
            {s.foot_desc}
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-wa"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.03c-.24.68-1.42 1.3-1.95 1.34-.5.05-1.14.24-3.68-.77-3.1-1.22-5.09-4.37-5.24-4.57-.15-.2-1.26-1.68-1.26-3.2 0-1.52.8-2.27 1.08-2.58.28-.31.61-.39.81-.39.2 0 .41 0 .59.01.19.01.44-.07.69.53.24.6.82 2.07.89 2.22.07.15.12.32.02.52-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.2.73-.85.92-1.14.2-.29.39-.24.66-.15.27.1 1.71.81 2 .96.29.15.49.22.56.34.07.13.07.72-.17 1.4z" />
            </svg>
            WhatsApp
          </a>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="footer-col-h">{s.foot_shop_h}</h4>
          <Link href="/shop" className="footer-link">{cats.all}</Link>
          <Link href="/shop" className="footer-link">{cats.phones}</Link>
          <Link href="/shop" className="footer-link">{cats.accessories}</Link>
          <Link href="/shop" className="footer-link">{cats.audio}</Link>
          <Link href="/shop" className="footer-link">{cats.electronics}</Link>
        </div>

        {/* Repairs */}
        <div>
          <h4 className="footer-col-h">{s.foot_repairs_h}</h4>
          <Link href="/repairs" className="footer-link">{s.nav_repairs}</Link>
          <Link href="/quote" className="footer-link">{s.nav_quote}</Link>
          <Link href="/book" className="footer-link">{s.book_now}</Link>
          <Link href="/track" className="footer-link">{s.nav_track}</Link>
          <Link href="/contact" className="footer-link">{s.nav_contact}</Link>
        </div>

        {/* Visit us */}
        <div>
          <h4 className="footer-col-h">{s.foot_visit_h}</h4>
          <div className="footer-contact-row">
            <MapPin size={17} strokeWidth={1.6} />
            <span>Your street address<br />City, postcode</span>
          </div>
          <div className="footer-contact-row">
            <Phone size={17} strokeWidth={1.6} />
            <a href="tel:+34900000000">+34 900 000 000</a>
          </div>
          <div className="footer-contact-row">
            <Clock size={17} strokeWidth={1.6} />
            <span>Mon–Sat · 10:00–20:00<br />Sun · closed</span>
          </div>
          <div className="footer-contact-row">
            <Mail size={17} strokeWidth={1.6} />
            <a href="mailto:hola@parismoviles.com">hola@parismoviles.com</a>
          </div>
        </div>
      </div>

      <div className="pm-wrap footer-bottom">
        <span>
          © {year} Paris Móviles · {s.foot_rights} · {s.foot_made}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button type="button" onClick={toggle} className="footer-lang" aria-label="Toggle language">
            {lang === "en" ? "Español" : "English"}
          </button>
          <Link href="/admin">{s.nav_admin}</Link>
        </span>
      </div>
    </footer>
  );
}
