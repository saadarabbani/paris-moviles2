"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function Nav() {
  const { t, lang, toggle } = useLang();
  const { cartCount } = useStore();
  const s = (t as Record<string, string>);

  return (
    <nav
      className="pm-nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "color-mix(in srgb, var(--color-bg) 92%, transparent)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid var(--color-divider)",
      }}
    >
      <div
        className="pm-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: "16px 40px",
        }}
      >
        <Link
          href="/"
          className="pm-hd"
          style={{
            fontSize: 20,
            letterSpacing: "0.04em",
            marginRight: "auto",
            color: "var(--color-text)",
          }}
        >
          Paris Móviles
        </Link>
        <span
          className="pm-nav-links"
          style={{ display: "flex", alignItems: "center", gap: 22 }}
        >
          <Link href="/shop">{s.nav_shop}</Link>
          <Link href="/repairs">{s.nav_repairs}</Link>
          <Link href="/quote">{s.nav_quote}</Link>
          <Link href="/track">{s.nav_track}</Link>
          <Link href="/contact">{s.nav_contact}</Link>
        </span>
        <button
          type="button"
          onClick={toggle}
          className="pm-chip"
          style={{ padding: "6px 11px" }}
          aria-label="Toggle language"
        >
          {lang === "en" ? "ES" : "EN"}
        </button>
        <Link
          href="/cart"
          className="pm-hd"
          style={{ fontSize: 13, letterSpacing: "0.05em", color: "var(--color-text)" }}
        >
          {s.nav_cart} · {cartCount}
        </Link>
        <Link
          href="/admin"
          style={{
            fontSize: 11,
            color: "color-mix(in srgb, var(--color-text) 45%, transparent)",
          }}
        >
          {s.nav_admin}
        </Link>
      </div>
    </nav>
  );
}
